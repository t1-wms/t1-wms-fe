import ErrorImg from "@assets/error.svg?react";
import styles from "./ErrorFallbackPage.module.css";

export const ErrorFallbackPage = () => {
  return (
    <div className={styles.container}>
      <ErrorImg />
      <h1 className="font-h1">예상치 못한 오류가 발생했습니다</h1>
      <div>
        <p className="font-r-md">
          이용에 불편을 드려 죄송합니다. 새로고침을 하면 문제가 해결될 수
          있습니다
        </p>
        <p className="font-r-md">문제가 계속된다면 관리자에게 문의해주세요</p>
      </div>

      <button
        className="font-b-md shadow-md"
        onClick={() => {
          window.location.reload();
        }}
      >
        새로고침
      </button>
    </div>
  );
};
