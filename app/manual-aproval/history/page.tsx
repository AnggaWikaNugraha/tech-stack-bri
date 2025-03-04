'use client'

import React, { useEffect } from 'react'
import HistoryManualApprovalTable from '@/app/manual-aproval/history/components/table'

import('../../../mocks/browser').then(({ worker }) => {
  worker.start();
});

const ManualHistory = () => {

  return (
    <HistoryManualApprovalTable />
  )
}

export default ManualHistory