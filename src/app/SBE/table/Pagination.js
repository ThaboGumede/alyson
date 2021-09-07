import { useCallback } from 'react'
import { Text, IconButton, HStack } from '@chakra-ui/react'
import getPaginationActions from 'app/SBE/utils/get-pagination-actions'
import { selectCode } from 'redux/db/selectors'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useHotkeys } from 'react-hotkeys-hook'

const TableFooter = ({ sbeCode }) => {
  const paginationActions = useCallback(() => getPaginationActions(sbeCode), [sbeCode])
  const pageSize = useSelector(selectCode(sbeCode, 'SCH_PAGE_SIZE'))
  const pageStart = useSelector(selectCode(sbeCode, 'SCH_PAGE_START'))
  const totalResults = useSelector(selectCode(sbeCode, 'PRI_TOTAL_RESULTS'))
  const pageNumber = useSelector(selectCode(sbeCode, 'PRI_INDEX'))

  const intitalItemIndex = pageSize.value * pageStart.value + 1
  const fintalItemIndex = intitalItemIndex + pageSize.value - 1

  useHotkeys('shift+left', paginationActions().previous)
  useHotkeys('shift+right', paginationActions().next)

  if (!(pageSize && totalResults && pageStart && pageNumber)) return null

  const hasNextPage = pageSize.value + pageStart.value < totalResults.value
  const hasPrevPage = pageNumber.value > 1
  const totalPages = Math.ceil(totalResults.value / pageSize.value)

  return totalPages > 1 ? (
    <HStack w="100%" justify="flex-end">
      <Text textStyle="body.2">{`${intitalItemIndex} - ${fintalItemIndex} of ${totalResults.value}`}</Text>
      <IconButton
        onClick={paginationActions().previous}
        isDisabled={!hasPrevPage}
        icon={<FontAwesomeIcon icon={faChevronLeft} />}
        size="sm"
        variant="ghost"
      />
      <IconButton
        onClick={paginationActions().next}
        isDisabled={!hasNextPage}
        icon={<FontAwesomeIcon icon={faChevronRight} />}
        size="sm"
        variant="ghost"
      />
    </HStack>
  ) : null
}

export default TableFooter
