import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlayFill, BsPauseFill, BsArrowRepeat } from 'react-icons/bs';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Switcher from './Switcher';
import {
  decrementTime,
  resetTimer,
  setRunningStatus,
  setTimerInterval,
} from '../store/slices/timerSlice';

const Timer = () => {
  const dispatch = useDispatch();
  const remainingTime = useSelector((state) => state.timer.remainingTime);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const isCompleted = useSelector((state) => state.timer.isCompleted);

  const [showTimer, setShowTimer] = useState(true);

  const timerRef = useRef(null);

  useEffect(() => {
    let timerInterval;

    if (isRunning && !isCompleted) {
      // Start the timer interval if running and not completed
      timerInterval = setInterval(() => {
        dispatch(decrementTime());
      }, 1000);
    }

    // Store the timer interval ID in the Redux store
    dispatch(setTimerInterval(timerInterval));

    // Clean up the interval when the component unmounts or the timer completes
    return () => clearInterval(timerInterval);
  }, [dispatch, isRunning, isCompleted]);

  const handlePlayClick = () => {
    dispatch(setRunningStatus(true));
  };

  const handlePauseClick = () => {
    dispatch(setRunningStatus(false));
  };

  const handleResetClick = () => {
    dispatch(resetTimer());
  };

  const timerStyles = {
    // Add any custom styles for the timer container here
    position: 'relative',
  };

  const pulsingStyles = {
    // Apply the pulsing animation styles
    animation: `${isRunning && !isCompleted ? 'pulse 1s infinite' : ''}`,
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section className='flex min-h-full w-full flex-1 flex-col justify-center mt-6 pt-2 max-w-sm rounded overflow-hidden shadow-lg'>
      <div
        className='flex items-center justify-center bg-indigo-600 opacity-90 rounded-t py-1 cursor-pointer'
        onClick={() => setShowTimer(!showTimer)}
      >
        <ul className='flex justify-between items-center w-full space-x-2 mx-3'>
          <h3 className='text-lg font-bold tracking-tight text-white'>Timer</h3>
          <Switcher toggler={showTimer} />
        </ul>
      </div>

      {showTimer ? (
        <div
          className='flex flex-col items-center mt-6 pb-5'
          style={timerStyles}
        >
          {/* Transparent bubbles container */}
          {isRunning && (
            <div className='bubble-container'>
              {Array.from({ length: 30 }).map((_, index) => (
                <div
                  key={index}
                  className='bubble'
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${Math.random() * 5 + 2}s`,
                  }}
                ></div>
              ))}
            </div>
          )}

          {/* Timer display */}
          <div
            ref={timerRef}
            className='w-24 h-24 relative rounded-full border-4 border-indigo-600 text-2xl font-bold text-indigo-600 flex items-center justify-center'
            style={pulsingStyles}
          >
            {formatTime(remainingTime)}
          </div>

          {/* Timer controls */}
          <div className='mt-4 flex space-x-4'>
            {isRunning ? (
              <button
                onClick={handlePauseClick}
                className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500'
              >
                <BsPauseFill className='inline-block mr-2' />
                Pause
              </button>
            ) : (
              <button
                onClick={handlePlayClick}
                className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500'
              >
                <BsPlayFill className='inline-block mr-2' />
                Play
              </button>
            )}

            {!isRunning && (
              <button
                onClick={handleResetClick}
                className='px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500'
              >
                <BsArrowRepeat className='inline-block mr-2' />
                Reset
              </button>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default Timer;
