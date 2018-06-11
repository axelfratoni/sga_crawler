import React from 'react';
import PropType from 'prop-types';

import './styles.css';
import { subjectPropType } from '../../../../constants/propTypes';

const SubjectDetail = ({ subject, handleSelectPlan }) =>
  subject ? (
    <div className="detail">
      <h5 className="subject-title">
        {subject.subj_code} - {subject.subj_name}
      </h5>
      <div className="subject-plans">
        {subject.plans.map((plan, index) => (
          <button
            className="plan-container"
            key={plan.plan_name}
            onClick={handleSelectPlan({
              subj_name: subject.subj_name,
              subj_code: subject.subj_code,
              plan: index
            })}
          >
            <span className="plan-title">{plan.plan_name}</span>
            <div className="plan-class">
              {plan.classes.map(cls => (
                <span className="class" key={cls.day + cls.start + cls.finish}>
                  {`${cls.day}: ${cls.start} - ${cls.finish}`}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div>Selecciona una materia</div>
  );

SubjectDetail.propTypes = {
  subject: subjectPropType.subject,
  handleSelectPlan: PropType.func.isRequired
};

export default SubjectDetail;
