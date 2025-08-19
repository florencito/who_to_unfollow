import JSZip from 'jszip';
import type { IGList, Normalized, IGFollowingFile } from './types';
import { validateJsonStructure } from './validate';

/**
 * Parsea y normaliza una lista de Instagram JSON
 */
export function normalizeIGList(data: IGList): Set<string> {
  const usernames = new Set<string>();
  
  for (const row of data) {
    if (row.string_list_data && Array.isArray(row.string_list_data)) {
      for (const item of row.string_list_data) {
        if (item.value && typeof item.value === 'string') {
          // Normalizar username: remover @, convertir a lowercase, trim
          const username = item.value
            .replace('@', '')
            .toLowerCase()
            .trim();
          
          if (username) {
            usernames.add(username);
          }
        }
      }
    }
  }
  
  return usernames;
}

/**
 * Combina múltiples archivos followers_*.json
 */
export function mergeFollowersFiles(followersLists: IGList[]): IGList {
  const merged: IGList = [];
  
  for (const list of followersLists) {
    if (Array.isArray(list)) {
      merged.push(...list);
    }
  }
  
  return merged;
}

/**
 * Extrae la lista de usuarios de datos de following que pueden tener diferentes estructuras
 */
function extractFollowingList(data: unknown, filename: string): IGList {
  // Si es following.json, puede tener la estructura { relationships_following: [...] }
  if (filename.includes('following') && !Array.isArray(data)) {
    const followingFile = data as IGFollowingFile;
    if (followingFile.relationships_following && Array.isArray(followingFile.relationships_following)) {
      return followingFile.relationships_following;
    }
  }
  
  // Para followers_*.json y otros archivos que son arrays directos
  if (Array.isArray(data)) {
    return data as IGList;
  }
  
  throw new Error(`No se pudo extraer lista de ${filename}`);
}

/**
 * Parsea archivos JSON desde File objects
 */
export async function parseFilesFromFiles(
  followingFile: File, 
  followersFiles: File[]
): Promise<Normalized> {
  try {
    // Leer archivo following.json
    const followingText = await followingFile.text();
    const followingRawData = JSON.parse(followingText);
    
    if (!validateJsonStructure(followingRawData, followingFile.name)) {
      throw new Error(`Estructura inválida en ${followingFile.name}`);
    }
    
    // Extraer la lista correcta del archivo following
    const followingData = extractFollowingList(followingRawData, followingFile.name);
    
    // Leer archivos followers_*.json
    const followersLists: IGList[] = [];
    
    for (const file of followersFiles) {
      const text = await file.text();
      const rawData = JSON.parse(text);
      
      if (!validateJsonStructure(rawData, file.name)) {
        console.warn(`Saltando archivo con estructura inválida: ${file.name}`);
        continue;
      }
      
      // Extraer la lista correcta (para followers debería ser array directo)
      const data = extractFollowingList(rawData, file.name);
      followersLists.push(data);
    }
    
    if (followersLists.length === 0) {
      throw new Error('No se pudieron procesar los archivos de followers');
    }
    
    // Normalizar datos
    const following = normalizeIGList(followingData);
    const mergedFollowers = mergeFollowersFiles(followersLists);
    const followers = normalizeIGList(mergedFollowers);
    
    return { followers, following };
    
  } catch (error) {
    console.error('Error parseando archivos:', error);
    throw error;
  }
}

/**
 * Parsea archivos desde un ZIP de Instagram
 */
export async function parseFilesFromZip(zipFile: File): Promise<Normalized> {
  try {
    console.log(`🔍 Analizando ZIP: ${zipFile.name} (${zipFile.size} bytes)`);
    const zip = await JSZip.loadAsync(zipFile);
    
    // Log de archivos en modo desarrollo
    if (import.meta.env.DEV) {
      console.log('📁 Archivos encontrados en el ZIP:');
      Object.keys(zip.files).forEach(filename => {
        console.log(`  - ${filename}`);
      });
    }
    
    // Buscar archivos en las rutas típicas de Instagram
    const possiblePaths = [
      'connections/followers_and_following/',
      'followers_and_following/',
      '',
    ];
    
    let followingFile: JSZip.JSZipObject | null = null;
    const followersFiles: JSZip.JSZipObject[] = [];
    
    // Buscar archivos en todas las posibles rutas
    for (const path of possiblePaths) {
      // Buscar following.json
      const followingPath = `${path}following.json`;
      if (zip.files[followingPath]) {
        followingFile = zip.files[followingPath];
      }
      
      // Buscar followers_*.json - ser más específico
      Object.keys(zip.files).forEach(filename => {
        const baseFilename = filename.split('/').pop() || '';
        if (filename.startsWith(path) && 
            baseFilename.startsWith('followers') &&
            baseFilename.endsWith('.json') &&
            !followersFiles.some(f => f.name === filename)) {
          followersFiles.push(zip.files[filename]);
        }
      });
      
      // Si encontramos archivos, no seguir buscando en otras rutas
      if (followingFile && followersFiles.length > 0) {
        break;
      }
    }
    
    if (!followingFile) {
      throw new Error('No encontré following.json en el ZIP');
    }
    
    if (followersFiles.length === 0) {
      throw new Error('No encontré archivos followers_*.json en el ZIP');
    }
    
    // Leer y parsear archivos
    console.log(`✅ Encontré following.json: ${followingFile.name}`);
    console.log(`✅ Encontré ${followersFiles.length} archivo(s) de followers:`, followersFiles.map(f => f.name));
    
    const followingText = await followingFile.async('text');
    const followingRawData = JSON.parse(followingText);
    
    console.log(`📊 Estructura de following.json:`, Object.keys(followingRawData));
    
    if (!validateJsonStructure(followingRawData, 'following.json')) {
      throw new Error('Estructura inválida en following.json');
    }
    
    // Extraer la lista correcta del archivo following
    const followingData = extractFollowingList(followingRawData, 'following.json');
    console.log(`👥 Following procesados: ${followingData.length} entradas`);
    
    const followersLists: IGList[] = [];
    
    for (const file of followersFiles) {
      try {
        const text = await file.async('text');
        const rawData = JSON.parse(text);
        
        if (import.meta.env.DEV) {
          console.log(`📂 Procesando archivo: ${file.name}`);
          console.log(`  Tamaño del archivo: ${text.length} caracteres`);
          console.log(`  Tipo de datos: ${typeof rawData}, Es array: ${Array.isArray(rawData)}`);
        }
        
        if (validateJsonStructure(rawData, file.name)) {
          // Extraer la lista correcta (para followers debería ser array directo)
          const data = extractFollowingList(rawData, file.name);
          if (import.meta.env.DEV) {
            console.log(`  ✅ Usuarios extraídos de ${file.name}: ${data.length}`);
          }
          followersLists.push(data);
        } else {
          console.warn(`❌ Saltando archivo con estructura inválida: ${file.name}`);
        }
      } catch (error) {
        console.warn(`❌ Error procesando ${file.name}:`, error);
      }
    }
    
    if (followersLists.length === 0) {
      throw new Error('No se pudieron procesar los archivos de followers del ZIP');
    }
    
    // Normalizar datos
    const following = normalizeIGList(followingData);
    const mergedFollowers = mergeFollowersFiles(followersLists);
    const followers = normalizeIGList(mergedFollowers);
    
    console.log(`📊 RESUMEN FINAL:`);
    console.log(`  👥 Following únicos: ${following.size}`);
    console.log(`  👥 Followers únicos: ${followers.size}`);
    console.log(`  📁 Total archivos de followers procesados: ${followersLists.length}`);
    console.log(`  📋 Total entradas antes de normalizar: ${mergedFollowers.length}`);
    
    return { followers, following };
    
  } catch (error) {
    console.error('Error parseando ZIP:', error);
    throw error;
  }
}
