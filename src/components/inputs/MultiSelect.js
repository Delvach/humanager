import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

const renderMultiselect = ({ input, data, valueField, textField }) => (
  <Multiselect
    {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />
);

const MultiSelect = ({ name, data, textFieldName, valueFieldName }) => (
  <Field
    component={renderMultiselect}
    name={name}
    data={data}
    textField={textFieldName}
    valueField={valueFieldName}
  />
);

MultiSelect.propTypes = {
  name: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  textFieldName: PropTypes.string,
  valueFieldName: PropTypes.string
};

MultiSelect.defaultProps = {
  name: 'items',
  data: [],
  textFieldName: 'text',
  valueFieldName: 'value'
};

export default MultiSelect;
