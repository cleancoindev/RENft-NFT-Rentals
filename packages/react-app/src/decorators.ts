/* eslint-disable */
// @ts-ignore
import click from './assets/sounds/percussion-bubble-pop.wav';

export const connectAudio = new Audio(click);

const withPlayOnClick = ({
  handleClick,
}: {
  handleClick?: CallableFunction;
}): void => {
  connectAudio.play();

  if (handleClick) {
    handleClick();
  }
};

export const answerToAll = 42;

export { withPlayOnClick };
