import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  onRetry: () => void;
}

export const ErrorFallback = ({ onRetry }: ErrorFallbackProps) => {
  return (
    <div className={styles.container}>
      <p className="font-h4">데이터를 불러오는 데 실패했습니다</p>
      <button className="shadow-md" onClick={onRetry}>
        재시도
      </button>
    </div>
  );
};
