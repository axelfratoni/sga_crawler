import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppointmentsExtractor from './components/AppointmentsExtractor';
import './styles.css';

const colorArray = ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'gray'];

const getColor = id => colorArray[id % colorArray.length];

function Calendar({ subjects }) {
  return (
    <Fragment>
      <div className="week">
        <div className="week-day" />
        <div className="week-day">Lunes</div>
        <div className="week-day">Martes</div>
        <div className="week-day">Miércoles</div>
        <div className="week-day">Jueves</div>
        <div className="week-day">Viernes</div>
        <div className="week-day">Sábado</div>
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
      subj_code: PropTypes.string
    })
  )
};

export default Calendar;
