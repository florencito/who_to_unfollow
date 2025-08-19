/**
 * Tipos de datos para el análisis de Instagram followers/following
 */

export type IGRow = {
  string_list_data?: Array<{ 
    value: string; 
    href?: string; 
    timestamp?: number; 
  }>;
};

export type IGList = IGRow[];

export type IGFollowingFile = {
  relationships_following: IGList;
};

export type Normalized = { 
  followers: Set<string>; 
  following: Set<string>; 
};

export type Results = { 
  notFollowingBack: string[]; 
  mutuals: string[]; 
  fans: string[]; 
};

export type FileValidationResult = {
  isValid: boolean;
  error?: string;
  files?: {
    following?: File;
    followers: File[];
  };
};

export type AppState = {
  isLoading: boolean;
  data: Normalized | null;
  results: Results | null;
  error: string | null;
  searchTerm: string;
  currentTab: 'notFollowingBack' | 'mutuals' | 'fans';
};
