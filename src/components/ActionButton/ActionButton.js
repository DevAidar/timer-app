import React        from 'react';
import PropTypes    from 'prop-types';

import './ActionButton.css';

const ActionButton = ({ name, type, value, disabled, timer, onClick }) => (
    <button
        className={`action-btn ${name.toLowerCase()}-button `}
        name={ name }
        type={ type }
        value={ value }
        disabled={ disabled }
        onClick={() => onClick(timer)}
    ><div className='text'>{value}</div></button>
);

ActionButton.propTypes = {
    name: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired, 
    disabled: PropTypes.bool,
    timer: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default ActionButton;

