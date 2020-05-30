import React        from 'react';
import PropTypes    from 'prop-types';

const TimeOutput = ({ className, htmlFor, onClick, showColumns, time }) => (
    <label 
        className={`${className} time-input`}
        htmlFor={ htmlFor }
    >
        { showColumns && time.substr(0, 2) === '00'
            ? <></>
            : <>
                <span className={`timer-digit`} onClick={() => onClick(0)}>{time[0]}</span> 
                <span className={`timer-digit`} onClick={() => onClick(1)}>{time[1]}</span> 
                <span className={`timer-separator`} onClick={() => onClick(1)}>{showColumns ? ':' : 'h'}</span>
            </>
        }
        
        { showColumns && time.substr(2, 2) === '00'
            ? <></>
            : <>
                <span className={`timer-digit`} onClick={() => onClick(2)}>{time[2]}</span> 
                <span className={`timer-digit`} onClick={() => onClick(3)}>{time[3]}</span> 
                <span className={`timer-separator`} onClick={() => onClick(3)}>{showColumns ? ':' : 'm'}</span> 
            </>
        }
        
        <span className={`timer-digit`} onClick={() => onClick(4)}>{time[4]}</span> 
        <span className={`timer-digit`} onClick={() => onClick(5)}>{time[5]}</span> 
        {showColumns ? <></> : <span className={`timer-separator`} onClick={() => onClick(5)}>s</span>}
    </label>
);

TimeOutput.propTypes = {
    className: PropTypes.string.isRequired, 
    htmlFor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired, 
    time: PropTypes.string.isRequired,
}

export default TimeOutput;