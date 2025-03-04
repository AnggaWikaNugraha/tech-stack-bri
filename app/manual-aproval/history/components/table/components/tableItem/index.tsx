import React, {FunctionComponent, HTMLAttributes, useMemo} from "react";

import {ManualHistoryApproval} from "@/types/manualAprovalHistory";
import {ManualHistoryApprovalCollectionParams} from "@/types/manualAprovalHistoryParams";

interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
	item: ManualHistoryApproval;
	params: ManualHistoryApprovalCollectionParams;
	index: number;
	onClickDetail: () => void;
}

const TableItem: FunctionComponent<TableItemProps> = ({
	item,
	params,
	index,
	onClickDetail,
}) => {
	const tableNumber = useMemo(() => {
		const numberOfTable: number = params?.page * 10 - 10;
		return numberOfTable;
	}, [params?.page]);

	const getStatusBadge = useMemo(() => {
		if (item?.status === "APPROVED") {
			return "success";
		} else {
			return "error";
		}
	}, [item?.status]);

	return (
		<div key={index} style={{ display: 'flex', justifyContent: 'space-between'}}>
			<div className="td-history-number">{tableNumber + (index + 1)}</div>
			<div className="td-history-date">
				{item?.createdAt}
			</div>
			<div className="td-history-customer-name">
				{item?.name ? item?.name : "-"}
			</div>
			<div className="td-history-nik">{item?.idNo ? item?.idNo : "-"}</div>
			<div className="td-history-status-approval">
				{item?.status ? (
					<div>{item?.status === "AUTO_REJECTED" ? "AUTO-REJECT" : item?.status}</div>
				) : (
					<span className="text-center">-</span>
				)}
			</div>
			<div className="td-history-reason">{item?.reason ? item?.reason : "-"}</div>
			<div className="td-history-action">
				<div
					id="show-detail-modal-btn"
					data-testid="show-detail-modal-btn"
					onClick={() => {
						onClickDetail();
					}}
					className="action-btn"
				>
					Detail
				</div>
			</div>
		</div>
	);
};

export default TableItem;
