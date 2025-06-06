import { ProjectId } from '@l2beat/shared-pure'
import { UNVERIFIED_DA_CLASSNAME } from '~/pages/data-availability/summary/components/table/DaSummaryPublicTable'
import type { CommonProjectEntry } from '~/server/features/utils/getCommonProjectEntry'
import type { BasicTableProps } from '../BasicTable'

export type RowType = ReturnType<typeof getRowType>
export function getRowType(
  entry: CommonProjectEntry,
  rowColoringMode: BasicTableProps<CommonProjectEntry>['rowColoringMode'],
) {
  if (entry.id === ProjectId.ETHEREUM) {
    return 'ethereum'
  }
  if (rowColoringMode === 'ignore-colors') {
    return undefined
  }

  if (!!entry.statuses?.verificationWarning || !!entry.statuses?.redWarning) {
    return 'unverified'
  }
  if (entry.statuses?.underReview) {
    return 'underReview'
  }
}

/*
  NOTICE: It is important that this functions return the same colors
*/
export function getRowClassNames(rowType: RowType) {
  switch (rowType) {
    case 'ethereum':
      return 'bg-blue-500/35 dark:bg-blue-700/25'
    case 'unverified':
      return UNVERIFIED_DA_CLASSNAME
    case 'underReview':
      return 'bg-yellow-200/10'
    default:
      return undefined
  }
}

export function getRowClassNamesWithoutOpacity(rowType: RowType | null) {
  switch (rowType) {
    case 'ethereum':
      return 'bg-blue-400 dark:bg-blue-900'
    case 'unverified':
      return 'bg-[#FEE4E4] dark:bg-[#371315]'
    case 'underReview':
      return 'bg-[#faf5e6] dark:bg-[#2F2A1D]'
    default:
      return 'bg-surface-primary'
  }
}
