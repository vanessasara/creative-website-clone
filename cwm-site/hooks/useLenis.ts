import { useContext } from 'react';
import { LenisContext } from '@/app/providers';

export function useLenis() {
  return useContext(LenisContext);
}
