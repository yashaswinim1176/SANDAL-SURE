import React, { useRef, useState, useEffect } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import jsQR from 'jsqr';
import { Camera, Upload, X, AlertCircle, CheckCircle, RefreshCw, Barcode, QrCode } from 'lucide-react';

interface QRCameraScannerProps {
  onScanSuccess: (batchId: string) => void;
  onClose: () => void;
}

export const QRCameraScanner: React.FC<QRCameraScannerProps> = ({
  onScanSuccess,
  onClose,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);
  const [streamActive, setStreamActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scanState, setScanState] = useState<'scanning' | 'found' | 'error'>('scanning');
  const [scanFormat, setScanFormat] = useState<string>('Barcode / QR Code');

  // Helper to extract batch ID from URL or raw text
  const parseBatchId = (text: string): string => {
    try {
      if (text.includes('?batch=')) {
        const url = new URL(text);
        return url.searchParams.get('batch') || text;
      }
      if (text.includes('/verify/')) {
        const parts = text.split('/verify/');
        return parts[1]?.split('?')[0]?.split('/')[0] || text;
      }
    } catch {
      // Not a valid URL, treat as raw text
    }
    return text.trim();
  };

  const startCamera = async () => {
    setErrorMessage(null);
    setScanState('scanning');

    try {
      const codeReader = new BrowserMultiFormatReader();
      codeReaderRef.current = codeReader;

      const videoElement = videoRef.current;
      if (!videoElement) return;

      // Start continuous decode from video device
      await codeReader.decodeFromConstraints(
        {
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        videoElement,
        (result, error) => {
          if (result) {
            const rawText = result.getText();
            const formatName = result.getBarcodeFormat() ? result.getBarcodeFormat().toString() : 'Barcode/QR';
            setScanFormat(formatName);
            const batchId = parseBatchId(rawText);
            setScanState('found');
            stopCamera();
            setTimeout(() => {
              onScanSuccess(batchId);
            }, 600);
          }
        }
      );

      setStreamActive(true);
    } catch (err: any) {
      console.warn('ZXing camera start error, falling back to manual getUserMedia:', err);
      // Fallback to basic getUserMedia + jsQR
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute('playsinline', 'true');
          await videoRef.current.play();
          setStreamActive(true);
          requestAnimationFrame(scanFallback);
        }
      } catch (nativeErr: any) {
        setErrorMessage(
          nativeErr.name === 'NotAllowedError'
            ? 'Camera permission denied. You can upload a photo of the product barcode or choose a demo batch.'
            : 'Unable to access device camera. Please check device permissions or use the file uploader.'
        );
        setScanState('error');
      }
    }
  };

  const scanFallback = () => {
    if (
      videoRef.current &&
      videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA &&
      canvasRef.current &&
      scanState === 'scanning'
    ) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'attemptBoth',
        });

        if (code && code.data) {
          const batchId = parseBatchId(code.data);
          setScanState('found');
          stopCamera();
          onScanSuccess(batchId);
          return;
        }
      }
      requestAnimationFrame(scanFallback);
    }
  };

  const stopCamera = () => {
    try {
      if (codeReaderRef.current) {
        // Stop decoding
        codeReaderRef.current = null;
      }
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    } catch (e) {
      console.warn('Error stopping camera:', e);
    }
    setStreamActive(false);
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Handle image upload from gallery / camera roll
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const codeReader = new BrowserMultiFormatReader();
      const imgUrl = URL.createObjectURL(file);
      const img = new Image();
      img.onload = async () => {
        try {
          const result = await codeReader.decodeFromImageElement(img);
          if (result) {
            const batchId = parseBatchId(result.getText());
            setScanState('found');
            stopCamera();
            URL.revokeObjectURL(imgUrl);
            onScanSuccess(batchId);
            return;
          }
        } catch {
          // Fallback to jsQR canvas
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code && code.data) {
              const batchId = parseBatchId(code.data);
              setScanState('found');
              stopCamera();
              URL.revokeObjectURL(imgUrl);
              onScanSuccess(batchId);
              return;
            }
          }
          alert('Could not detect a clear barcode or QR code in this image. Please ensure the code is well-lit and in focus.');
        }
      };
      img.src = imgUrl;
    } catch {
      alert('Failed to process image file.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#24140D] text-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#4A2E1F] space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#3D2418] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white text-[#24140D] flex items-center justify-center">
              <Barcode className="w-5 h-5 text-[#24140D]" />
            </div>
            <div>
              <h3 className="font-heritage font-bold text-base text-white">
                Scan Product Barcode / QR Code
              </h3>
              <p className="text-[11px] text-stone-300">
                Point your phone camera at the packaging label
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-[#3D2418] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewport / Viewfinder */}
        <div className="relative aspect-square max-h-72 w-full bg-black rounded-xl overflow-hidden border border-[#4A2E1F] flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Target Scanning Overlay Box (Adaptive for 1D Barcode and 2D QR Code) */}
          {streamActive && scanState === 'scanning' && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-56 h-48 border-2 border-dashed border-[#D4AF37] rounded-xl relative animate-pulse flex flex-col justify-between p-2">
                <div className="flex justify-between w-full">
                  <div className="w-4 h-4 border-t-4 border-l-4 border-white"></div>
                  <div className="w-4 h-4 border-t-4 border-r-4 border-white"></div>
                </div>
                <div className="flex justify-between w-full">
                  <div className="w-4 h-4 border-b-4 border-l-4 border-white"></div>
                  <div className="w-4 h-4 border-b-4 border-r-4 border-white"></div>
                </div>
                {/* Horizontal scanning laser */}
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/90 shadow-[0_0_12px_rgba(255,255,255,1)]"></div>
              </div>
            </div>
          )}

          {/* Success Flash */}
          {scanState === 'found' && (
            <div className="absolute inset-0 bg-[#24140D]/95 flex flex-col items-center justify-center space-y-2 text-white">
              <CheckCircle className="w-12 h-12 text-[#D4AF37] animate-bounce" />
              <p className="font-bold text-sm">Code Detected!</p>
              <p className="text-xs text-stone-300 font-mono">Format: {scanFormat}</p>
              <p className="text-xs text-stone-300">Retrieving Full Custody Ledger...</p>
            </div>
          )}

          {/* Error / Fallback View */}
          {scanState === 'error' && (
            <div className="p-4 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <p className="text-xs text-stone-200">{errorMessage}</p>
              <button
                onClick={startCamera}
                className="px-3 py-1.5 bg-white text-[#24140D] rounded-lg text-xs font-bold flex items-center gap-1.5 mx-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Camera</span>
              </button>
            </div>
          )}
        </div>

        {/* Alternative Input Options: Upload Image or Quick Simulation */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-1.5 px-3 py-2 bg-[#180D08] hover:bg-[#2D160C] text-stone-200 rounded-lg cursor-pointer border border-[#3D2418] transition-colors">
              <Upload className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Upload Photo / Barcode</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <span className="text-stone-400 text-[11px]">or test sample:</span>
          </div>

          {/* Quick Demo Scan Chips */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              onClick={() => {
                stopCamera();
                onScanSuccess('MS2026-V801');
              }}
              className="p-2 bg-[#180D08] hover:bg-[#2D160C] border border-[#3D2418] rounded-xl text-left truncate cursor-pointer"
            >
              <span className="font-mono font-bold text-white block">MS2026-V801</span>
              <span className="text-stone-300 text-[10px]">Mysore Sandal Soap (Golden)</span>
            </button>
            <button
              onClick={() => {
                stopCamera();
                onScanSuccess('MS2026-M402');
              }}
              className="p-2 bg-[#180D08] hover:bg-[#2D160C] border border-[#3D2418] rounded-xl text-left truncate cursor-pointer"
            >
              <span className="font-mono font-bold text-amber-300 block">MS2026-M402</span>
              <span className="text-amber-200/80 text-[10px]">Pure Sandal Oil (Missing Stage)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
