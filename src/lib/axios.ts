import axios from 'axios'


export const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
})

if (true) {
  api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  })
}
