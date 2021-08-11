import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'
import useApi from 'api'
import { Menu, MenuButton, MenuList, Avatar, MenuGroup, HStack } from '@chakra-ui/react'
import ChildMenuItem from 'app/ASKS/menu/ChildMenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const QUE_AVATAR_GRP = 'QUE_AVATAR_GRP'

const AvatarMenu = () => {
  const userCode = useSelector(selectCode('USER'))
  const userImage = useSelector(selectCode(userCode, 'PRI_IMAGE_URL'))
  const name = useSelector(selectCode(userCode, 'PRI_NAME'))
  const userName = useSelector(selectCode(userCode, 'PRI_USERNAME'))
  const avatarAsks = useSelector(selectCode(QUE_AVATAR_GRP))
  const { getImageSrc } = useApi()

  if (!avatarAsks) return null

  const imgSrc = getImageSrc(userImage?.value)

  return (
    <Menu>
      <MenuButton>
        <HStack spacing={1} color="grey">
          <Avatar bg="gradient.400" name={name?.value || userName?.value} src={imgSrc} />
          <FontAwesomeIcon icon={faCaretDown} />
        </HStack>
      </MenuButton>
      <MenuList>
        <MenuGroup>
          {avatarAsks.map(childAsk => (
            <ChildMenuItem
              rootCode={userCode}
              targetCode={userCode}
              key={childAsk}
              questionCode={QUE_AVATAR_GRP}
              childCode={childAsk}
            />
          ))}
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default AvatarMenu
