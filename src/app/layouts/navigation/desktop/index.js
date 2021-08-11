import { useRef } from 'react'
import { Flex, Spacer, Image, HStack, Box } from '@chakra-ui/react'
import { apiConfig } from 'config/get-api-config'
import Avatar from '../Avatar'

import { onSendMessage } from 'vertx'
import Drafts from '../drafts/Drafts'
import Views from './Views'

const DesktopNav = ({ logoSrc }) => {
  const btnRef = useRef()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        zIndex: 3,
        width: '100%',
        maxWidth: '100vw',
        left: 0,
        right: 0,
        boxShadow: 'rgb(0 0 0 / 10%) 0px 2px 0px 0px',
      }}
    >
      <nav>
        <Flex pr={8} py={2}>
          <Box cursor="pointer" px={8}>
            {apiConfig && (
              <Box
                w="55px"
                onClick={() =>
                  onSendMessage({ code: 'QUE_DASHBOARD_VIEW', parentCode: 'QUE_DASHBOARD_VIEW' })
                }
              >
                <Image ref={btnRef} src={'/favicon.png'} />
              </Box>
            )}
          </Box>
          <Views />
          <Spacer />
          <HStack spacing={10}>
            <Drafts />
            <Box mr="4">
              <Avatar />
            </Box>
          </HStack>
        </Flex>
      </nav>
    </header>
  )
}

export default DesktopNav
