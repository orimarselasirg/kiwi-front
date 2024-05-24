import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { Flex, Container } from '@chakra-ui/react'
import { Cards } from './components'
import { addService } from '../../redux'
import Formcard from './components/Form/Form.home'
import './home.css'
const { REACT_APP_API } = process.env
const socket = io(REACT_APP_API)

function Home() {
  const dispatch = useDispatch()
  const [allServices, setAllServices] = useState([])
  useEffect(() => {
    socket.on('serviceData', (data) => {
      dispatch(addService(data.data))
    })
    return () => {
      socket.off('serviceData')
    }
  }, [])

  // useEffect(() => {
  //   socket.emit('serviceAllData', allServices)
  //   socket.on('serviceAllData', (arrayService) => {
  //     arrayService.forEach((service) => {
  //       return dispatch(addService(service.data))
  //     })
  //   })
  // }, []) // validar este emit, no carga al abrir una nueva ventana

  const addServiceEmit = (socket, data) => {
    socket.emit('serviceData', data)
  }

  const editServiceEmit = (socket, data) => {
    socket.emit('editData', data)
  }

  const removeServiceEmit = (socket, data) => {
    socket.emit('removeData', data)
  }

  return (
    <Container h="inherit" alignSelf="flex-start" maxW="container.xl">
      <Flex flexWrap="wrap">
        <Formcard
          addServiceEmit={addServiceEmit}
          socket={socket}
          allServices={allServices}
          setAllServices={setAllServices}
        />
        <Cards
          editServiceEmit={editServiceEmit}
          removeServiceEmit={removeServiceEmit}
          socket={socket}
        />
      </Flex>
    </Container>
  )
}

export default Home
