import React        from 'react';
import PropTypes    from 'prop-types';

const SubmitButton = ({ text, disabled }) => (
    <div className='submitButton'>
        <button
            className='btn'
            disabled={ disabled }
        >
            { text }
        </button>
    </div>
);

SubmitButton.propTypes = {
    text: PropTypes.string.isRequired, 
    disabled: PropTypes.bool.isRequired,
}

export default SubmitButton;