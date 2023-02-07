import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const Form = ({ form, InputComponent, formState }) => {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    const formObject = Object.values(form).reduce((acc, formElement) => {
      const { name, value } = formElement;
      acc[name] = value;
      return acc;
    }, {});

    setInputs(formObject);
  }, [form]);

  useEffect(() => {
    formState(inputs);
  }, [inputs]);
  return (
    <>
      {Object.values(form).map(formElement => (
        <InputComponent
          key={formElement.name}
          {...formElement}
          onChange={e => {
            setInputs({ ...inputs, [formElement.name]: e.target.value });
          }}
        />
      ))}
    </>
  );
};

// Props Type
Form.propTypes = {
  form: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    }),
  }),
  InputComponent: PropTypes.any,
  formState: PropTypes.func,
};
