import React from 'react';

import './styles.css';
import { subjectPropType } from '../../../../constants/propTypes';

const SubjectDetail = ({ subject }) =>
  subject ? (
    <div className="detail">
      <h5 className="subject-title">
        {subject.subj_code} - {subject.subj_name}
      </h5>
      <div className="subject-plans">
        {subject.plans.map(plan => (
          <div className="plan-container" key={plan}>
            <span className="plan-title">{plan.plan_name}</span>
            <div className="plan-class">
              {plan.classes.map(cls => (
                <span className="class" key={cls.day + cls.start}>
                  {`${cls.day}: ${cls.start} - ${cls.finish}`}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>Selecciona una materia</div>
  );

SubjectDetail.propTypes = {
  subject: subjectPropType.subject
};

export default SubjectDetail;
