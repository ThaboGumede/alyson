import 'app/layouts/components/css/hide-scroll.css'
import { Box, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import { useColorModeValue } from '@chakra-ui/color-mode'

const LeftDetail = ({
  beCode,
  positionOne = 'PRI_IMAGE_URL',
  positionTwo = 'PRI_NAME',
  positionThree = 'PRI_LINKEDIN_URL',
  positionFour = 'PRI_EMAIL',
  positionFive = 'PRI_MOBILE',
}) => {
  const cardBg = useColorModeValue('gray.200', 'gray.600')

  return (
    <Box
      bg={cardBg}
      borderRadius="2rem 2rem 0rem 0rem"
      h="100vh"
      position="sticky"
      top="0rem"
      minW="20vw"
    >
      <VStack align="start" spacing={8} alignItems="center" pt="10">
        <Attribute code={beCode} config={{ h: '15rem', w: '15rem' }} attribute={positionOne} />
        <VStack align="start" spacing={4}>
          <VStack spacing={5}>
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={positionTwo} />
            <Attribute config={{ color: '#3182CE' }} code={beCode} attribute={positionThree} />
            <Attribute config={{ textStyle: 'head.1' }} code={beCode} attribute={positionFour} />
            <Attribute config={{ color: '#3182CE' }} code={beCode} attribute={positionFive} />
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
}

export default LeftDetail
