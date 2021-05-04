import { Box, HStack, Input, Text, useClipboard, useToast } from '@chakra-ui/react'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import HeroIconButton from 'app/layouts/components/hero_icon_button'
import { useMobileValue } from 'utils/hooks'
import Duplicates from './Duplicates'

const Write = ({ questionCode, data, onSendAnswer }) => {
  return (
    <Box>
      <Input
        test-id={questionCode}
        defaultValue={data?.value}
        type="email"
        onBlur={e => onSendAnswer(e.target.value)}
        w={useMobileValue(['100%', '25vw'])}
      />
      <Duplicates sourceCode={data.baseEntityCode} />
    </Box>
  )
}

const Read = ({ data }) => {
  const { onCopy } = useClipboard(data.value)
  const toast = useToast()

  if (!data?.value) return null

  const onClick = () => {
    onCopy()
    toast({
      title: `${data?.value} copied!`,
      status: 'success',
      duration: 1000,
    })
  }
  return (
    <HStack spacing="2">
      <HeroIconButton onClick={onClick} icon={<FontAwesomeIcon size="sm" icon={faEnvelope} />} />
      <Text w="16rem">{data?.value}</Text>
    </HStack>
  )
}

const Email = {
  Write,
  Read,
}

export default Email
