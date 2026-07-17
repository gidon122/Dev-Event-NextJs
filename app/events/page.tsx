import EventCard from "@/components/events/EventCard";
import { events } from "@/lib/constants";

const EventsPage = () => {
  return (
     <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.title}><EventCard {...event}/>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default EventsPage;