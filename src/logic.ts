import type { Normalized, Results } from './types';

/**
 * Calcula las tres listas principales:
 * 1. No me siguen de vuelta = following - followers
 * 2. Mutuos = intersección
 * 3. Fans = followers - following
 */
export function computeResults(data: Normalized): Results {
  const { followers, following } = data;
  
  // No me siguen de vuelta: usuarios que sigo pero no me siguen
  const notFollowingBack: string[] = [];
  for (const username of following) {
    if (!followers.has(username)) {
      notFollowingBack.push(username);
    }
  }
  
  // Mutuos: usuarios que me siguen y yo sigo
  const mutuals: string[] = [];
  for (const username of following) {
    if (followers.has(username)) {
      mutuals.push(username);
    }
  }
  
  // Fans: usuarios que me siguen pero yo no sigo
  const fans: string[] = [];
  for (const username of followers) {
    if (!following.has(username)) {
      fans.push(username);
    }
  }
  
  // Ordenar alfabéticamente
  notFollowingBack.sort();
  mutuals.sort();
  fans.sort();
  
  return {
    notFollowingBack,
    mutuals,
    fans
  };
}

/**
 * Filtra una lista de usuarios por término de búsqueda
 */
export function filterUsers(users: string[], searchTerm: string): string[] {
  if (!searchTerm.trim()) {
    return users;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return users.filter(username => 
    username.toLowerCase().includes(term)
  );
}

/**
 * Formatea números con separadores de miles
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('es-ES').format(num);
}

/**
 * Genera estadísticas resumidas
 */
export function getStatsSummary(data: Normalized, results: Results) {
  return {
    totalFollowing: data.following.size,
    totalFollowers: data.followers.size,
    notFollowingBack: results.notFollowingBack.length,
    mutuals: results.mutuals.length,
    fans: results.fans.length
  };
}

/**
 * Calcula el porcentaje de una cantidad respecto al total
 */
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 100);
}
