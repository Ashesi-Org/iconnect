import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Year from './Year'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'
import { events } from '../../utils/events'
import { AppLayout } from '../../components/ui/AppLayout'
import AppSideBar from '../../components/common/AppSideBar'
import { ContentScrollable } from '../../components/ui/ContentScrollable'
import AppDialog from '../../components/ui/AppDialog'
import EventDetails from './EventDetails'

const localizer = momentLocalizer(moment)
localizer.formats.yearHeaderFormat = 'YYYY'

const CalendarPage = () => {
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = event => {
    setSelectedEvent(event);
    setEventDetailsVisible(true);
  };

  const closeEventModal = () => {
    setEventDetailsVisible(false);
  };
  return (
    <AppLayout
      sidebar={<AppSideBar />}
      column={
        <div>
          <ContentScrollable
            content={
              <Calendar
                localizer={localizer}
                events={events}
                toolbar={true}
                defaultDate={new Date()}
                startAccessor='start'
                endAccessor='end'
                views={{
                  day: true,
                  week: true,
                  month: true,
                  year: Year,
                }}
                messages={{ year: 'Year' }}
                onSelectEvent={handleEventClick}
              />
            }
          />

          {eventDetailsVisible && selectedEvent &&
            <AppDialog
              defaultOpen={eventDetailsVisible}
              open={eventDetailsVisible}
              setOpenChange={closeEventModal}
              content={
                <EventDetails
                  event={selectedEvent}
                  closeModal={closeEventModal}
                />
              }
            />
          }
        </div>
      }
    />

  )
}

export default CalendarPage
