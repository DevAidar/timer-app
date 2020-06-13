import React, { useState }  from 'react';
import PropTypes            from 'prop-types';

import EditTimer            from '../EditTimer/EditTimer';
import ActionButton         from '../ActionButton/ActionButton';
import LikeButton           from '../LikeButton/LikeButton';

import arrowButton          from '../../images/icon-arrow.png';

import './ListTimers.css';

const ListTimers = ({ name, onAction, handleInputChange, getIsLiked, getTimeFromNum, timers }) => {
    const [show, setShow] = useState(false);

    /**
     * Helper function that toggles show
     */
    const onChange = () => {
        setShow(!show);
    }

    return (
        <div className='list-timers'>
            { name === 'show' 
                ? <></>
                : <>
                    <input
                        id={`${ name }-timers-checkbox`} 
                        className={`${ name }-timers-checkbox hidden-input`}
                        checked={ show }
                        onChange={() => onChange()}
                        type='checkbox'
                    />
                    <label
                        id={`${ name }-timers-checkbox-label`} 
                        className={`${ name }-timers-checkbox-label timers-checkbox-label`}
                        htmlFor={`${ name }-timers-checkbox`} 
                    >
                        <div 
                            id={`${ name }-timers-div`} 
                            className={`timers-div`}
                        >
                            <label 
                                id={`${ name }-timers-label`} 
                                className={`${ name }-timers-label`}
                                htmlFor={`${ name }-timers-checkbox`} 
                            >
                                <span className={'timers-label'}>{ name[0].toUpperCase() + name.substr(1) }</span>
                            </label>
                            <img 
                                id={`active-timers-image`} 
                                className={`active-timers-image${show ? ' expand' : ''}`}
                                src={ arrowButton }
                                alt={'arrow'}
                            />
                        </div>
                    </label>
                </>
            }
            
            <div className={`active-timers${show || name === 'show' ? '' : ' is-hidden'}${name === 'show' ? '-show' : ''}`}>
                {timers.map(timer => (
                    <div key={`active-timer-${timer.id}`} className={`list-timer${name === 'show' ? '-show' : ''}`}>
                        <EditTimer 
                            id={`${ name }-timer-${ timer.id === null ? 0 : timer.id }`}
                            className={`edit-${ name }-list-timer`} 
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
                                <div className='list-timers-action-buttons' >
                                    <ActionButton 
                                        name={
                                            timer.isStarted
                                                ? timer.time === 0
                                                    ? 'list-done'
                                                    : timer.isPaused
                                                        ? 'list-resume'
                                                        : 'list-pause'
                                                : 'list-start'
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
                                        disabled={ false }
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
                                        name='list-new'
                                        value='NEW'
                                        type='button'
                                        disabled={ timer.defaultTime === '000000' }
                                        timer={ timer }
                                        onClick={ onAction.onNew }
                                    />
                                    <ActionButton
                                        name={
                                            timer.isStarted
                                                ? 'list-stop'
                                                : 'list-clear'
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
                                        name='list-reset'
                                        value='RESET'
                                        type='button'
                                        disabled={ timer.time !== 0 && (!timer.isStarted || !timer.isPaused) }
                                        timer={ timer }
                                        onClick={ onAction.onReset }
                                    />
                                </div>

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
        </div>
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