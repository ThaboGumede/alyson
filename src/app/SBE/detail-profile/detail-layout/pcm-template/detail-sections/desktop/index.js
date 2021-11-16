import { Box } from '@chakra-ui/layout'

import 'app/layouts/components/css/hide-scroll.css'
import LeftDetailSection from 'app/SBE/detail-profile/detail-layout/pcm-template/detail-sections/desktop/LeftDetailSection.js'

const DesktopView = ({ beCode, sbeCode, onScroll, onWheel }) => {
  return (
    <Box className="nobar" overflowY="scroll" onScroll={onScroll} onWheel={onWheel}>
      <LeftDetailSection beCode={beCode} sbeCode={sbeCode} />
    </Box>
  )
}

export default DesktopView
