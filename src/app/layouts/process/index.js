import { useSelector } from 'react-redux'
import { selectProcess } from 'redux/app/selectors'
import Lane from 'app/SBE/lane'
import { Stack, VStack, HStack } from '@chakra-ui/react'
import Search from 'app/SBE/search/Search'

const Process = ({ dashboard }) => {
  const processCodes = useSelector(selectProcess, (prev, next) => prev.length === next.length)

  if (!processCodes) return null
  return (
    <VStack align="start" spacing={0} px="5">
      {!dashboard && (
        <HStack mb="5">
          <Search
            placeholder={'Search all attributes'}
            process={processCodes[0]}
            sbeCode={JSON.stringify(processCodes)}
          />
        </HStack>
      )}

      <Stack direction={'row'} spacing={5}>
        {processCodes.map(sbeCode => (
          <Lane key={sbeCode} sbeCode={sbeCode} dashboard={dashboard} />
        ))}
      </Stack>
    </VStack>
  )
}

export default Process
