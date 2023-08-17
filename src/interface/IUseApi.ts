import type { AxiosRequestConfig } from "axios"
import type { Ref } from "vue"

export interface IUseApiResult<T> {
  isLoading: Ref<boolean>
  error: Ref<any>
  sendRequest: (config: AxiosRequestConfig) => Promise<T | undefined>
}
