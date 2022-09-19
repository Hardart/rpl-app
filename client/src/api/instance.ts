import JWT from '@/features/Token-class'
import router from '@/router'
import axios, { AxiosError, type AxiosResponse } from 'axios'

const instance = axios.create({
   baseURL: 'http://localhost:80',
})

instance.interceptors.request.use(addAccessToken)
instance.interceptors.response.use(
   (res: AxiosResponse) => res,
   (err: AxiosError) => {
      const data = err.response?.data
      const config = err.config

      if (err.response?.status == 401 && config.headers?.app401 !== true) {
         router.push('/login')
         return { data: data }
      }
      if (err.response?.status == 400) {
         router.push('/registration')
         return { data }
      }
      return { data }
   }
)

// добавляем accessToken в header Authorization
function addAccessToken<AxiosRequestConfig>(request: any) {
   const token = JWT.accessToken
   if (token !== null) request.headers.Authorization = `Bearer ${token}`

   return request
}
// function instanceSupport(router, store, http) {
//    http.interceptors.response.use(
//       function (response) {
//          if ('errorAlert' in response.config) response.data = { res: true, data: response.data }
//          return response
//       },
//       function (error) {
//          let config = error.config
//          if (error.response?.status == 401 && config.app401 !== true) {
//             store.dispatch('user/logout')
//             router.push({ name: 'login' })

//             return { data: { res: false, data: null } }
//          }
//          if (error.response?.status == 403) config.errorAlert = 'У вас не достаточно прав для совершения данного действия'

//          if ('errorAlert' in config) {
//             let { errorAlert } = config
//             if (typeof errorAlert === 'string') errorAlert = { text: errorAlert }

//             store.dispatch('alerts/add', {
//                text: `Ошибка ответа от сервера: ${errorAlert.text}`,
//                timeout: 5000,
//                critical: errorAlert?.isCritical ?? false,
//             })

//             return { data: { res: false, data: null } }
//          }

//          return Promise.reject(error)
//       }
//    )
// }
export default instance
