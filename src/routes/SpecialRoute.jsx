import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const SpecialRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth.token)
  return !auth ? children : <Navigate to="/" />
}
