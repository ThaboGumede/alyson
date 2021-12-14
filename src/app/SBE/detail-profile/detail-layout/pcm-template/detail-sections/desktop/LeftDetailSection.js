import 'app/layouts/components/css/hide-scroll.css'
import { Box, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { map, reduce, includes } from 'ramda'
import { Text as CText } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const LeftDetail = ({ beCode, allAttributesList }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  const mapped = {
    positionOne: 'PRI_IMAGE_URL',
    positionTwo: 'PRI_NAME',
    positionThree: 'PRI_LINKEDIN_URL',
    positionFour: 'PRI_EMAIL',
    positionFive: 'PRI_MOBILE',
  }

  const usedAttributes = Object.values(mapped)

  const testPcm = useSelector(selectCode('PCM_TEST1', 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(testPcm)

  console.log('testPcm---->', { testPcm, mappedPcm })

  const getFilteredAttributes = (usedAttributesList, allAttributesList) => {
    return reduce((acc, attributeList) => {
      const { attributeCode } = attributeList
      acc = !includes(attributeCode)(usedAttributesList) ? acc.concat(attributeList) : acc
      return acc
    }, [])(allAttributesList || [])
  }

  const filteredAttributes = getFilteredAttributes(usedAttributes, allAttributesList)

  const { positionOne, positionTwo, positionThree, positionFour, positionFive } = mapped
  const { PRI_LOC1, PRI_LOC2, PRI_LOC3 } = mappedPcm

  return (
    <Box bg={cardBg} borderRadius="2rem 2rem 0rem 0rem" h="100vh" minW="20vw" overflowY="scroll">
      <VStack align="start" spacing={8} alignItems="center" pt="10">
        <VStack spacing={5} bg="pink" p="4">
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={PRI_LOC1} />
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={PRI_LOC2} />
        </VStack>
        {map(({ attributeCode, attributeName }) => (
          <VStack key={attributeCode} w="60vw">
            <VStack w="100%" bg="gold" p="4">
              <CText>{attributeName}</CText>
              <Attribute code={beCode} attribute={attributeCode} />
            </VStack>
          </VStack>
        ))(filteredAttributes || [])}
      </VStack>
    </Box>
  )
}

export default LeftDetail
