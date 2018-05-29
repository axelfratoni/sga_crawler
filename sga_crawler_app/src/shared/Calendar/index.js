import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppointmentsExtractor from './components/AppointmentsExtractor';
import './styles.css';

const getColor = id => ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'gray'][id];

function Calendar({ subjects }) {
  return (
    <Fragment>
      <div className="week">
        <div className="week-day" />
        <div className="week-day">Monday</div>
        <div className="week-day">Tuesday</div>
        <div className="week-day">Wednesday</div>
        <div className="week-day">Thursday</div>
        <div className="week-day">Friday</div>
        <div className="week-day">Saturday</div>
        <div className="week-day">Sunday</div>
      </div>
      <div className="week week-appointments">
        {Array.from(Array(16).keys(), x => x + 8).map(hour => (
          <div className="hour" data-hour={hour} key={hour}>
            {hour}
          </div>
        ))}
        {subjects.map(
          (sub, i) => sub && <AppointmentsExtractor key={sub.subj_code} subject={sub} color={getColor(i)} />
        )}
      </div>
    </Fragment>
  );
}

Calendar.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      subj_name: PropTypes.string,
      subj_code: PropTypes.string,
      plans: PropTypes.arrayOf(
        PropTypes.shape({
          plan_name: PropTypes.string,
          classes: PropTypes.arrayOf(
            PropTypes.shape({
              day: PropTypes.string,
              start: PropTypes.string,
              finish: PropTypes.string
            })
          )
        })
      )
    })
  )
};

export default Calendar;
