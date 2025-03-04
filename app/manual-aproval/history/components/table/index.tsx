"use client";

import { ManualHistoryApprovalCollectionParams } from '@/types/manualAprovalHistoryParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { useHistoryApproval } from './hooks/useHistoryTable';
import TableItem from './components/tableItem';

const ManualHistoryTable = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<ManualHistoryApprovalCollectionParams>({
    page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
    limit: searchParams?.get("limit") ? Number(searchParams?.get("limit")) : 10,
  });
  const [invalidValidation, setInvalidValidation] = useState<boolean>(false);

  const updateQueryUrlParams = useCallback(
    (params: ManualHistoryApprovalCollectionParams) => {
      for (const key in params) {
        if (
          params[key as keyof ManualHistoryApprovalCollectionParams] === "" &&
          key !== "nama" &&
          key !== "nik"
        ) {
          delete params[key as keyof ManualHistoryApprovalCollectionParams];
        }
      }

      const queryString = Object.keys(params)
        .map((key) => key + "=" + (params as any)[key])
        .join("&");

      const url = `${pathname}?${queryString}`;

      router.push(url);
    },
    [pathname, router],
  );

  const historyApproval = useHistoryApproval({
    params,
    config: {
      onSuccess: (response, key) => {
        updateQueryUrlParams(params);
      },
      onError: (response, key) => {
        if (
          response?.response?.data?.data?.nama?.[0] ===
          "The nama is only filled by space" ||
          response?.response?.data?.data?.nik?.[0] ===
          "The nik field must be numeric"
        ) {
          setInvalidValidation(true);
        }
      },
      shouldRetryOnError: false,
    },
  });

  return (
    <>
      <div>Table</div>
      <div>
        {historyApproval.data?.data?.data?.data?.length !== 0 ? (
          historyApproval.data?.data?.data?.data?.map(
            (item, index) => (
              <TableItem
                key={index}
                item={item}
                params={params}
                index={index}
                onClickDetail={() => {
                  // selectedItemDispatch({
                  // 	type: SelectedItemActionType.SET_SELECTED_HISTORY_APPROVAL,
                  // 	payload: item.id,
                  // });
                  // modalDispatch({
                  // 	type: ModalActionType.SET_IS_SHOW_DETAIL_MODAL,
                  // 	payload: true,
                  // });
                }}
              />
            ),
          )
        ) : (
          <div>
            <div className="!text-center">
              Tidak Ada Data
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ManualHistoryTable