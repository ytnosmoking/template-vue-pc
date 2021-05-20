export const isDev = process.env.NODE_ENV === 'development'
export const getView = name => () => import(`views/${name}/index.vue`)

export const getItem = (key) => {
  const value = localStorage.getItem(key)
  return (value && value !== 'undefined') ? JSON.parse(value) : ''
}

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
export const removeItem = (key) => {
  localStorage.removeItem(key)
}

export const transformData = (data) => {
  return Object.keys(data).reduce((fd, key) => {
    fd.append(key, data[key])
    return fd
  }, new FormData())
}
