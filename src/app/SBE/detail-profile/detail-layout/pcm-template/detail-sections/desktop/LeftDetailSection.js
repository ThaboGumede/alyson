import 'app/layouts/components/css/hide-scroll.css'
import { Box, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { map } from 'ramda'
import { HStack, Text } from '@chakra-ui/react'

const LeftDetail = ({
  beCode,
  positionFromAttribute,
  allAttributesList,
  positionOne = 'PRI_IMAGE_URL',
  positionTwo = 'PRI_NAME',
  positionThree = 'PRI_LINKEDIN_URL',
  positionFour = 'PRI_EMAIL',
  positionFive = 'PRI_MOBILE',
}) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  console.log('%c allAttributesList----->', 'color: gold; font-size: 20px', {
    allAttributesList,
    positionFromAttribute,
  })

  return (
    <Box bg={cardBg} borderRadius="2rem 2rem 0rem 0rem" h="100vh" minW="20vw" overflowY="scroll">
      <VStack align="start" spacing={8} alignItems="center" pt="10">
        {map(({ attributeCode }) => (
          <VStack key={attributeCode}>
            <HStack>
              <Text>{`${attributeCode}---------->`}</Text>
              <Attribute code={beCode} attribute={attributeCode} />
            </HStack>
          </VStack>
        ))(allAttributesList)}
      </VStack>
    </Box>
  )
}

export default LeftDetail
