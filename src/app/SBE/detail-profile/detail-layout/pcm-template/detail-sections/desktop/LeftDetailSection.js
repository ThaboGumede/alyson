import 'app/layouts/components/css/hide-scroll.css'
import { Box, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { map, reduce, includes } from 'ramda'
import { Text as CText } from '@chakra-ui/react'
import ImageType from 'app/DTT/upload/Image'
import Social from 'app/DTT/social'
import Text from 'app/DTT/text'
import Video from 'app/DTT/video'

const LeftDetail = ({ beCode, allAttributesList }) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  const mapped = {
    positionOne: 'PRI_IMAGE_URL',
    positionTwo: 'PRI_NAME',
    positionThree: 'PRI_LINKEDIN_URL',
    positionFour: 'PRI_EMAIL',
    positionFive: 'PRI_MOBILE',
  }

  // console.log('%c allAttributesList----->', 'color: gold; font-size: 20px', {
  //   allAttributesList,
  //   positionFromAttribute,
  // })

  const usedAttributes = Object.values(mapped)

  const getFilteredAttributes = (usedAttributesList, allAttributesList) => {
    console.log('allAttributesList', { allAttributesList, usedAttributes })
    return reduce((acc, attributeList) => {
      const { attributeCode } = attributeList
      acc = !includes(attributeCode)(usedAttributesList) ? acc.concat(attributeList) : acc
      return acc
    }, [])(allAttributesList || [])
  }

  const filteredAttributes = getFilteredAttributes(usedAttributes, allAttributesList)

  // console.log('%c allAttributesList----->', 'color: gold; font-size: 20px', {
  //   usedAttributes,
  //   filteredAttributes,
  // })

  const { positionOne, positionTwo, positionThree, positionFour, positionFive } = mapped

  return (
    <Box bg={cardBg} borderRadius="2rem 2rem 0rem 0rem" h="100vh" minW="20vw" overflowY="scroll">
      <VStack align="start" spacing={8} alignItems="center" pt="10">
        <VStack spacing={5} bg="pink" p="4">
          <ImageType.Read />
          <Social.Read />
          <Text.Read />
          <Video.Read />
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={positionOne} />
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={positionTwo} />
          <Attribute config={{ color: '#3182CE' }} code={beCode} attribute={positionThree} />
          <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={positionFour} />
          <Attribute config={{ color: '#3182CE' }} code={beCode} attribute={positionFive} />
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
