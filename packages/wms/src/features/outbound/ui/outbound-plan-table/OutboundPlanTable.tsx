import { BaseTable } from "@/shared";
import {
  ColumnFiltersState,
  createColumnHelper,
  FilterFn,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import { OutboundPlanDrawer } from "../outbound-plan-drawer";
import {
  OutboundPlanResponseDto,
  useOutboundPlans,
  useOutboundTable,
} from "../../model";

interface OutboundPlanTableProps {
  columnFilters: ColumnFiltersState;
  setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
  isServerSide: boolean;
}

const columnHelper = createColumnHelper<OutboundPlanResponseDto>();

const dateFilterFn: FilterFn<OutboundPlanResponseDto> = (
  row,
  columnId,
  filterValue: string
) => {
  const [startDate, endDate] = filterValue.split(",");

  const date = Date.parse(row.getValue(columnId));

  if (startDate.length > 0 && endDate.length > 0)
    return date >= Date.parse(startDate) && date <= Date.parse(endDate);
  else if (startDate.length > 0) return date >= Date.parse(startDate);
  else if (endDate.length > 0) return date <= Date.parse(endDate);

  return true;
};

const defaultColumns = [
  columnHelper.accessor("outboundScheduleNumber", {
    header: "출고예정번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("outboundScheduleDate", {
    header: "출고예정날짜",
    cell: (row) => row.getValue(),
    filterFn: dateFilterFn,
  }),
  columnHelper.accessor("process", {
    header: "진헹상태",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("productionPlanNumber", {
    header: "주문번호",
    cell: (row) => row.getValue(),
  }),
  columnHelper.accessor("planDate", {
    header: "주문날짜",
    cell: (row) => row.getValue(),
  }),
];

export const OutboundPlanTable = ({
  columnFilters,
  setColumnFilters,
  isServerSide,
}: OutboundPlanTableProps) => {
  const {
    pagination,
    setPagination,
    sorting,
    setSorting,
    rowSelection,
    setRowSelection,
    data,
  } = useOutboundTable({
    columnFilters,
    isServerSide,
    outboundNumberKey: "outboundPlanNumber",
    outboundDateKey: "outboundPlanDate",
    useData: useOutboundPlans,
  });

  const selectedId = useMemo(() => {
    return (
      Object.keys(rowSelection).length > 0 &&
      parseInt(Object.keys(rowSelection)[0])
    );
  }, [rowSelection]);

  return (
    <>
      <BaseTable
        serverSide={isServerSide}
        data={data}
        columns={defaultColumns}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      {(selectedId || selectedId === 0) && (
        <OutboundPlanDrawer
          data={data.data[selectedId]}
          onClose={() => setRowSelection({})}
        />
      )}
    </>
  );
};
