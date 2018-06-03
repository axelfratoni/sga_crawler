import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { fetchSubjectByCode } from '../../../../config/firebase';

class AppointmentsExtractor extends Component {
  state = { fullSubject: null };

  componentDidMount = () => {
    const handleFetchSubject = subject => {
      this.setState({ fullSubject: subject });
    };
    fetchSubjectByCode(this.props.subject.subj_code, handleFetchSubject);
  };

  getDay = day => {
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

  getStartHour = start => parseInt(start.split(':')[0], 10);

  getDuration = (start, finish) => parseInt(finish.split(':')[0], 10) - parseInt(start.split(':')[0], 10);

  render() {
    const { color } = this.props;
    const { fullSubject } = this.state;
    return (
      <Fragment>
        {fullSubject && fullSubject.plans ? (
          fullSubject.plans[0].classes.map(cla => (
            <div
              key={cla.day + cla.start}
              className="appointment"
              data-hour={this.getStartHour(cla.start)}
              data-day={this.getDay(cla.day)}
              data-duration={this.getDuration(cla.start, cla.finish)}
              data-color={color}
            >
              <span className="text-container">{fullSubject.subj_name}</span>
            </div>
          ))
        ) : (
          <div />
        )}
      </Fragment>
    );
  }
}
AppointmentsExtractor.propTypes = {
  color: PropTypes.string,
  subject: PropTypes.shape({
    subj_name: PropTypes.string,
    subj_code: PropTypes.string
  })
};

export default AppointmentsExtractor;
