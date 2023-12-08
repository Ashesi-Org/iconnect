import React, { useState, useContext } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import Year from "./Year";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";
import { events } from "../../utils/events";
import { AppLayout } from "../../components/ui/AppLayout";
import AppSideBar from "../../components/common/AppSideBar";
import { ContentScrollable } from "../../components/ui/ContentScrollable";
import AppDialog from "../../components/ui/AppDialog";
import EventDetails from "./EventDetails";
import { userContext } from "../../contexts/UserContext";
import { useQuery } from "react-query";
import { api } from "../../api";

const localizer = momentLocalizer(moment);
localizer.formats.yearHeaderFormat = "YYYY";

const CalendarPage = () => {
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user: resolver } = useContext(userContext);

  const { data: resolverEvents, isEventsLoading } = useQuery(
    ["resolver-events", resolver?.userId],
    async () => {
      const response = await api.get(`/api/issues/events/${resolver?.userId}`);
      return response.data;
    },
    {
      enabled: !!resolver,
    }
  );

  const eventsFormatted = resolverEvents?.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const eventStyleGetter = (event, start, end, isSelected) => {
    const currentDate = new Date();
    const isCurrentDateEnd = moment(currentDate).isSame(event.end, 'day');

    let style = {
      borderRadius: '0',
      border: 'none',
      textAlign: 'right',
    };

    if (isCurrentDateEnd) {
      style = {
        ...style,
        backgroundColor: '#3174ad', // Color for the end date
        color: 'white', // Text color
      };
    }

    return {
      style: style,
    };
  };

  const handleEventClick = (event) => {
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
          {isEventsLoading ? <CalendarLoader /> : (
            <ContentScrollable
              content={
                <Calendar
                  localizer={localizer}
                  events={eventsFormatted}
                  toolbar={true}
                  defaultDate={new Date()}
                  endAccessor="end"
                  eventPropGetter={eventStyleGetter} // Apply custom event rendering
                  views={{
                    day: true,
                    week: true,
                    month: true,
                    year: Year,
                  }}
                  messages={{ year: "Year" }}
                  onSelectEvent={handleEventClick}
                />
              }
            />
          )}

          {eventDetailsVisible && selectedEvent && (
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
          )}
        </div>
      }
    />
  );
};

export default CalendarPage;

const CalendarLoader = () => {
  return (
    <div className="w-full p-6 flex justify-center items-center">
      <div className="animate-pulse bg-gray-600 rounded-lg h-64 w-full max-w-md" />
    </div>
  );
};
