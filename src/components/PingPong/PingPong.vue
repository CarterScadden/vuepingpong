<template>
  <svg width="600" height="300" ref="pp-svg" style="background-color: rgb(33,33,33);">
    <!-- If game is not started / has ended -->
    <g v-show="!gaming"
      @click="startGame"
      style="cursor: pointer;"
    >
      <rect
        x="250"
        y="125"
        width="100"
        height="50"
        fill="rgb(33,33,33)"
        stroke="white"
      />

      <text
        fill="white"
        :x="message.x"
        y="155"
      >{{message.message}}</text>
    </g>

    <text v-show="!gaming && won.message"
      fill="white"
      :x="won.x"
      y="100"
    >{{won.message}}</text>

    <text
      fill="white"
      x="10"
      y="25"
    >Score: {{player1.points}}</text>

    <text
      fill="white"
      x="530"
      y="25"
    >Score: {{player2.points}}</text>

    <rect
      :fill="player1.color"
      :x="player1.x"
      :y="player1.y"
      :width="player1.width"
      :height="player1.height"
    />

    <rect
      :fill="player2.color"
      :x="player2.x"
      :y="player2.y"
      :width="player2.width"
      :height="player2.height"
    />

    <!-- ball -->
    <circle 
      :cx="ball.x"
      :cy="ball.y"
      :r="ball.radius"
      fill="yellow"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, watch } from '@vue/composition-api';
import {
  useMessage,
  useReady,
  usePlayer,
  useBall,
  useWon
} from './PingPong';
interface Props {
  gaming: boolean;
  players: 0 | 1;
}

export default defineComponent<Props>({
  props: {
    gaming: Boolean,
    players: Number,
  },

  setup(props, context) {
    const message = useMessage();
    const won = useWon();
    const [ready, setReady] = useReady();
    const ball = useBall();
    const player1 = usePlayer(7, 'green', ['w', 's'], 0);
    const player2 = usePlayer(8, 'orange', ['ArrowUp', 'ArrowDown'], 580);

    const startSinglePlayer = () => {
      ball.reset();

      document.addEventListener('keyup', (e) => {
        player1.keyup(e);
      });
      document.addEventListener('keydown', (e) => {
        player1.keydown(e);
      });

      const game = () => {
        if (player1.movingDown) {
          // If player has not hit the "barrier"
          if (player1.y <= 300 - player1.height) {
            player1.y += player1.speed;
          }
        } else if (player1.movingUp) {
          // If player has not hit the "barrier"
          if (player1.y >= 0) {
            player1.y -= player1.speed;
          }
        }

        //
        //

        if (player2.movingDown) {
          // If player has not hit the "barrier"
          if (player2.y <= 300 - player2.height) {
            player2.y += player2.speed;
          } else { // since player2 is a computer we want to moving it contantly up and down.
            player2.movingDown = false;
            player2.movingUp = true;
          }
        } else if (player2.movingUp) {
          // If player has not hit the "barrier"
          if (player2.y >= 0) {
            player2.y -= player2.speed;
          } else { // since player2 is a computer we want to moving it contantly up and down.
            player2.movingDown = true;
            player2.movingUp = false;
          }
        } else {
          player2.movingDown = true;
        }

        /*
        
        * @returns -1: do nothing
        * @returns  0: bounce ball ... also sets the ball away from the paddle so the ball does not get stuck inside of the paddle.
        * @returns  1: goal on player 1
        * @returns  2: goal on player 2

        */
        const hitOrScoreNum = ball.calcHitOrScore(player1, player2);

        if (hitOrScoreNum === -1) {
          // If the ball hits the ceiling or floor reverse the y velocity of the ball
          if (ball.y <= ball.radius || ball.y >= 293) {
            ball.velocity.y *= -1;
          }
        } else if (hitOrScoreNum === 0) {
          // This means the ball hit a paddle so just reverse the x direction of the ball
          ball.velocity.x *= -1.15;
        } else if (hitOrScoreNum === 1) {
          // The ball was scored on player 1 so give player2 more points
          // In this case since its a computer and i want the game to be endless we will just end the game for player1
          // As in the goal of this will not to be first to 5 but as many points in a row.
          context.emit('toggle-gaming-off');
          won.x = 270;
          won.message = `${player1.points} Points!`;
          return;
          // WON
        } else if (hitOrScoreNum === 2) {
          // the ball was scored on player 2 so give player 1 the points
          player1.points++;
          ball.reset();
        }
        
        ball.x += ball.velocity.x;
        ball.y += ball.velocity.y;

        setTimeout(game, 15);
      };

      game();

      document.removeEventListener('keyup', player1.keydown);
      document.removeEventListener('keydown', player1.keydown);
    };

    const startMultiplayer = () => {
      ball.reset();

      const keydown = (e: KeyboardEvent) => {
        player1.keydown(e);
        player2.keydown(e);
      };

      const keyup = (e: KeyboardEvent) => {
        player1.keyup(e);
        player2.keyup(e);
      };

      document.addEventListener('keyup', (e) => keyup(e));
      document.addEventListener('keydown', (e) => keydown(e));

      const game = () => {
        if (player1.movingDown) {
          // If player has not hit the "barrier"
          if (player1.y <= 300 - player1.height) {
            player1.y += player1.speed;
          }
        } else if (player1.movingUp) {
          // If player has not hit the "barrier"
          if (player1.y >= 0) {
            player1.y -= player1.speed;
          }
        }

        //
        //

        if (player2.movingDown) {
          // If player has not hit the "barrier"
          if (player2.y <= 300 - player2.height) {
            player2.y += player2.speed;
          }
        } else if (player2.movingUp) {
          // If player has not hit the "barrier"
          if (player2.y >= 0) {
            player2.y -= player2.speed;
          }
        }

        /*
        
        * @returns -1: do nothing
        * @returns  0: bounce ball ... also sets the ball away from the paddle so the ball does not get stuck inside of the paddle.
        * @returns  1: goal on player 1
        * @returns  2: goal on player 2

        */
        const hitOrScoreNum = ball.calcHitOrScore(player1, player2);

        if (hitOrScoreNum === -1) {
          // If the ball hits the ceiling or floor reverse the y velocity of the ball
          if (ball.y <= ball.radius || ball.y >= 293) {
            ball.velocity.y *= -1;
          }
        } else if (hitOrScoreNum === 0) {
          // This means the ball hit a paddle so just reverse the x direction of the ball
          ball.velocity.x *= -1.15;
        } else if (hitOrScoreNum === 1) {
          // The ball was scored on player 1 so give player2 more points

          player2.points++;
          if (player2.points === 5) {
            context.emit('toggle-gaming-off');
            won.x = 250;
            won.message = 'Player 2 Won!';
            message.message = 'Start';
            message.x = 270;
            return;
          }
          ball.reset();
          // WON
        } else if (hitOrScoreNum === 2) {
          // the ball was scored on player 2 so give player 1 the points
          player1.points++;
          if (player1.points === 5) {
            context.emit('toggle-gaming-off');
            won.x = 250;
            won.message = 'Player 1 Won!';
            message.message = 'Start';
            message.x = 270;
            return;
          }
          ball.reset();
        }
        
        ball.x += ball.velocity.x;
        ball.y += ball.velocity.y;

        setTimeout(game, 15);
      };

      game();

      document.removeEventListener('keyup', keyup);
      document.removeEventListener('keydown', keydown);
    };

    const reset = () => {
      player1.points = 0;
      player2.points = 0;
      // In case player2 was a computer we want to change it to be at a even playing field.
      player2.speed = player1.speed;
    };

    const startGame = () => {
      context.emit('toggle-gaming-on');
      
      reset();

      if (props.players === 1) {
        startSinglePlayer();
      } else {
        startMultiplayer();
      }
    };

    watch(
      () => player1.points,
      () => {
        // If single player
        if (props.players === 1) {
          // if computer speed is not at the max computer speed of 13
          if (player2.speed !== 13) {
            // increment the speed by 1
            player2.speed += 1;
          }
        }
      },
      { lazy: true, }
    );

    watch(
      () => ready,
      () => ready ? startGame() : null,
      { lazy: true, }  
    );
    return ({
      message,
      won,
      
      startGame,

      ball,

      ready,
      setReady,
      
      player1,
      player2,
    });
  },
});
</script>

<style lang="scss">

</style>
