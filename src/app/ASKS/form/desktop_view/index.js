import { Center, Text, VStack } from '@chakra-ui/react'
import Header from '../template/Header'
import Body from '../template/Body'
import Ask from 'app/ASKS/ask'
import Card from 'app/layouts/components/card'

const FormDesktopView = ({ title, onFinish, questionCode, childAsks, config }) => {
  if (!config?.groups)
    return (
      <Center>
        <Card mx="25vw" w="full">
          <VStack align="start" spacing={8}>
            <Text textStyle="head.2">{title}</Text>
            {config?.subHeader && <Text textStyle="body.3">{config.subHeader}</Text>}
            {childAsks.map(code => (
              <Ask questionCode={code} parentCode={questionCode} key={code} />
            ))}
          </VStack>
        </Card>
      </Center>
    )

  const { subHeader, groups } = config

  if (!groups) return null
  return (
    <VStack mx="20vw" spacing="4">
      <Header title={title} subHeader={subHeader} config={config} />
      <Body groups={groups} onFinish={onFinish} questionCode={questionCode} />
    </VStack>
  )
}
export default FormDesktopView
