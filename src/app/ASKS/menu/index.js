import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import { Menu, MenuButton, MenuList, VStack, HStack, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import ChildMenuItem from './ChildMenuItem'

const AsksMenu = ({ questionCode }) => {
  const data = useSelector(selectCode(questionCode))

  if (!data?.length) return null

  return (
    <Menu>
      <MenuButton opacity={0.8} _hover={{ opacity: 1 }} test-id={questionCode}>
        <VStack color="grey" test-id={questionCode}>
          {/* <FontAwesomeIcon size="lg" icon={icons[questionCode]} /> */}
          <HStack spacing={1}>
            <Text fontSize="xs">{questionCode}</Text>
            <FontAwesomeIcon icon={faCaretDown} />
          </HStack>
        </VStack>
      </MenuButton>
      <MenuList>
        {data.map(childAsk => (
          <ChildMenuItem childCode={childAsk} questionCode={questionCode} rootCode={questionCode} />
        ))}
      </MenuList>
    </Menu>
  )
}

export default AsksMenu
