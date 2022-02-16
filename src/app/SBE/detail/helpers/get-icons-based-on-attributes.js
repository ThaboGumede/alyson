import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGraduationCap,
  faPlus,
  faPhoneAlt,
  faEnvelope,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { selectCode } from 'redux/db/selectors'

const iconsBasedOnAttributes = {
  faEnvelope,
  faPhoneAlt,
  faGraduationCap,
  faMapMarkerAlt,
  faPlus,
}

const GetIconstBasedOnAttributes = ({ attributeCode, config = {} }) => {
  const iconFromBackEnd = useSelector(selectCode(attributeCode, 'icon'))
  const icon = iconsBasedOnAttributes[iconFromBackEnd]

  return <FontAwesomeIcon icon={icon} fixedWidth {...config} />
}
export const getIconsBasedOnAttributes = attributeCode => (
  <FontAwesomeIcon icon={iconsBasedOnAttributes[attributeCode]} fixedWidth />
)

export default GetIconstBasedOnAttributes
