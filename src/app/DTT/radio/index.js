import { Radio as CRadio, RadioGroup, Stack } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Read } from 'app/DTT/text'
import { map, compose, includes } from 'ramda'
import safelyParseJson from 'utils/helpers/safely-parse-json'

const Write = ({ questionCode, data, onSendAnswer, groupCode, parentCode }) => {
  const radioData = useSelector(selectCode(`${parentCode}-${questionCode}-options`)) || []
  const options = compose(map(({ code, name }) => ({ label: name, value: code })))(radioData)

  // This checks if it is an Stringified Array
  const arrayValue = includes('[', data?.value || '') ? safelyParseJson(data?.value, []) : []
  const value = arrayValue.length ? arrayValue[0] : data?.value || null

  return (
    <RadioGroup test-id={questionCode} value={value} onChange={value => onSendAnswer([value])}>
      <Stack test-id={groupCode} direction="row">
        {options &&
          options.map(
            option =>
              option && (
                <CRadio key={option.code} test-id={option.code} value={option.code}>
                  {option.name}
                </CRadio>
              ),
          )}
      </Stack>
    </RadioGroup>
  )
}

const Radio = {
  Write,
  Read,
}

export default Radio
