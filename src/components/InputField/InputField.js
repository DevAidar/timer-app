import React        from 'react';
import PropTypes    from 'prop-types';

const InputField = ({ type, name, placeholder, value, onChanges }) => {

    return (
        <div className='inputField'>
            <input
                className='input'
                type={ type }
                name={ name }
                placeholder={ placeholder }
                value={ value }
                onChange={onChanges}
            />
        </div>
    );
}

InputField.propTypes = {
    type: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
    placeholder: PropTypes.string.isRequired, 
    value: PropTypes.string.isRequired, 
    onChanges: PropTypes.func.isRequired,
}

export default InputField;

