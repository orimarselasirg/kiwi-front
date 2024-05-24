import { useSelector } from 'react-redux'
import { Card } from './index'
import './Cards.css'

function Cards({
  socket,
  editServiceEmit,
  removeServiceEmit
}) {
  const services = useSelector((state) => state.service.service)
  return (
    <div className="card-container">
      {services &&
        services.map((service) => (
          <Card
            key={service.vehicle_id}
            vehicle_id={service.vehicle_id}
            workstation={service.workstation}
            datetime={service.datetime}
            technician={service.technician}
            data={service.data}
            editServiceEmit={editServiceEmit}
            removeServiceEmit={removeServiceEmit}
            socket={socket}
          />
        ))}
    </div>
  )
}

export default Cards
