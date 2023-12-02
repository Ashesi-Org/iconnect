import React from 'react' 
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import Year from './Year'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './calendar.css'

const localizer = momentLocalizer(moment)
localizer.formats.yearHeaderFormat = 'YYYY'

const CalendarPage = ()=>{
    return (
      <div className="app">
        <Calendar
          localizer={localizer}
          events={[]}
          toolbar={true}
          views={{
            day: true,
            week: true,
            month: true,
            year: Year
          }}
          messages={{ year: 'Year' }}
        />
      </div>
    )
  }

export default CalendarPage
