import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const getDay = day => {
  switch (day) {
    case 'Lunes':
      return 'mon';
    case 'Martes':
      return 'tue';
    case 'Miércoles':
      return 'wed';
    case 'Jueves':
      return 'thu';
    case 'Viernes':
      return 'fri';
    case 'Sábado':
      return 'sat';
    case 'Domingo':
      return 'sun';
    default:
      return '';
  }
};

const getStartHour = start => parseInt(start.split(':')[0], 10);

const getDuration = (start, finish) => parseInt(finish.split(':')[0], 10) - parseInt(start.split(':')[0], 10);

function AppointmentsExtractor({ subject, color }) {
  return (
    <Fragment>
      {subject.plans[0].classes.map(cla => (
        <div
          key={cla.day + cla.start}
          className="appointment"
          data-hour={getStartHour(cla.start)}
          data-day={getDay(cla.day)}
          data-duration={getDuration(cla.start, cla.finish)}
          data-color={color}
        >
          {subject.subj_name}
        </div>
      ))}
    </Fragment>
  );
}

AppointmentsExtractor.propTypes = {
  color: PropTypes.string,
  subject: PropTypes.shape({
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
};

export default AppointmentsExtractor;
