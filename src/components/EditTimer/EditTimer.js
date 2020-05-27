import React        from 'react';
import PropTypes    from 'prop-types';

import TimeInput    from '../TimeInput/TimeInput';

const EditTimer = ({ setTimer, timer, handleInputChange, onSubmit, getTimeFromNum }) => {
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
            })
        if (timer.time === 0) 
            setTimer({
                ...timer,
                isPaused: true,
                time: null,
            })
    }

    return (
        <form className='set-timer'
            onSubmit={ event => {
                event.preventDefault();
                if (timer.defaultTime === '000000')
                    return;
                onSubmit();
            }}
        >
            <TimeInput className='set-timer' onClick={ onClick } time={ 
                timer.time === null
                    ? timer.defaultTime 
                    : getTimeFromNum(timer.time)
            } />
            <input className='timer-hiden-input' type='text' name='time' value={ timer.defaultTime } onClick={() => onClick(0)} set onChange={(e) => handleInputChange(e)}/>
        </form>
    );
}

EditTimer.propTypes = {
    setTimer: PropTypes.func.isRequired, 
    timer: PropTypes.object.isRequired, 
    handleInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired, 
    getTimeFromNum: PropTypes.func.isRequired,
}

export default EditTimer;