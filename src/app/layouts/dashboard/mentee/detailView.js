import { Box, Button, Flex, Grid, useColorModeValue, useToast } from '@chakra-ui/react'
import {
  personalDetails,
  preference,
  professionalDetails,
} from 'app/layouts/dashboard/timeline/templates/CardContent'

import DetailCards from 'app/layouts/components/detail_card'
import DetailHeader from 'app/layouts/components/detail_header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { onSendMessage } from 'vertx'

const DetailView = ({ setShowDetailView, currentMentor }) => {
  const bg = useColorModeValue('gray.100', 'gray.700')
  const toast = useToast()
  const sendToast = () =>
    toast({
      title: 'Invitation Sent!',
      description: 'We will notify you once the Mentor has accepted your invitation.',
      status: 'success',
      duration: 9000,
      isClosable: true,
      position: 'top-right',
    })
  return (
    <Flex
      w="50vw"
      bg={bg}
      h="85vh"
      spacing={4}
      p="3"
      overflowY="scroll"
      position="sticky"
      top="10vh"
      flexDirection="column"
      // justifyContent="space-around"
      alignItems="center"
    >
      <Box mb={4} w="95%">
        <Button
          onClick={() => setShowDetailView(false)}
          colorScheme="blue"
          variant="solid"
          leftIcon={<FontAwesomeIcon icon={faLongArrowAltLeft} />}
          test-id={`BACK_TO_MENTOR_SELECTION`}
        >{`Mentor Selection`}</Button>
      </Box>

      <DetailHeader beCode={currentMentor} />

      <Grid
        width={'95%'}
        templateColumns={'repeat(auto-fit, minmax(260px, 1fr))'}
        gap={'1rem'}
        mb={'1rem'}
      >
        <DetailCards detailsection={personalDetails} currentMentor={currentMentor} miniCard />
        <DetailCards detailsection={professionalDetails} currentMentor={currentMentor} miniCard />
      </Grid>
      <Box width="95%" mb={'1rem'}>
        <DetailCards detailsection={preference} currentMentor={currentMentor} />
      </Box>

      <Box w="95%">
        <Button
          w="full"
          colorScheme="blue"
          onClick={() => {
            onSendMessage({ code: 'ACT_INVITE_MENTOR', targetCode: currentMentor })
            setShowDetailView(false)
            sendToast()
          }}
          test-id={`ACT_INVITE_MENTOR`}
        >{`Invite`}</Button>
      </Box>
    </Flex>
  )
}
export default DetailView
