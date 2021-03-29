import { includes } from 'ramda'
import axios from 'axios'
import Keycloak from 'keycloak-js'
import { INIT_URL } from './genny'
import loginAsGuest from '../keycloak/login-as-guest'
import setupLogRocketReact from 'logrocket-react'
import LogRocket from 'logrocket'
import getTokenFromURL from 'keycloak/get-token-from-url'
import getTheme from 'config/theme'

let apiConfig = { api_url: '' }
let keycloak = {}
let guestKeycloak = null
let tokenFromUrl = null

const getApiConfig = async () => {
  const response = await axios({
    responseType: 'json',
    headers: {
      'Content-Type': 'application/json',
    },
    url: INIT_URL,
  })

  apiConfig = response.data

  /* Log Rocket */
  if (process.env.NODE_ENV !== 'development') {
    LogRocket.init('geop13/alyson-dev', { release: apiConfig.realm })
    setupLogRocketReact(LogRocket)
  }

  /* Keycloak */
  keycloak = new Keycloak({
    realm: apiConfig.realm,
    url: apiConfig.ENV_KEYCLOAK_REDIRECTURI,
    clientId: 'alyson',
  })

  if (includes('public', window.location.pathname)) {
    guestKeycloak = await loginAsGuest()
  }

  tokenFromUrl = getTokenFromURL(keycloak)

  /* Theme */
  const { projectTheme } = apiConfig
  const theme = getTheme(projectTheme)

  return { keycloak, theme }
}

export { apiConfig, keycloak, guestKeycloak, tokenFromUrl }
export default getApiConfig
