import React        from 'react';
import PropTypes    from 'prop-types';

const ActionButton = ({ name, value, onClick }) => {

    return (
        <div className='inputField'>
            <button
                className={`action-btn ${name.toLowerCase()}-button`}
                name={ name }
                value={ value }
                onClick={() => onClick()}
            >{value}</button>
        </div>
    );
}

ActionButton.propTypes = {
    name: PropTypes.string.isRequired, 
    value: PropTypes.string.isRequired, 
    onClick: PropTypes.func.isRequired,
}

export default ActionButton;

