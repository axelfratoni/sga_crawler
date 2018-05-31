import PropTypes from 'prop-types';

export const classPropType = {
  class: PropTypes.shape({
    day: PropTypes.string,
    start: PropTypes.string,
    finish: PropTypes.string
  })
};

export const planPropType = {
  plan: PropTypes.shape({
    plan_name: PropTypes.string,
    classes: PropTypes.arrayOf(classPropType.class)
  })
};

export const subjectPropType = {
  subject: PropTypes.shape({
    subj_name: PropTypes.string,
    subj_code: PropTypes.string,
    plans: PropTypes.arrayOf(planPropType.plan)
  })
};
