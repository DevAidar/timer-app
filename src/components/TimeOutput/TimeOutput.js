import React        from 'react';
import PropTypes    from 'prop-types';

import './TimeOutput.css';

const TimeOutput = ({ className, htmlFor, onClick, showColumns, index, time }) => (
    <label 
        className={`${className} time-input`}
        htmlFor={ htmlFor }
    >
        { showColumns && time.substr(0, 2) === '00'
            ? <></>
            : <>
                <span className={`timer-digit${index === 0 ? ' timer-cursor' : ''}${index !== null && (index === -1 || time.substr(0, 1) === '0'.repeat(1)) ? ' time-unsure' : ''}`} onClick={() => onClick(0)}>{ time[0] }</span> 
                <span className={`timer-digit${index === 1 ? ' timer-cursor' : ''}${index !== null && (index === -1 || time.substr(0, 2) === '0'.repeat(2)) ? ' time-unsure' : ''}`} onClick={() => onClick(1)}>{ time[1] }</span> 
                <span className={`timer-separator${showColumns ? ' timer-column' : ''}${index !== null && (index === -1 || time.substr(0, 2) === '0'.repeat(2)) ? ' time-unsure' : ''}`} onClick={() => onClick(1)}>{showColumns ? ':' : 'h'}</span>
            </>
        }
        
        { showColumns && time.substr(0, 2) === '00' && showColumns && time.substr(2, 2) === '00'
            ? <></>
            : <>
                <span className={`timer-digit${index === 2 ? ' timer-cursor' : ''}${index !== null && (index === -1 || time.substr(0, 3) === '0'.repeat(3)) ? ' time-unsure' : ''}`} onClick={() => onClick(2)}>{ time[2] }</span> 
                <span className={`timer-digit${index === 3 ? ' timer-cursor' : ''}${index !== null && (index === -1 || time.substr(0, 4) === '0'.repeat(4)) ? ' time-unsure' : ''}`} onClick={() => onClick(3)}>{ time[3] }</span> 
                <span className={`timer-separator${showColumns ? ' timer-column' : ''}${index !== null && (index === -1 || time.substr(0, 4) === '0'.repeat(4)) ? ' time-unsure' : ''}`} onClick={() => onClick(3)}>{showColumns ? ':' : 'm'}</span> 
            </>
        }
        <span className={`timer-digit${index === 4 ? ' timer-cursor' : ''}${index !== null && (index === -1 || time.substr(0, 5) === '0'.repeat(5)) ? ' time-unsure' : ''}`} onClick={() => onClick(4)}>{ time[4] }</span> 
        <span className={`timer-digit${index === 5  || index === -1 ? ' timer-cursor' : ''}${index !== null && (index === -1 || time.substr(0, 6) === '0'.repeat(6)) ? ' time-unsure' : ''}`} onClick={() => onClick(5)}>{ time[5] }</span> 
        {showColumns ? <></> : <span className={`timer-separator last${index !== null && (index === -1 || time.substr(0, 6) === '0'.repeat(6)) ? ' time-unsure' : ''}`} onClick={() => onClick(5)}>s</span>}
    </label>
);

TimeOutput.propTypes = {
    className: PropTypes.string.isRequired, 
    htmlFor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired, 
    showColumns: PropTypes.bool.isRequired,
    index: PropTypes.number,
    time: PropTypes.string.isRequired,
}

export default TimeOutput;