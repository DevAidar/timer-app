import React        from 'react';
import PropTypes    from 'prop-types';

const InputField = ({ className, type, name, placeholder, value, onChanges }) => (
    <div className='input-field'>
        <input
            className={ className }
            type={ type }
            name={ name }
            placeholder={ placeholder }
            value={ value }
            onChange={onChanges}
            autoFocus
            autoComplete='off'
        />
    </div>
);

InputField.propTypes = {
    className: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
    placeholder: PropTypes.string.isRequired, 
    value: PropTypes.string.isRequired, 
    onChanges: PropTypes.func.isRequired,
}

export default InputField;

