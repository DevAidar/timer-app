import React, { useState, useRef }  from 'react';
import PropTypes                    from 'prop-types';

import TimeOutput                   from '../TimeOutput/TimeOutput';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';

import './EditTimer.css';

const EditTimer = ({ id, className, setTimer, timer, handleInputChange, onSubmit, getTimeFromNum, showColumns }) => {
    /**
     * Helper function to update timer if user clicks on time
     * Updates index parameter
     * @param { number } index 
     */
    const onClick = (newIndex) => {    
        if (showColumns) {
            setTimer({
                ...timer,
                isPaused: !timer.isPaused,
                isStarted: true,
                time: timer.time === 0 ? null : timer.time,
            })
        } else {
            if (!timer.isStarted && index === null) {
                setTimer({
                    ...timer,
                    isPaused: true,
                    isStarted: false,
                })
                setIndex(-1);
                console.log(-1);
                return -1;
            }
            if (!timer.isPaused && timer.time > 0) {
                setTimer({
                    ...timer,
                    defaultTime: getTimeFromNum(timer.time),
                    isPaused: true,
                    isStarted: false,
                });
                setIndex(-1);
                console.log(-1);
                return -1;
            } 
            if (timer.time === 0) 
                setTimer({
                    ...timer,
                    isPaused: true,
                    isStarted: false,
                    time: null,
                });
            setIndex(Math.max(newIndex, timer.defaultTime.split('').findIndex(num => num !== '0') - 1));   
            console.log(Math.max(newIndex, timer.defaultTime.split('').findIndex(num => num !== '0') - 1));  
        }         
    }

    const handleKeyPress = event => {
        if (!showColumns) {
            if (event.key === 'ArrowLeft') {
                onClick(Math.max(0, index - 1));
            }
            if (event.key === 'ArrowRight') {
                onClick(Math.min(5, index + 1));
            }
            if (event.key === 'Backspace') {
                handleInputChange('del', index, timer);
            }
            if (event.key === 'Delete') {
                handleInputChange('del', Math.min(5, index + 1), timer);
                setIndex(Math.min(5, index + 1));
            }
            if (event.key === 'ArrowUp') {
                setIndex(handleInputChange('up', index, timer));
            }
            if (event.key === 'ArrowDown') {
                setIndex(handleInputChange('down', index, timer));
            }
            if (event.key === ' ') {
                setIndex(null);
                if (timer.id === null)
                    onSubmit(timer);
                else 
                    setTimer({
                        ...timer,
                        isPaused: !timer.isPaused,
                        isStarted: true,
                        time: timer.time === 0 ? null : timer.time,
                    })
            }
        }
    }

    const [index, setIndex] = useState(null);
    const ref = useRef();
    useOnClickOutside(ref, () => {
        if (index !== null) {
            setIndex(null);
            console.log(null);
            setTimer(timer);
        }
    })

    return (
        <form className='set-timer'
            onSubmit={ event => {
                event.preventDefault();
                if (timer.defaultTime === '000000')
                    return;
                setIndex(null);
                console.log(null);
                onSubmit(timer);
            }}
            ref={ ref }
        >
            <TimeOutput className={`set-timer ${ className }`} htmlFor={`${ id }-hiden-input`} onClick={ onClick } showColumns={ showColumns } index={ index } time={ 
                timer.time === null
                    ? timer.defaultTime 
                    : getTimeFromNum(timer.time)
            } />
            <input 
                id={`${ id }-hiden-input`}
                className='hidden-input'
                type='text'
                value={''}
                onKeyDown={e => handleKeyPress(e)}
                onChange={e => setIndex(handleInputChange(e, index, timer))}
            />
        </form>
    );
}

EditTimer.propTypes = {
    id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    setTimer: PropTypes.func.isRequired, 
    timer: PropTypes.object.isRequired, 
    handleInputChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired, 
    getTimeFromNum: PropTypes.func.isRequired,
    showColumns: PropTypes.bool.isRequired,
}

export default EditTimer;