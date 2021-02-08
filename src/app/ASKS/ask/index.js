import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import createSendAnswer from 'app/ASKS/utils/create-send-answer'
import { FormControl, FormLabel } from '@chakra-ui/react'
import getGroupCode from 'app/ASKS/utils/get-group-code'

import Text from 'app/DTT/text'
import Button from 'app/DTT/button'
import Radio from 'app/DTT/radio'
import Select from 'app/DTT/select'
import Social from 'app/DTT/social'

const Ask = ({ parentCode, questionCode }) => {
  const askData = useSelector(selectCode(parentCode, questionCode))

  const { attributeCode, targetCode, name, question } = askData

  const data = useSelector(selectCode(targetCode, attributeCode)) || {}

  const groupCode = getGroupCode(question)

  const {
    mandatory,
    attribute: {
      description,
      dataType: { component },
    },
  } = question

  const onSendAnswer = createSendAnswer(askData)

  return component === 'button' ? (
    <Button askData={askData} />
  ) : (
    <FormControl isRequired={mandatory}>
      <FormLabel>{name}</FormLabel>
      {component === 'dropdown' ? (
        <Select.Write
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          placeholder={description}
          mandatory={mandatory}
        />
      ) : component === 'radio' ? (
        <Radio.Write
          groupCode={groupCode}
          attributeCode={attributeCode}
          onSendAnswer={onSendAnswer}
          data={data}
          mandatory={mandatory}
        />
      ) : component === 'text' ? (
        <Text.Write mandatory={mandatory} data={data} onSendAnswer={onSendAnswer} />
      ) : component === 'social' ? (
        <Social.Write mandatory={mandatory} data={data} onSendAnswer={onSendAnswer} />
      ) : (
        <div>{component}</div>
      )}
    </FormControl>
  )
}

export default Ask
