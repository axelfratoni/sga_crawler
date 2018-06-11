import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { fetchSubjectByCode } from '../../../../config/firebase';
import { getStartHour, getDay, getDuration } from '../../../../utils/classParser';

class AppointmentsExtractor extends Component {
  state = { fullSubject: null };

  componentDidMount = () => {
    const handleFetchSubject = subject => {
      this.setState({ fullSubject: subject });
      this.props.handleShowInfo(subject)();
    };
    fetchSubjectByCode(this.props.subject.subj_code, handleFetchSubject);
  };

  render() {
    const { color, handleShowInfo, subject } = this.props;
    const { fullSubject } = this.state;
    return (
      <Fragment>
        {fullSubject && fullSubject.plans ? (
          fullSubject.plans[subject.plan].classes.map(cla => (
            <button
              onClick={handleShowInfo(fullSubject)}
              key={cla.day + cla.start}
              className="appointment"
              data-hour={getStartHour(cla.start)}
              data-day={getDay(cla.day)}
              data-duration={getDuration(cla.start, cla.finish)}
              data-color={color}
            >
              <span className="text-container">{fullSubject.subj_name}</span>
            </button>
          ))
        ) : (
          <div />
        )}
      </Fragment>
    );
  }
}
AppointmentsExtractor.propTypes = {
  handleShowInfo: PropTypes.func,
  color: PropTypes.string,
  subject: PropTypes.shape({
    subj_name: PropTypes.string.isRequired,
    subj_code: PropTypes.string.isRequired,
    plan: PropTypes.number.isRequired
  })
};

export default AppointmentsExtractor;
