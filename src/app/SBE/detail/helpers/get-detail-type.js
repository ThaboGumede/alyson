import { compose, prop, split, includes } from 'ramda'

const getDetailType = code => {
  console.log('code', code)
  return includes(':', code) ? compose(prop(1), split(':'))(code || '') : code || ''
}

export default getDetailType
