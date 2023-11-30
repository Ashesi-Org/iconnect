import React from 'react';
import SchedulerCalendar from '../../admin-ui/calendar/Calendar';


const events = [
  {
    id: 1,
    title: 'Team Meeting',
    start: new Date(2023, 10, 15, 10, 0),
    end: new Date(2023, 10, 15, 12, 0),
  },
  {
    id: 2,
    title: 'Lunch with Jane',
    start: new Date(2023, 10, 16, 12, 30),
    end: new Date(2023, 10, 16, 13, 30),
  },
  {
    id: 3,
    title: 'Client Presentation',
    start: new Date(2023, 10, 18, 9, 0),
    end: new Date(2023, 10, 18, 11, 0),
  },
  {
    id: 4,
    title: 'Project Review',
    start: new Date(2023, 10, 20, 14, 0),
    end: new Date(2023, 10, 20, 16, 0),
  },
];

const CalendarPage = () => {
  return (
    <div className="flex justify-center items-center flex-col w-screen h-screen">
    <h1>Your Schedule</h1>
    <SchedulerCalendar events={events} />
    </div>
  );
};

export default CalendarPage;
