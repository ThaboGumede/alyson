import { Box } from '@chakra-ui/layout'

import 'app/layouts/components/css/hide-scroll.css'
import LeftDetailSection from 'app/SBE/detail-profile/detail-layout/pcm-template/detail-sections/desktop/LeftDetailSection.js'

const DesktopView = ({
  beCode,
  sbeCode,
  onScroll,
  onWheel,
  positionFromAttribute,
  allAttributesList,
}) => {
  return (
    <Box>
      <LeftDetailSection
        beCode={beCode}
        sbeCode={sbeCode}
        positionFromAttribute={positionFromAttribute}
        allAttributesList={allAttributesList}
      />
    </Box>
  )
}

export default DesktopView
