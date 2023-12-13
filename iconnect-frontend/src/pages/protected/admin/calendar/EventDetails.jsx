import React from 'react';

const EventDetails = ({ event, closeModal }) => {
  return (
    <div className='bg-app-background-1 p-8 rounded'>
      {event && (
        <div className='text-app-white flex gap-3 flex-col'>
          <h2>Event Details</h2>
          <p>Title: {event?.title}</p>
          {/* <p>Start: {event?.start}</p>
          <p>End: {event?.end}</p> */}
          <button className='text-red-500' onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
