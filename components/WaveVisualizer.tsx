import React, { useEffect, useRef } from 'react';

interface WaveVisualizerProps {
  isConnected: boolean;
  isSpeaking: boolean;
  volume: number; // 0-255
}

export const WaveVisualizer: React.FC<WaveVisualizerProps> = ({ isConnected, isSpeaking, volume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let phase = 0;
    
    const render = () => {
        canvas.width = canvas.parentElement?.clientWidth || 300;
        canvas.height = canvas.parentElement?.clientHeight || 150;
        
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;
        
        ctx.clearRect(0, 0, width, height);
        
        if (!isConnected) {
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(width, centerY);
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)'; // Sky 500 low opacity
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.stroke();
            ctx.setLineDash([]);
            return;
        }

        const baseAmplitude = isSpeaking ? (volume / 255) * (height / 2.5) : 5;
        const frequency = isSpeaking ? 0.1 : 0.05;
        const speed = isSpeaking ? 0.2 : 0.05;
        
        phase += speed;
        
        // Draw multiple sine waves
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.lineWidth = isSpeaking ? 2 : 1;
            
            if (isSpeaking) {
                // Agent Speaking: Mix of Sky and Indigo
                const color = i % 2 === 0 ? '14, 165, 233' : '99, 102, 241'; // Sky vs Indigo
                ctx.strokeStyle = `rgba(${color}, ${0.6 + (i * 0.1)})`;
                ctx.shadowBlur = 10;
                ctx.shadowColor = `rgba(${color}, 0.5)`;
            } else {
                // Listening: Warm Amber/Orange to indicate attention
                ctx.strokeStyle = `rgba(245, 158, 11, ${0.4 + (i * 0.15)})`;
                ctx.shadowBlur = 0;
            }
            
            for (let x = 0; x < width; x++) {
                // Multi-sine logic for organic look
                const y = centerY + 
                          Math.sin(x * frequency + phase + i) * (baseAmplitude + (i * 5)) * Math.sin(x / width * Math.PI);
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
        
        animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
  }, [isConnected, isSpeaking, volume]);
  
  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" />;
};