import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './Textfield.css';

const ReportTextField = ({ value, onChange }) => {
  return (
    <textarea
      className="text-field"
      placeholder="Your response"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="2"
    />
  );
};

// Add prop type validation
ReportTextField.propTypes = {
  value: PropTypes.string.isRequired, // Validate value prop as string and required
  onChange: PropTypes.func.isRequired, // Validate onChange prop as function and required
};

export default ReportTextField;
