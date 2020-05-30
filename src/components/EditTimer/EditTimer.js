import React        from 'react';
import PropTypes    from 'prop-types';

import TimeOutput    from '../TimeOutput/TimeOutput';

const EditTimer = ({ id, setTimer, timer, handleInputChange, onSubmit, getTimeFromNum, showColumns }) => {
    /**
     * Helper function to update timer if user clicks on time
     * [PLANNED] control coursor position with index
     * @param { number } index 
     */
    const onClick = (index) => {                   
        if (!timer.isPaused && timer.time > 0)
            setTimer({
                ...timer,
                defaultTime: getTimeFromNum(timer.time),
                isPaused: true,
                isStarted: false,
            })
        if (timer.time === 0) 
            setTimer({
                ...timer,
                isPaused: true,
                isStarted: false,
                time: null,
            })
    }

    return (
        <form className='set-timer'
            onSubmit={ event => {
                event.preventDefault();
                if (timer.defaultTime === '000000')
                    return;
                onSubmit(timer);
            }}
        >
            <TimeOutput className='set-timer' htmlFor={`${ id }-hiden-input`} onClick={ onClick } showColumns={ showColumns } time={ 
                timer.time === null
                    ? timer.defaultTime 
                    : getTimeFromNum(timer.time)
            } />
            <input 
                id={`${ id }-hiden-input`}
                className='timer-hiden-input'  
                type='text' 
                name='time' 
                value={ timer.defaultTime } 
                onClick={() => onClick(0)} 
                onChange={e => handleInputChange(e, timer)}
            />
        </form>
    );
}

EditTimer.propTypes = {
    id: PropTypes.string.isRequired,
    setTimer: PropTypes.func.isRequired, 
    timer: PropTypes.object.isRequired, 
    handleInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired, 
    getTimeFromNum: PropTypes.func.isRequired,
    showColumns: PropTypes.bool.isRequired,
}

export default EditTimer;