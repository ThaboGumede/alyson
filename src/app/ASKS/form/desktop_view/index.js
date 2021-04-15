import Ask from 'app/ASKS/ask'
import { VStack, Center, Heading, useColorModeValue, Text, Divider } from '@chakra-ui/react'

const FormDesktopView = ({ title, childAsks, onFinish, questionCode, shadow, config = {} }) => {
  const bgColor = useColorModeValue('white', 'whiteAlpha.100')

  const { subHeader, divider = {} } = config

  return (
    <Center
      bgColor={bgColor}
      borderRadius="md"
      shadow={shadow ? 'base' : ''}
      mr={shadow ? '10vw' : ''}
      ml={shadow ? '10vw' : ''}
      pt="1rem"
    >
      <VStack p="3" spacing={8} marginBottom={8}>
        <Heading>{title}</Heading>
        {config ? <Text textStyle="head2">{subHeader}</Text> : null}
        {childAsks.map((childAsk, idx) => (
          <>
            {divider.hasOwnProperty(idx) && (
              <VStack align="start" w="full">
                <Text textStyle="body3">{divider[idx].label}</Text>
                <Divider />
              </VStack>
            )}

            <Ask
              onFinish={onFinish}
              key={childAsk}
              parentCode={questionCode}
              questionCode={childAsk}
            />
          </>
        ))}
      </VStack>
    </Center>
  )
}

export default FormDesktopView
