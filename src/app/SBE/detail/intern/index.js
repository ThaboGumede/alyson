import { useSelector, useDispatch } from 'react-redux'
import { selectCode, selectRows } from 'redux/db/selectors'
import { Box, Flex, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import useApi from 'api'
import getActions from 'app/SBE/utils/get-actions'
import Attribute from 'app/BE/attribute'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCompactDisc,
  faEnvelopeOpenText,
  faObjectGroup,
  faTimesCircle,
  faUser,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons'
import { closeDrawer } from 'redux/app'
import { useIsMobile } from 'utils/hooks'
import InternsMobileView from './mobile_view'
import ProfilePicture from 'app/layouts/components/profile_picture'
import Software from '../internship/templates/Software'
import DetailSubHeader from 'app/layouts/components/subheader'
import DetailHeader from './template/Header'

const topHeight = '35vh'
const subHeaderAttributes = ['PRI_PREFERRED_NAME']

const Intern = ({ sbeCode, targetCode }) => {
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const onClose = () => dispatch(closeDrawer())
  const sbe = useSelector(selectCode(sbeCode))
  const rows = useSelector(selectRows(sbeCode))
  const beCode = targetCode ? targetCode : rows?.length ? rows[0] : null

  const image = useSelector(selectCode(beCode, 'PRI_IMAGE_URL'))
  const internsName = useSelector(selectCode(beCode, 'PRI_NAME'))
  const video = useSelector(selectCode(beCode, 'PRI_VIDEO_URL'))
  const careerObj = useSelector(selectCode(beCode, 'PRI_CAREER_OBJ'))
  const software = useSelector(selectCode(beCode, 'PRI_ASSOC_CURRENT_SOFTWARE'))

  const { getImageSrc, getSrc } = useApi()
  const videoSrc = getSrc(video?.value)
  const src = getImageSrc(image?.value)

  const actions = getActions(sbe)

  if (!beCode) return null

  return isMobile ? (
    <InternsMobileView
      onClose={onClose}
      careerObj={careerObj}
      videoSrc={videoSrc}
      internsName={internsName}
      beCode={beCode}
      actions={actions}
      src={src}
      sbeCode={sbeCode}
    />
  ) : (
    <Box
      w="70vw"
      h="100vh"
      style={{
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem',
      }}
    >
      <DetailHeader videoSrc={videoSrc} careerObj={careerObj} video={video} topHeight={topHeight} />
      <ProfilePicture src={src} />

      <Box overflow="scroll" h={`calc(100vh - ${topHeight})`}>
        <VStack pt="5rem" overflowX="hidden">
          <DetailSubHeader
            name={internsName}
            beCode={beCode}
            sbeCode={sbeCode}
            actions={actions}
            subHeaderAttributes={subHeaderAttributes}
          />
          <HStack w="65vw" align="start" pt="5" spacing="5">
            <VStack align="start" w="40%">
              <HStack spacing="10" align="start" mb="1rem">
                <FontAwesomeIcon icon={faUser} />
                <VStack align="start">
                  <Text fontWeight="semibold">{`Contact details`}</Text>
                  <Attribute code={beCode} attribute={'PRI_MOBILE'} />
                  <Attribute code={beCode} attribute={'PRI_EMAIL'} />
                  <Attribute code={beCode} attribute={'PRI_ADDRESS_FULL'} />
                  <Attribute code={beCode} attribute={'PRI_LINKEDIN_URL'} />
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      Student ID
                    </Text>
                    <Attribute code={beCode} attribute={'PRI_STUDENT_ID'} />
                  </HStack>
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      Education Provider
                    </Text>
                    <Attribute code={beCode} attribute={'PRI_ASSOC_EP'} />
                  </HStack>
                </VStack>
              </HStack>
              <HStack spacing="10" align="start" mb="1rem">
                <FontAwesomeIcon icon={faEnvelopeOpenText} />
                <VStack align="start">
                  <Text fontWeight="semibold">{`Internship Details`}</Text>
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      Start Date
                    </Text>
                    <Attribute
                      config={{ textStyle: 'body2' }}
                      code={beCode}
                      attribute={'PRI_START_DATE'}
                    />
                  </HStack>
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      Duration
                    </Text>
                    <Attribute code={beCode} attribute={'PRI_ASSOC_DURATION'} />
                  </HStack>
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      Transport
                    </Text>
                    <Attribute code={beCode} attribute={'PRI_TRANSPORT'} />
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
            <VStack align="start" w="50%">
              <HStack spacing="10" align="start" mb="1rem">
                <FontAwesomeIcon icon={faCompactDisc} />
                <VStack align="start">
                  <Text fontWeight="semibold">{`Known Software`}</Text>
                  <Software value={software?.value} />
                </VStack>
              </HStack>
              <HStack spacing="10" align="start" mb="1rem">
                <FontAwesomeIcon icon={faUserClock} />
                <VStack align="stretch">
                  <Text textStyle="body1">{`Recent Employment`}</Text>
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      Employer
                    </Text>
                    <Attribute code={beCode} attribute={'PRI_PREV_EMPLOYER'} />
                  </HStack>
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      Title
                    </Text>
                    <Attribute code={beCode} attribute={'PRI_PREV_JOB_TITLE'} />
                  </HStack>
                  <HStack>
                    <Text w="6rem" textStyle="body3">
                      CV
                    </Text>
                    <Attribute code={beCode} attribute={'PRI_CV'} />
                  </HStack>
                </VStack>
              </HStack>
              <HStack spacing="10" align="start" mb="1rem">
                <FontAwesomeIcon icon={faObjectGroup} />
                <VStack align="start">
                  <Text textStyle="body1">{`Career Objectives`}</Text>
                  <Text textStyle="body2" dangerouslySetInnerHTML={{ __html: careerObj?.value }} />
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  )
}

export default Intern
