import { reactive, ref, Ref } from '@vue/composition-api';

interface Message {
  x: number;
  message: string;
}

interface Player {
  x: 0 | 580;
  y: number;
  speed: number;
  width: 20;
  height: 90;
  points: number;
  movingUp: boolean;
  movingDown: boolean;
  color: 'green' | 'orange';
  keys: Player1Keys | Player2Keys;
  keyup: (e: KeyboardEvent) => void;
  keydown: (e: KeyboardEvent) => void;
};

interface Ball {
  x: number;
  y: number;
  radius: 3;
  velocity: {
    x: number;
    y: number;
  };
  generateRandomStartingVelocity(): { x: number; y: number };
  calcHitOrScore(p1: Player, p2: Player): -1 | 0 | 1 | 2;
  reset(): void;
}

type Player1Keys = ['w', 's'];
type Player2Keys = ['ArrowUp', 'ArrowDown'];

export const useWon = () =>
  reactive({
    x: 0,
    message: '',
  });

export const useMessage = (): Message =>
  reactive({
    x: 267,
    message: 'Ready Up',
  });

export const useReady = (): [Ref<boolean>, (b: boolean) => void] => {
  const ready = ref(false);
  const setReady = (b: boolean) => { ready.value = b; };

  return [ready, setReady];
};

export const usePlayer = (
  speed: number,
  color: 'green' | 'orange',
  keys: Player1Keys | Player2Keys,
  x: 0 | 580
) =>
  reactive<Player>({
    speed,
    color,
    height: 90,
    width: 20,
    x,
    y: 100,
    points: 0,
    movingDown: false,
    movingUp: false,
    keys,
    keyup(e: KeyboardEvent) {
      if (e.key === this.keys[0]) {
        this.movingUp = false;
      } else if (e.key === this.keys[1]) {
        this.movingDown = false;
      }
    },
    keydown(e: KeyboardEvent) {
      if (e.key === this.keys[0]) {
        this.movingUp = true;
        this.movingDown = false;
      } else if (e.key === this.keys[1]) {
        this.movingUp = false;
        this.movingDown = true;
      }
    },
  });

export const useBall = () =>
  reactive<Ball>({
    x: 300,
    y: 100,
    radius: 3,
    velocity: {
      x: 0,
      y: 0,
    },
    /**
     * 
     * @param player1 Player interface
     * @param player2 Player interface
     * @returns -1: do nothing
     * @returns  0: bounce ball ... also sets the ball away from the paddle so the ball does not get stuck inside of the paddle.
     * @returns  1: goal on player 1
     * @returns  2: goal on player 2
     */
    calcHitOrScore(player1: Player, player2: Player) {
      // Check if the ball is on the left side
      if (this.x < 300) {
        // Check if the ball is in the goal zone for player 1
        // Player1's x should always be 0
        if (player1.width >= this.x - this.radius) {
          // Under the top of the paddle
          if (player1.y < this.y) {
            // over the bottom of the paddle
            if (player1.y + player1.height > this.y) {
              // Set the balls x to be just outside of the paddle so it doesnt get stuck in the paddle
              this.x = player1.width + this.radius;
              return 0;
            }
          }
          return 1; // score one player 1 give points to player 2
        }
        return -1; // Dont check for player 2 as player 2 doesnt need to be checked... the ball is on the left side
      }

      // now the ball is obviously on the right side, (the width of the svg game is 600)

      // Check if the ball is in the goal zone for player2 / Computer
      if (player2.x <= this.x + this.radius) {
        // under the top of the paddle
        if (player2.y < this.y) {
          // over the bottom of the paddle
          if (player2.y + player2.height > this.y) {
            // Set the balls x to be just outside of the paddle so it doesnt get stuck in the paddle
            this.x = player2.x - this.radius;
            return 0;
          }
        }

        return 2; // score on player 2 give points to player 1
      }
      return -1;
    },
    /**
     * Generates a randome x and y cordiante -7 - 7
     */
    generateRandomStartingVelocity: () => ({
      x: (Math.round(Math.random() * 5) + 2) * (Math.round(Math.random()) ? 1 : -1),
      y: (Math.round(Math.random() * 5) + 2) * (Math.round(Math.random()) ? 1 : -1),
    }),
    reset() {
      this.y = 100;
      this.x = 300;
      this.velocity = this.generateRandomStartingVelocity();
    },
  });
