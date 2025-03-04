import { RejectReasonStatus } from "./rejectReasonStatus";

export type ManualHistoryApproval = {
	id: string;
	name: string;
	idNo: string;
	status: RejectReasonStatus;
	reason: string;
	createdAt: string;
	updatedAt: string;
};