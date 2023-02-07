import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import ListItem from 'molecules/ListItem';
import { Form } from 'molecules/Form/Form';

export const AddressFormComponent = ({
  selectedAddress,
  formState,
  formFields,
}) => {
  const [form, setForm] = useState(formFields);

  useEffect(() => {
    const { address } = form;
    setForm({
      ...form,
      address: {
        ...address,
        value: selectedAddress.formatted_address,
      },
    });
  }, [selectedAddress]);

  return (
    <div data-testid="rendering-form" className="py-6 px-3">
      <div className="pt-2">
        <Form
          form={form}
          formState={formState}
          InputComponent={InputComponent}
        />
      </div>
    </div>
  );
};

AddressFormComponent.propTypes = {
  selectedAddress: propTypes.object,
  formState: propTypes.func,
  formFields: propTypes.object,
};

const editIcon = require('../../images/edit.svg');
export const InputComponent = props => {
  const { label, required, editable, onChange, value } = props;

  return (
    <div className="my-2">
      <ListItem
        icon={editIcon}
        leftText={label}
        required={required}
        disabled={!editable}
        onChange={onChange}
        defaultValue={value}
        multiline
        {...props}
      />
    </div>
  );
};

// PropTypes
InputComponent.propTypes = {
  label: propTypes.string,
  required: propTypes.bool,
  editable: propTypes.bool,
  onChange: propTypes.func,
  value: propTypes.string,
};
