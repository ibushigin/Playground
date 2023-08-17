import { ref } from 'vue'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { IUseApiResult } from '@/interface/IUseApi'
export const isLoading = ref(false)
const useApi = <T>(): IUseApiResult<T> => {
  const error = ref<any>(null)

  const sendRequest = async (config: AxiosRequestConfig): Promise<T | undefined> => {
    error.value = null
    try {
      const response: AxiosResponse<T> = await axios(config)
      return response.data
    } catch (err) {
      error.value = err
    }
  }

  return { isLoading, error, sendRequest }
}

export default useApi
