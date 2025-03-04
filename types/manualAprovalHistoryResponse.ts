import { ApiResponse } from "./apiResponse";
import { ManualHistoryApproval } from "./manualAprovalHistory";
import { PaginationResponse } from "./paginationResponse";

export type ManualHistoryApprovalCollectionResponse = ApiResponse<PaginationResponse<ManualHistoryApproval[]>>;