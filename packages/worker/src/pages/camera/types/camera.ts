export interface QRData {
    data: string;
  }
  
  export interface ScanResult {
    success: boolean;
    data?: string;
    error?: string;
  }