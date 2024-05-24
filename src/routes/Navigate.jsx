import { Login, Register, NewPassword, Home, InProgressPage, Root } from 'pages'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { SpecialRoute } from './SpecialRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '*',
        element: <InProgressPage />
      }
    ]
  },
  {
    path: '/login',
    element: (
      <SpecialRoute>
        <Login />
      </SpecialRoute>
    )
  },
  {
    path: '/register',
    element: (
      <SpecialRoute>
        <Register />
      </SpecialRoute>
    )
  },
  {
    path: 'auth/new-password/:token',
    element: <NewPassword />
  }
])

export default router
