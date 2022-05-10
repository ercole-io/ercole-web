import axiosInstances from '@/axios/axios-instances.js'

const axiosRequest = async (apiName, config, auth = true) => {
  try {
    return await axiosInstances(apiName, auth).request(config)
  } catch (error) {
    return Promise.reject(error)
  }
}

export { axiosRequest }
