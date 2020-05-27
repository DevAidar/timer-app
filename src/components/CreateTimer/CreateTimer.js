import React, { useState}   from 'react';
import PropTypes            from 'prop-types';

import EditTimer            from '../EditTimer/EditTimer';
import ActionButton         from '../ActionButton/ActionButton';

const SetTimer = ({ addTimer, editTimer, getTimeFromNum }) => {
    const initialTimer = {
        defaultTime: '000500', // change it back to '000000'
        time: null,
        isPaused: true,
        id: null,
        users: [],
    };

    /**
     * Helper function to convert timer state into state
     */
    const stateConverter = () => (
        timer.time === null
            ? 'start'
            : timer.time === 0
                ? 'done'
                : timer.isPaused
                    ? 'resume'
                    : 'pause'
    )


    const [timer, setTimer] = useState(initialTimer);

    /**
     * Helper function to update timer at root and at the parent
     * @param { object } timer 
     */
    const updateTimer = (timer) => {
        setTimer(editTimer(timer));
    } 

    /**
     * Handles input change and makes sure that input follows the 
     * @param {*} event 
     */
    const handleInputChange = event => {
        if (timer.isPaused) {
            setTimer({
                ...timer,
                defaultTime: '000000'.concat(parseInt(event.target.value)).slice(-6),
                time: null,
            });
        }
    }

    /**
     * Handles start button press
     */
    const onStart = () => {
        if (timer.id === null)
            setTimer(addTimer({...timer, isPaused: false}));
        else 
            updateTimer({...timer, isPaused: false});
    }

    /**
     * Handles pause button press
     */
    const onPause = () => {
        updateTimer({...timer, isPaused: true});
    }

    /**
     * Handles resume button press
     */
    const onResume = () => {
        updateTimer({...timer, isPaused: false});
    }

    /**
     * Handles done button press
     */
    const onDone = () => {
        setTimer(editTimer({...initialTimer, id: timer.id, users: timer.users}));
    }


    return (
        <div className='create-timer'>
            <EditTimer setTimer={ updateTimer } timer={ timer } handleInputChange={ handleInputChange } onSubmit={ onStart } getTimeFromNum={ getTimeFromNum } />
            <ActionButton 
                name={stateConverter()}
                value={stateConverter().toUpperCase()}
                onClick={
                    timer.time === null
                        ? onStart
                        : timer.time === 0
                            ? onDone
                            : timer.isPaused
                                ? onResume
                                : onPause 
                }
            />
        </div>
    );
}

SetTimer.propTypes = {
    addTimer: PropTypes.func.isRequired,
    editTimer: PropTypes.func.isRequired,
    getTimeFromNum: PropTypes.func.isRequired,
}

export default SetTimer;