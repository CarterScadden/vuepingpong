import { ref, Ref } from '@vue/composition-api';

export const usePlayers = (n: 1|2): [Ref<1|2>, (n: 1|2) => void] => {
  const players = ref<1|2>(n);
  const setPlayers = (n: 1 | 2) => { players.value = n; };
  return [players, setPlayers];
};
