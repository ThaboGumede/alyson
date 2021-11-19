import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { add } from 'ramda'
import { useBoolean } from '@chakra-ui/hooks'

import { selectRows } from 'redux/db/selectors'
import { useIsMobile } from 'utils/hooks'
import 'app/layouts/components/css/hide-scroll.css'
import DesktopView from 'app/SBE/detail-profile/detail-layout/pcm-template/detail-sections/desktop'
import MobileView from 'app/SBE/detail-profile/detail-layout/pcm-template/detail-sections/mobile'

const PcmTemplate = ({ sbeCode, targetCode, positionFromAttribute }) => {
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null
  const isMobile = useIsMobile()
  const [mini, setMini] = useBoolean(isMobile)
  const [delta, setDelta] = useState(0)
  const onScroll = e => {
    setMini.on()
    setDelta(0)
  }
  const onWheel = e => setDelta(add(e.deltaY))

  useEffect(() => {
    if (delta < -300) {
      setMini.off()
      setDelta(0)
    }
  }, [delta, setMini])

  return (
    <>
      {isMobile ? (
        <MobileView
          beCode={beCode}
          sbeCode={sbeCode}
          onScroll={onScroll}
          onWheel={onWheel}
          mini={mini}
          positionFromAttribute
        />
      ) : (
        <DesktopView
          beCode={beCode}
          sbeCode={sbeCode}
          onScroll={onScroll}
          onWheel={onWheel}
          mini={mini}
          positionFromAttribute
        />
      )}
    </>
  )
}
export default PcmTemplate
