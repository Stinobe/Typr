/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from "react";

type TimerCallback = (time: number) => void;

type TimerProps = {
  isActive: boolean;
  isPaused?: boolean;
  onStarted?: TimerCallback;
  onPaused?: TimerCallback;
  onStopped?: TimerCallback;
  onCount?: TimerCallback;
  accuracy?: number;
};

const Timer: React.FC<TimerProps> = (props: TimerProps): React.ReactElement => {
  const { isActive, isPaused, onStarted, onPaused, onStopped, onCount, accuracy } = props;
  const acc = accuracy ? 1000 / accuracy : 10;
  const [counter, setCounter] = useState(0);

  const milliseconds = () => counter * acc;

  const timingObj = () => {
    const currentMs = milliseconds();
    const ms = currentMs % 1000;
    const seconds = (currentMs - ms) / 1000;

    return {
      ms,
      seconds,
    };
  };

  useEffect(() => {
    let intervalId: any;
    if (isActive && !isPaused) {
      intervalId = setInterval(() => {
        setCounter(counter + 1);
      }, acc);
    }
    if (onCount) onCount(milliseconds());
    return () => clearInterval(intervalId);
  }, [isActive, counter, isPaused]);

  useEffect(() => {
    if (isActive || !isPaused) {
      if (onStarted) onStarted(milliseconds());
    } else if (isActive && isPaused) {
      if (onPaused) onPaused(milliseconds());
    } else if (!isActive) {
      if (onStopped) onStopped(milliseconds());
    }
  }, [isActive, isPaused]);

  const msString = () => {
    const ms = Math.round(timingObj().ms / acc);
    return ms < 10 ? `${ms}0` : ms;
  };

  const secondsString = () => timingObj().seconds.toString().padStart(2, "0");

  return (
    <span>
      <span>{secondsString()}</span>.<span>{msString()}</span>
    </span>
  );
};

export default Timer;
