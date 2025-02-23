import { ReactNode, useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./SideBarItem.module.css";

interface SideBarItemRoute {
  icon: ReactNode;
  label: string;
  path?: string;
  subItems?: SideBarSubItemRoute[];
}

interface SideBarSubItemRoute {
  label: string;
  path: string;
}

interface SideBarItemProps {
  routes: SideBarItemRoute;
}

export const SideBarItem = ({ routes }: SideBarItemProps) => {
  const navigate = useNavigate();

  const [isFolded, setIsFolded] = useState<boolean>(true);

  const isFoldable = useMemo(() => {
    return routes.subItems && routes.subItems.length > 0;
  }, [routes]);

  const toggleFold = useCallback(() => {
    setIsFolded((prev) => !prev);
  }, []);

  const handleClickMainButton = useCallback(() => {
    if (isFoldable) toggleFold();
    else navigate(routes.path!);
  }, [routes, isFoldable, navigate, toggleFold]);

  return (
    <div
      className={`${styles.container} ${!isFolded ? styles.folded : ""}`}
      style={{
        height:
          routes.subItems && !isFolded
            ? 56 + 24 * routes.subItems.length + 8
            : 56,
      }}
    >
      <button
        className={`${styles["main-button"]} font-b-md`}
        onClick={handleClickMainButton}
      >
        <div className={styles["icon-wrapper"]}>{routes.icon}</div>
        {routes.label}
      </button>
      {routes.subItems && (
        <div className={styles["sub-items"]}>
          {routes.subItems.map((subItem, i) => (
            <Link
              key={i}
              to={subItem.path}
              className={`${styles.link} font-r-sm`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
