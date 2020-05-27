import React        from 'react';
import PropTypes    from 'prop-types';

const TimeInput = ({ className, onClick, time }) => (
    <div className={`${className} time-input`}>
        <span className={`timer-digit`} onClick={() => onClick(0)}>{time[0]}</span> 
        <span className={`timer-digit`} onClick={() => onClick(1)}>{time[1]}</span> 
        <span className={`timer-separator`}>h</span> 
        <span className={`timer-digit`} onClick={() => onClick(2)}>{time[2]}</span> 
        <span className={`timer-digit`} onClick={() => onClick(3)}>{time[3]}</span> 
        <span className={`timer-separator`}>m</span> 
        <span className={`timer-digit`} onClick={() => onClick(4)}>{time[4]}</span> 
        <span className={`timer-digit`} onClick={() => onClick(5)}>{time[5]}</span> 
        <span className={`timer-separator`}>s</span> 
    </div>
);

TimeInput.propTypes = {
    className: PropTypes.string.isRequired, 
    onClick: PropTypes.func.isRequired, 
    time: PropTypes.object.isRequired,
}

export default TimeInput;