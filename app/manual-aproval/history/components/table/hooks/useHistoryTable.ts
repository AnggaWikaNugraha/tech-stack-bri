import { AxiosError, AxiosResponse } from "axios";
import useSWR, { SWRConfiguration } from "swr";

import axiosInstance from "@/config/client";
import { ApiResponse } from "@/types/apiResponse";
import { ManualHistoryApprovalCollectionParams } from "@/types/ManualAprovalHistoryParams";
import { ManualHistoryApprovalCollectionResponse } from "@/types/manualAprovalHistoryResponse";

export interface ManualHistoryApprovalErrorResponse extends ApiResponse { }

export interface HistoryApprovalHookProps {
    params?: ManualHistoryApprovalCollectionParams;
    config?: SWRConfiguration<
        AxiosResponse<ManualHistoryApprovalCollectionResponse>,
        AxiosError<ManualHistoryApprovalErrorResponse>
    >;
}

const fetcher = async (arg: { url: string; params: ManualHistoryApprovalCollectionParams; }) => {
    return await axiosInstance.get<ManualHistoryApprovalCollectionResponse>(arg.url, { params: arg.params });
};

export const useHistoryApproval = (props: HistoryApprovalHookProps) => {
	const {params, config} = props;
	return useSWR({url: "/api/manual-approval/history", params}, fetcher, config);
};