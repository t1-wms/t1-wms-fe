import { useNavigate } from "react-router";
import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  onRetry?: () => void;
}

export const ErrorFallback = ({ onRetry }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className="font-r-md">데이터를 불러오는 데 실패했습니다</p>
      <button
        className="shadow-md font-b-md"
        onClick={
          onRetry
            ? onRetry
            : () => {
                navigate(0);
              }
        }
      >
        재시도
      </button>
    </div>
  );
};
