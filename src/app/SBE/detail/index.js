import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import DefaultView from './default-view'

import { head } from 'ramda'

const BaseEntityDetail = ({ targetCode, defaultView }) => {
  const code = useSelector(selectDetail)

  const beCode = head(useSelector(selectCode(code, 'rows')) || [targetCode])

  if (defaultView) return <DefaultView sbeCode={code} targetCode={beCode} />
  return <DefaultView sbeCode={code} targetCode={beCode} />
}

export default BaseEntityDetail
