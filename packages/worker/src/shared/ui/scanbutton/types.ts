export interface ScanButtonProps {
    onClick: () => void;      // 버튼 클릭 핸들러
    isScanned: boolean;       // 스캔 완료 여부
    scanText: string;         // 스캔 전 텍스트
    completedText: string;    // 스캔 완료 텍스트
    disabled?: boolean;       // 버튼 비활성화 여부
  }