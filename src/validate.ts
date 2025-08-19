import type { FileValidationResult, IGList, IGFollowingFile } from './types';

/**
 * Valida que los archivos tengan la estructura correcta de Instagram
 */
export function validateFiles(files: FileList | File[]): FileValidationResult {
  const fileArray = Array.from(files);
  
  if (fileArray.length === 0) {
    return {
      isValid: false,
      error: 'No se seleccionaron archivos'
    };
  }

  // Buscar archivo following.json
  const followingFile = fileArray.find(f => 
    f.name === 'following.json' || f.name.includes('following')
  );

  // Buscar archivos followers_*.json (ser más específico)
  const followersFiles = fileArray.filter(f => {
    const fileName = f.name.split('/').pop() || f.name;
    return fileName.startsWith('followers') && fileName.endsWith('.json');
  });

  if (!followingFile) {
    return {
      isValid: false,
      error: 'No encontré el archivo following.json'
    };
  }

  if (followersFiles.length === 0) {
    return {
      isValid: false,
      error: 'No encontré archivos followers_*.json'
    };
  }

  return {
    isValid: true,
    files: {
      following: followingFile,
      followers: followersFiles
    }
  };
}

/**
 * Valida la estructura JSON de Instagram
 */
export function validateJsonStructure(data: unknown, filename: string): boolean {
  try {
    let list: IGList;
    
    // Si es following.json, puede tener la estructura { relationships_following: [...] }
    if (filename.includes('following') && !Array.isArray(data)) {
      const followingFile = data as IGFollowingFile;
      if (!followingFile.relationships_following || !Array.isArray(followingFile.relationships_following)) {
        console.warn(`${filename}: No encontré relationships_following o no es un array`);
        return false;
      }
      list = followingFile.relationships_following;
    } else if (Array.isArray(data)) {
      // Para followers_*.json y otros archivos que son arrays directos
      list = data as IGList;
    } else {
      console.warn(`${filename}: Estructura inesperada - ni array ni objeto with relationships_following`);
      return false;
    }
    
    // Validar que al menos algunos elementos tengan la estructura esperada
    const validItems = list.filter(item => 
      item.string_list_data && 
      Array.isArray(item.string_list_data) &&
      item.string_list_data.length > 0 &&
      typeof item.string_list_data[0].value === 'string'
    );

    if (validItems.length === 0) {
      console.warn(`${filename}: Estructura inesperada - no hay elementos válidos`);
      return false;
    }

    return true;
  } catch (error) {
    console.error(`Error validando ${filename}:`, error);
    return false;
  }
}

/**
 * Mensajes de error sugeridos
 */
export const ERROR_MESSAGES = {
  NO_FOLLOWING: 'No encontré following.json',
  NO_FOLLOWERS: 'No encontré followers_*.json',
  INVALID_STRUCTURE: 'Estructura inesperada en los archivos JSON',
  ZIP_NO_PATHS: 'ZIP sin las rutas esperadas',
  FILE_READ_ERROR: 'Error al leer los archivos',
  PARSE_ERROR: 'Error al procesar los datos JSON'
} as const;
