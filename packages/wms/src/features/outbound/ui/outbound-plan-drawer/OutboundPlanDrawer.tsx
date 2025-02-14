import { BaseDrawer, PageResponse } from "@/shared";
import { OutboundPlanResponseDto } from "../../model";
import { OutboundProductTable } from "@/features";

interface OutboundPlanDrawerProps {
  data: PageResponse<OutboundPlanResponseDto>;
  selectedId: number;
  onClose: () => void;
}

export const OutboundPlanDrawer = ({
  data,
  selectedId,
  onClose,
}: OutboundPlanDrawerProps) => {
  return (
    <BaseDrawer
      title={`${data.data[selectedId].outboundScheduleNumber} 출고예정품목`}
      onClose={onClose}
    >
      <OutboundProductTable data={data.data[selectedId].productList} />
    </BaseDrawer>
  );
};
