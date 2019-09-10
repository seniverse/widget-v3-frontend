import axios from 'axios'

const get = async (url: string) => {
  const res = await axios.get(url)
  if (res && res.data) {
    return res.data
  }
  return null
}

const getConfig = () =>
  get('http://localhost:3001/api/weather/8f223334-cd21-4708-b75b-3a71d16e211f')

export default {
  getConfig
}
