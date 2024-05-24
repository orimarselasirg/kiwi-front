import { AiFillHome, AiOutlineHome } from 'react-icons/ai'
import { RiShieldUserFill, RiShieldUserLine } from 'react-icons/ri'

export const SECTIONS = [
  {
    title: 'INICIO',
    path: '/',
    activeIcon: AiFillHome,
    inactiveIcon: AiOutlineHome
  },
  {
    title: 'PANEL DE ADMIN',
    activeIcon: RiShieldUserFill,
    inactiveIcon: RiShieldUserLine,
    submenu: [
      {
        title: 'Estaciones',
        path: '/estaciones'
      },
      {
        title: 'Técnicos',
        path: '/tecnicos'
      },
      {
        title: 'Productos',
        path: '/productos'
      },
      {
        title: 'Servicios',
        path: '/services'
      }
    ]
  }
]
