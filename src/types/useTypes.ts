import { ref, Ref } from '@vue/composition-api';

const x = ref(2);

/**
  useRef<T> will be used like:
  
  const useSomething: useRef<number> = (defaultNumber) => {
    const num = ref(defaultNumber ? defaultNumber : 0);
    const setNum = (n: number) => {
      num.value = n;
    };

    return [num, setNum];
  }
*/
export type useRef<T> = (def?:T) => [
  Ref<T>,
  (t:T) => void,
];