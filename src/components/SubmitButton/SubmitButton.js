import React        from 'react';
import PropTypes    from 'prop-types';

const SubmitButton = ({ className, text, disabled }) => (
    <div className='submit-button'>
        <button
            className={ className }
            disabled={ disabled }
        >
            { text }
        </button>
    </div>
);

SubmitButton.propTypes = {
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired, 
    disabled: PropTypes.bool.isRequired,
}

export default SubmitButton;