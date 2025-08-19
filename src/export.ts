import { saveAs } from 'file-saver';
import type { Results } from './types';

/**
 * Exporta una lista de usuarios a CSV
 */
export function exportToCSV(users: string[], filename: string): void {
  if (users.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Crear contenido CSV
  const csvContent = [
    'username', // Cabecera
    ...users    // Datos
  ].join('\n');

  // Crear blob y descargar
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const finalFilename = `${filename}-${timestamp}.csv`;
  
  saveAs(blob, finalFilename);
}

/**
 * Exporta la lista de "no me siguen de vuelta"
 */
export function exportNotFollowingBack(results: Results): void {
  exportToCSV(results.notFollowingBack, 'no-me-siguen');
}

/**
 * Exporta la lista de seguidores mutuos
 */
export function exportMutuals(results: Results): void {
  exportToCSV(results.mutuals, 'mutuos');
}

/**
 * Exporta la lista de fans (me siguen pero no los sigo)
 */
export function exportFans(results: Results): void {
  exportToCSV(results.fans, 'fans');
}

/**
 * Copia una lista de usuarios al portapapeles
 */
export async function copyToClipboard(users: string[]): Promise<void> {
  if (users.length === 0) {
    alert('No hay datos para copiar');
    return;
  }

  try {
    const text = users.join('\n');
    await navigator.clipboard.writeText(text);
    alert(`${users.length} usuarios copiados al portapapeles`);
  } catch (error) {
    console.error('Error copiando al portapapeles:', error);
    
    // Fallback: crear un textarea temporal
    const textarea = document.createElement('textarea');
    textarea.value = users.join('\n');
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      alert(`${users.length} usuarios copiados al portapapeles`);
    } catch (fallbackError) {
      console.error('Error en fallback de copia:', fallbackError);
      alert('Error al copiar. Intenta seleccionar y copiar manualmente.');
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

/**
 * Exporta todas las listas a un ZIP
 */
export async function exportAllToZip(results: Results): Promise<void> {
  try {
    // Importar JSZip dinámicamente para evitar carga innecesaria
    const JSZip = (await import('jszip')).default;
    
    const zip = new JSZip();
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    
    // Agregar cada lista como CSV
    if (results.notFollowingBack.length > 0) {
      const csvContent = ['username', ...results.notFollowingBack].join('\n');
      zip.file(`no-me-siguen-${timestamp}.csv`, csvContent);
    }
    
    if (results.mutuals.length > 0) {
      const csvContent = ['username', ...results.mutuals].join('\n');
      zip.file(`mutuos-${timestamp}.csv`, csvContent);
    }
    
    if (results.fans.length > 0) {
      const csvContent = ['username', ...results.fans].join('\n');
      zip.file(`fans-${timestamp}.csv`, csvContent);
    }
    
    // Generar y descargar ZIP
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `instagram-analisis-${timestamp}.zip`);
    
  } catch (error) {
    console.error('Error exportando ZIP:', error);
    alert('Error al exportar ZIP. Intenta exportar cada lista por separado.');
  }
}
