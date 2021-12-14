import 'app/layouts/components/css/hide-scroll.css'
import { Box, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { map, reduce, includes } from 'ramda'
import { Text as CText, Button, Collapse } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { useDisclosure } from '@chakra-ui/react'
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'

const LeftDetail = ({ beCode, allAttributesList, display }) => {
  const { isOpen, onToggle } = useDisclosure()

  const cardBg = useColorModeValue('gray.200', 'gray.600')

  const getPcmCode = display
  const testPcm = useSelector(selectCode(getPcmCode, 'allAttributes'))
  const mappedPcm = reduce((acc, { attributeCode, valueString }) => {
    acc = { ...acc, [attributeCode]: valueString }
    return acc
  }, {})(testPcm)

  const usedAttributes = Object.values(mappedPcm)

  console.log('testPcm---->', { testPcm, mappedPcm, getPcmCode })

  const getFilteredAttributes = (usedAttributesList, allAttributesList) => {
    return reduce((acc, attributeList) => {
      const { attributeCode } = attributeList
      acc = !includes(attributeCode)(usedAttributesList) ? acc.concat(attributeList) : acc
      return acc
    }, [])(allAttributesList || [])
  }

  const filteredAttributes = getFilteredAttributes(usedAttributes, allAttributesList)

  const { PRI_LOC1, PRI_LOC2, PRI_LOC3, PRI_LOC4 } = mappedPcm

  return (
    <Box bg={cardBg} borderRadius="2rem 2rem 0rem 0rem" h="100vh" minW="20vw" overflowY="scroll">
      <VStack align="start" spacing={8} alignItems="center" pt="10">
        <VStack spacing={5} bg="pink" p="4">
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={PRI_LOC1} />
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={PRI_LOC2} />
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={PRI_LOC3} />
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={PRI_LOC4} />
        </VStack>
        <Button onClick={onToggle}>Remaining attributes</Button>
        <Collapse in={isOpen} animateOpacity>
          <Box p="40px" color="white" mt="4" bg="teal.500" rounded="md" shadow="md">
            {map(({ attributeCode, attributeName }) => (
              <VStack key={attributeCode} w="60vw">
                <VStack w="100%" bg="gold" p="4">
                  <CText>{attributeName}</CText>
                  <Attribute code={beCode} attribute={attributeCode} />
                </VStack>
              </VStack>
            ))(filteredAttributes || [])}
          </Box>
        </Collapse>
      </VStack>
    </Box>
  )
}

export default LeftDetail
