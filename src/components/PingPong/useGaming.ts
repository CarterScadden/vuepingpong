import { ref } from '@vue/composition-api';
import { useRef } from '../../types/useTypes';

export const useGaming: useRef<boolean> = (b) => {
  const gaming = ref(b !== undefined ? b : false);
  const setGaming = (b: boolean) => { gaming.value = b; };
  return [gaming, setGaming];
};
