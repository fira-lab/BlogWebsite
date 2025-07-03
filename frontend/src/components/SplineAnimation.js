import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

function SplineAnimation() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const app = new Application(canvas);
    app.load('https://prod.spline.design/6qCphDP3fMB78p2W/scene.splinecode');
  }, []);
  

  return <canvas id="canvas3d" ref={canvasRef} />;
}

export default SplineAnimation;

