import React, { useRef, useState, useEffect, useCallback } from 'react';
import { RotateCcw, PenTool, CheckCircle } from 'lucide-react';

interface SignaturePadProps {
  onSignatureChange: (signatureDataUrl: string | null) => void;
  initialSignature?: string | null;
  error?: string;
  disabled?: boolean;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({
  onSignatureChange,
  initialSignature = null,
  error,
  disabled = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize canvas with proper resolution and sizing
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Save existing drawing if any
    let tempImg: ImageData | null = null;
    const ctx = canvas.getContext('2d');
    if (ctx && canvas.width > 0 && canvas.height > 0 && hasSignature) {
      try {
        tempImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
      } catch (e) {
        // ignore on cross-origin / uninitialized
      }
    }

    const displayWidth = Math.floor(rect.width);
    const displayHeight = 160; // standard comfortable height for signature

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#6D214F'; // Brand magenta ink

      if (tempImg) {
        ctx.putImageData(tempImg, 0, 0);
      } else if (initialSignature) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
          setHasSignature(true);
        };
        img.src = initialSignature;
      }
    }
  }, [hasSignature, initialSignature]);

  useEffect(() => {
    setupCanvas();
    const handleResize = () => {
      // Debounced or direct resize
      setupCanvas();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setupCanvas]);

  const getCoordinates = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as MouseEvent | React.MouseEvent).clientX;
      clientY = (e as MouseEvent | React.MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Prevent default scroll on touch
    if ('touches' in e) {
      e.preventDefault();
    }

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if ('touches' in e) {
      e.preventDefault();
    }

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasSignature) {
      setHasSignature(true);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    onSignatureChange(dataUrl);
  };

  const handleClear = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHasSignature(false);
    onSignatureChange(null);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <PenTool className="w-3.5 h-3.5 text-[#8B1E5C]" />
          <label className="text-[11px] font-bold text-[#6D214F] uppercase tracking-wider">
            Digital Signature Canvas <span className="text-red-500 font-bold">*</span>
          </label>
        </div>

        <div className="flex items-center gap-2">
          {hasSignature && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
              <CheckCircle className="w-3 h-3" />
              Signed
            </span>
          )}
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled || !hasSignature}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-[#8B1E5C] bg-[#FAF8FB] hover:bg-[#8B1E5C]/10 rounded-lg border border-[#8B1E5C]/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Signature Canvas Box */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative w-full rounded-xl overflow-hidden border-2 transition-all bg-white ${
          error
            ? 'border-red-400 bg-red-50/20'
            : isHovered || isDrawing
            ? 'border-[#8B1E5C] shadow-sm'
            : 'border-dashed border-[#8B1E5C]/35 bg-[#FAF8FB]/40 hover:border-[#8B1E5C]'
        }`}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[160px] cursor-crosshair touch-none select-none block"
          style={{ touchAction: 'none' }}
        />

        {/* Watermark Helper Text when empty */}
        {!hasSignature && !isDrawing && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-4">
            <PenTool className="w-6 h-6 text-[#8B1E5C]/30 mb-1" />
            <p className="text-xs font-semibold text-[#8B1E5C]/60">
              Draw your signature here using mouse, finger, or stylus
            </p>
            <p className="text-[10px] text-[#777777] mt-0.5">
              Touch or click and drag to sign
            </p>
          </div>
        )}

        {/* Baseline signing guideline */}
        <div className="absolute left-6 right-6 bottom-6 border-b border-dashed border-[#8B1E5C]/25 pointer-events-none" />
      </div>

      {error && <span className="block text-[11px] text-red-600 font-medium">{error}</span>}
    </div>
  );
};

export default SignaturePad;
