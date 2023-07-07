import { useEffect, useRef } from 'react';
import Granim from 'granim';

const CalmingGradient = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const granimInstance = new Granim({
      element: canvasRef.current,
      direction: 'top-bottom',
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: [
            ['#F4F4F2', '#E8E8E8'], // Update the gradient colors here (violet and purple)
            ['#BBBFCA', '#F9F9F9'],
          ],
          transitionSpeed: 4000,
        },
      },
    });

    // Clean up the Granim instance when the component unmounts
    return () => {
      granimInstance.destroy();
    };
  }, []);

  return <canvas ref={canvasRef} className='calming-gradient'></canvas>;
};

export default CalmingGradient;
