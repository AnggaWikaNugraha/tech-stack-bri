"use client";

import { ManualHistoryApprovalCollectionParams } from '@/types/manualAprovalHistoryParams';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FunctionComponent, useCallback, useMemo, useState } from 'react'
import { useHistoryApproval } from './hooks/useHistoryTable';
import TableItem from './components/tableItem';
import { FilterAction } from '@/types/filterAction';
import Filter from '../filter';
import Pagination from '@/components/paginations';

const ManualHistoryTable: FunctionComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [params, setParams] = useState<ManualHistoryApprovalCollectionParams>({
    page: searchParams?.get("page") ? Number(searchParams?.get("page")) : 1,
    limit: searchParams?.get("limit") ? Number(searchParams?.get("limit")) : 10,
  });
  const [invalidValidation, setInvalidValidation] = useState<boolean>(false);
  const [action, setAction] = useState<FilterAction>("Filter");

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

  const submitFilter = (
    newParams: ManualHistoryApprovalCollectionParams,
    action: FilterAction,
  ) => {
    const updatedParams: ManualHistoryApprovalCollectionParams = {
      ...newParams,
      page: 1,
      limit: 10,
      startDate: newParams.startDate,
      endDate: newParams.endDate,
    };

    setAction(action);
    setInvalidValidation(false);
    setParams(updatedParams);
    updateQueryUrlParams(updatedParams);
  };

  const handlePagination = useCallback(
		(event: {selected: number}) => {
			const newParams: ManualHistoryApprovalCollectionParams = {
				...params,
				page: event.selected + 1,
			};

			setParams(newParams);
			updateQueryUrlParams(newParams);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[params],
	);

	const pageCount = useMemo(() => {
		const total = historyApproval.data?.data?.data?.recordsFiltered || 0;
		return Math.ceil(total / 10);
	}, [historyApproval.data?.data?.data?.recordsFiltered]);

	const handleForward = useCallback(() => {
		const newParams = {...params, page: pageCount};

		setParams(newParams);
		updateQueryUrlParams(newParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageCount, params]);

	const handleBackward = useCallback(() => {
		const newParams = {...params, page: 1};

		setParams(newParams);
		updateQueryUrlParams(newParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

  return (
    <>
      <Filter onSubmit={submitFilter} params={params} />
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

      <Pagination
						page={params?.page}
						pageCount={pageCount}
						onPageChange={handlePagination}
						forward={handleForward}
						backward={handleBackward}
					/>

    </>
  )
}

export default ManualHistoryTable