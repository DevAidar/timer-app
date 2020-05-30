import React, { useState }  from 'react';
import PropTypes            from 'prop-types';

import EditTimer            from '../EditTimer/EditTimer';
import ActionButton         from '../ActionButton/ActionButton';
import LikeButton           from '../LikeButton/LikeButton';

import arrowButton          from '../../Images/icon-arrow.png';

const ListTimers = ({ name, onAction, handleInputChange, getIsLiked, getTimeFromNum, timers }) => {
    const [show, setShow] = useState(true);

    /**
     * Helper function that toggles show
     */
    const onChange = () => {
        setShow(!show);
    }

    return (
        <>
            { name === 'show' 
                ? <></>
                : <>
                    <input
                        id={`${ name }-timers-checkbox`} 
                        className={`${ name }-timers-checkbox${show ? ' is-active' : ''}`}
                        checked={ show }
                        onChange={() => onChange()}
                        type='checkbox'
                    />
                    <label
                        id={`${ name }-timers-checkbox-label`} 
                        className={`${ name }-timers-checkbox-label${show ? ' is-active' : ''}`}
                        htmlFor={`${ name }-timers-checkbox`} 
                    >
                        <div 
                            id={`${ name }-timers-div`} 
                            className={`${ name }-timers-div${show ? ' is-active' : ''}`}
                        >
                            <label 
                                id={`${ name }-timers-label`} 
                                className={`${ name }-timers-label${show ? ' is-active' : ''}`}
                                htmlFor={`${ name }-timers-checkbox`} 
                            >
                                <h2>{ name[0].toUpperCase() + name.substr(1) }</h2>
                            </label>
                            <img 
                                id={`active-timers-image`} 
                                className={`active-timers-image`}
                                src={ arrowButton }
                                alt={'arrow'}
                            />
                        </div>
                    </label>
                </>
            }
            
            <div className={`active-timers${show || name === 'show' ? ' is-active' : ''}`}>
                {timers.map(timer => (
                    <div key={`active-timer-${timer.id}`}>
                        <EditTimer 
                            id={`${ name }-timer-${ timer.id === null ? 0 : timer.id }`} 
                            setTimer={ onAction.onChange } 
                            timer={ timer } 
                            handleInputChange={ handleInputChange } 
                            onSubmit={ onAction.onStart } 
                            getTimeFromNum={ getTimeFromNum } 
                            showColumns={ name === 'show' } 
                        />
                        { name === 'show' 
                            ? <></>
                            : <>
                                <ActionButton 
                                    name={
                                        timer.isStarted
                                            ? timer.time === 0
                                                ? 'done'
                                                : timer.isPaused
                                                    ? 'resume'
                                                    : 'pause'
                                            : 'start'
                                    }
                                    value={
                                        timer.isStarted
                                            ? timer.time === 0
                                                ? 'DONE'
                                                : timer.isPaused
                                                    ? 'RESUME'
                                                    : 'PAUSE'
                                            : 'START'
                                    }
                                    type='button'
                                    timer={ timer }
                                    onClick={
                                        timer.isStarted
                                            ? timer.time === 0
                                                ? onAction.onDone
                                                : timer.isPaused
                                                    ? onAction.onResume
                                                    : onAction.onPause
                                            : onAction.onStart
                                    }
                                />
                                <ActionButton
                                    name='new'
                                    value='NEW'
                                    type='button'
                                    disabled={ timer.defaultTime === '000000' }
                                    timer={ timer }
                                    onClick={ onAction.onNew }
                                />
                                <ActionButton
                                    name={
                                        timer.isStarted
                                            ? 'stop'
                                            : 'clear'
                                    }
                                    value={
                                        timer.isStarted
                                            ? 'STOP'
                                            : 'CLEAR'
                                    }
                                    type='button'
                                    disabled={ false }
                                    timer={ timer }
                                    onClick={ onAction.onStop }
                                />
                                <ActionButton 
                                    name='reset'
                                    value='RESET'
                                    type='button'
                                    disabled={ timer.time !== 0 && (!timer.isStarted || !timer.isPaused) }
                                    timer={ timer }
                                    onClick={ onAction.onReset }
                                />
                                <LikeButton 
                                    id={ timer.id === null ? 0 : timer.id }
                                    timer={ timer }
                                    onChange={ onAction.onLike }
                                    isLiked={ timer.isSaved.length > 0 && getIsLiked(timer) }
                                />
                            </>
                        }
                    </div>
                ))}
            </div>
        </>
    );
}

ListTimers.propTypes = {
    name: PropTypes.string.isRequired,
    onAction: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    getIsLiked: PropTypes.func.isRequired,
    getTimeFromNum: PropTypes.func.isRequired,
    timers: PropTypes.array.isRequired,
}

export default ListTimers;