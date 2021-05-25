import { HStack, Text, VStack } from '@chakra-ui/layout'
import Attribute from 'app/BE/attribute'
import Button from 'app/layouts/components/button'
import Card from 'app/layouts/components/card'
import Process from 'app/layouts/process'
import { find, head, includes, replace } from 'ramda'
import { useSelector } from 'react-redux'
import { selectCode, selectKeys } from 'redux/db/selectors'
import { onSendMessage } from 'vertx'

const Progress = () => {
  const keys = useSelector(selectKeys)
  const progressSbe = replace(
    '@rows',
    '',
    find(includes('SBE_INPROGRESS_APPLICATIONS_'), keys) || '',
  )
  const appBe = head(useSelector(selectCode(progressSbe, 'rows')) || [])

  if (!appBe) return <Process dashboard />

  const onLogbook = () =>
    onSendMessage({
      parentCode: progressSbe,
      targetCode: appBe,
      code: 'ACT_PRI_EVENT_JOURNAL_VIEW',
    })

  return (
    <Card>
      <VStack>
        <Text textStyle="head.3">In Progress Internship</Text>
        <HStack>
          <Text textStyle="body.1">
            <Attribute code={appBe} attribute="PRI_TITLE" />
          </Text>
          <Text>at</Text>
          <Text textStyle="body.1">
            <Attribute code={appBe} attribute="PRI_ASSOC_HC" />
          </Text>
        </HStack>

        <HStack spacing="1">
          <Text textStyle="body.3">Until</Text>
          <Text>
            <Attribute config={{ textStyle: 'body.3' }} code={appBe} attribute="PRI_END_DATE" />
          </Text>
        </HStack>

        <Card variant="card1">
          <VStack>
            <Button size="lg" variant="special" onClick={onLogbook}>
              Go to Your Logbook
            </Button>
            <Attribute code={appBe} attribute="PRI_PROGRESS" />
          </VStack>
        </Card>
      </VStack>
    </Card>
  )
}

export default Progress
