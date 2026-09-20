import { useState } from '#app'
import { onMounted } from 'vue'

export const useAdminAuth = () => {
  const token = useState<string>('admin_token', () => '')
  
  const loadToken = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('admin_token')
      if (saved) token.value = saved
    }
  }

  const setToken = (newToken: string) => {
    token.value = newToken
    if (typeof window !== 'undefined') {
      if (newToken) {
        localStorage.setItem('admin_token', newToken)
      } else {
        localStorage.removeItem('admin_token')
      }
    }
  }
  
  const logout = () => {
    setToken('')
  }

  return { token, loadToken, setToken, logout }
}
