/*
 *  All validation & warning has been copied directly from examples
 *  Customize as needed
 */

export const validateHuman = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number';
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old';
  }
  return errors;
};

export const warnHuman = values => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...';
  }
  return warnings;
};

export const validateRole = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.members) {
    errors.members = 'Required';
  }

  return errors;
};

export const warnRole = values => {
  const warnings = {};

  return warnings;
};
