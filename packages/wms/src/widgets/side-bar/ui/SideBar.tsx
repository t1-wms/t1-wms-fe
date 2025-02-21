import { useUserStore } from "@/features";
import InventoryIcon from "@assets/box.svg?react";
import DashboardIcon from "@assets/graph.svg?react";
import InboundIcon from "@assets/inbound.svg?react";
import OutboundIcon from "@assets/outbound.svg?react";
import ToolIcon from "@assets/tool.svg?react";
import UserSearchIcon from "@assets/user-search.svg?react";
import styles from "./SideBar.module.css";
import { SideBarItem } from "./SideBarItem";
import { SideBarItemSkeleton } from "./SideBarItemSkeleton";

export const SideBar = () => {
  const { user } = useUserStore();

  const userRole = user?.userRole;

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} shadow-md`}>
        {!userRole ? (
          <>
            <SideBarItemSkeleton />
            <SideBarItemSkeleton />
            <SideBarItemSkeleton />
            <SideBarItemSkeleton />
            <SideBarItemSkeleton />
            <SideBarItemSkeleton />
          </>
        ) : userRole === "관리자" ? (
          <>
            <SideBarItem
              routes={{
                label: "대시보드",
                icon: <DashboardIcon />,
                path: "/dashboard",
              }}
            />
            <SideBarItem
              routes={{
                label: "사용자 관리",
                icon: <UserSearchIcon />,
                path: "/user",
              }}
            />
            <SideBarItem
              routes={{
                label: "마스터",
                icon: <ToolIcon />,
                subItems: [
                  { label: "품목별 적치 조회", path: "/master/location" },
                  { label: "납품업체 조회", path: "/master/supplier" },
                ],
              }}
            />
            <SideBarItem
              routes={{
                label: "입고",
                icon: <InboundIcon />,
                subItems: [
                  { label: "발주", path: "/order" },
                  { label: "입하 예정", path: "/inbound/schedule" },
                  { label: "입하 검사", path: "/inbound/check" },
                  { label: "입고 적치", path: "/inbound/put-away" },
                ],
              }}
            />
            <SideBarItem
              routes={{
                label: "출고",
                icon: <OutboundIcon />,
                subItems: [
                  { label: "출고 예정", path: "/outbound/plan" },
                  { label: "출고 지시", path: "/outbound/assign" },
                  { label: "출고 피킹", path: "/outbound/picking" },
                  { label: "출고 패킹", path: "/outbound/packing" },
                  { label: "출하 상차", path: "/outbound/loading" },
                ],
              }}
            />
            <SideBarItem
              routes={{
                label: "재고 관리",
                icon: <InventoryIcon />,
                subItems: [
                  { label: "품목별 재고조회", path: "/inventory/product" },
                  { label: "BIN별 재고조회", path: "/inventory/bin" },
                  { label: "안전 재고 설정", path: "/inventory/threshold" },
                ],
              }}
            />
          </>
        ) : userRole === "공급업체" ? (
          <SideBarItem
            routes={{
              label: "입고",
              icon: <InboundIcon />,
              subItems: [{ label: "발주 요청", path: "/received-order" }],
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
