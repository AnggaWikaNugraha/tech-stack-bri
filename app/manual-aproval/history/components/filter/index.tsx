import Input from '@/components/Input'
import { FilterAction } from '@/types/filterAction';
import { ManualHistoryApprovalCollectionParams } from '@/types/manualAprovalHistoryParams';
import React, { FunctionComponent, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

type InputSearch = {
  searchBy: string;
  search: string;
};

interface FilterProps {
  params: ManualHistoryApprovalCollectionParams;
  onSubmit: (
    newParams: ManualHistoryApprovalCollectionParams,
    action: FilterAction,
  ) => void;
}

const Filter: FunctionComponent<FilterProps> = ({ params, onSubmit }) => {

  const searchByValue = useMemo(() => {
    if (Object.keys(params).includes("nama")) {
      return "nama";
    }
    if (Object.keys(params).includes("nik")) {
      return "nik";
    }
    return "";
  }, [params]);

  const searchValue = useMemo(() => {
    if (params?.nama) {
      return params.nama;
    }
    if (params?.nik) {
      return params.nik;
    }
    return "";
  }, [params?.nama, params?.nik]);

  const { control, handleSubmit, setValue, watch } = useForm<InputSearch>({
    defaultValues: { searchBy: 'nama', search: searchValue },
  });

  const onSubmitSearch = (formData: InputSearch, action: FilterAction) => {
    let newParams: ManualHistoryApprovalCollectionParams = {
      ...params,
    };

    delete newParams?.nama;
    delete newParams?.nik;

    switch (formData.searchBy) {
      case "nama":
        newParams = {
          ...newParams,
          nama: formData.search,
        };
        break;
      case "nik":
        newParams = {
          ...newParams,
          nik: formData.search,
        };
        break;
      default:
        break;
    }

    onSubmit(newParams, action);
  };

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        console.log("formData", formData)
        onSubmitSearch(formData, "Search")
      })}
    >
      <Controller
        control={control}
        name="search"
        render={({ field }) => (

          <Input
            className="w-[25.875rem] pl-10"
            placeholder="Cari Data"
            {...field}
          />

        )}
      />
    </form>
  )
}

export default Filter