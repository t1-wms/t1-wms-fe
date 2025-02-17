import { FC } from 'react';
import { ScanButtonProps } from './types';

export const ScanButton: FC<ScanButtonProps> = ({ 
  onClick,   
  isScanned, 
  scanText, 
  completedText, 
  disabled = false  
}) => {
  return (
    <div className="fixed bottom-16 left-0 right-0 px-4 py-2">
      <div className="max-w-sm mx-auto">
        <button
          onClick={onClick}
          disabled={disabled}
          className={`w-full p-4 rounded-md ${
            isScanned 
              ? 'bg-green-100 text-green-800' 
              : 'bg-t1normal text-white'
          }`}
        >
          {isScanned ? `✓ ${completedText}` : scanText}
        </button>
      </div>
    </div>
  );
};