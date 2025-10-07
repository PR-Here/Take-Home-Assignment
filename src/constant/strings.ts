import { stringsData } from './strings.data';

export const strings = stringsData;

// Type-safe access to strings
export type StringsType = typeof stringsData;

// Helper function to get strings
export const getString = (path: string): string => {
  const keys = path.split('.');
  let result: any = stringsData;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return path if not found
    }
  }
  
  return typeof result === 'string' ? result : path;
};

export default strings;

