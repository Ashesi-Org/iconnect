import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const SchedulerCalendar = ({ events }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(new Date());
    }
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full sm:w-10/12 bg-white rounded-lg shadow-md">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          className="m-4" 
        />
      </div>
    </div>
  );
};

export default SchedulerCalendar;
