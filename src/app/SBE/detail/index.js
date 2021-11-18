import { useSelector } from 'react-redux'
import { selectDetail } from 'redux/app/selectors'
import { selectCode } from 'redux/db/selectors'
import Intern from 'app/SBE/detail-profile/intern'
import Company from './company'
import Internship from 'app/SBE/detail-profile/internship'
import Rep from './rep'
import Agent from './agent'
import EduProDetail from './edu_pro'
import DefaultView from './default-view'
import getDetailType from './helpers/get-detail-type'
import Application from 'app/SBE/detail-profile/application'
import PCMTemplate from 'app/SBE/detail-profile/pcm-template'
import { head, compose, map } from 'ramda'

const useGetBaseEntityAttributes = (beCode, attributeCode) =>
  useSelector(selectCode(beCode, attributeCode))

const allBaseEntityAttributes = code => getBaseEntityAttributes => attributeList => {
  return attributeList?.reduce((acc, val) => {
    return (acc = acc.concat(getBaseEntityAttributes(code, val)))
  }, [])
}

const BaseEntityDetail = ({ targetCode, defaultView }) => {
  const code = useSelector(selectDetail)
  const displayMode = useSelector(selectCode(code, 'SCH_DISPLAY_MODE'))
  const displayType = getDetailType(displayMode?.value)

  const beCode = head(useSelector(selectCode(code, 'rows')) || [targetCode])
  const allAttributesList = useSelector(selectCode(beCode))

  const allAttributeValues = allBaseEntityAttributes(beCode)(useGetBaseEntityAttributes)(
    allAttributesList,
  )

  const positionFromAttribute = compose(
    map(({ attributeCode, value }) => ({ code: attributeCode, position: value })),
  )(allAttributeValues || [])

  console.log('%c DROPDOWN---->', 'color: red; font-size: 20px', {
    positionFromAttribute,
  })

  if (defaultView) return <DefaultView sbeCode={code} targetCode={beCode} />
  if (displayType === 'DEFAULT_TEMPLATE') {
    return <PCMTemplate sbeCode={code} targetCode={beCode} />
  }
  if (displayType === 'CV') {
    return <Intern sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'COMPANY') {
    return <Company sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'INTERNSHIP') {
    return <Internship sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'APPLICATION') {
    return <Application sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'REP') {
    return <Rep sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'AGENT') {
    return <Agent sbeCode={code} targetCode={beCode} />
  }

  if (displayType === 'EDU_PRO') {
    return <EduProDetail sbeCode={code} targetCode={beCode} />
  }

  return <DefaultView sbeCode={code} targetCode={beCode} />
}

export default BaseEntityDetail
