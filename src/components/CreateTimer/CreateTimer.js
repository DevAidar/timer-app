import React        from 'react';
import PropTypes    from 'prop-types';

import EditTimer    from '../EditTimer/EditTimer';
import ActionButton from '../ActionButton/ActionButton';
import LikeButton   from '../LikeButton/LikeButton';

import './CreateTimer.css';

const CreateTimer = ({ timer, onAction, handleInputChange, getIsLiked, getTimeFromNum }) => (
    <div className='create-timer'>
        <EditTimer id={`create-timer-0`} className='edit-create-timer' setTimer={ onAction.onChange } timer={ timer } handleInputChange={ handleInputChange } onSubmit={ onAction.onStart } getTimeFromNum={ getTimeFromNum } showColumns={ false } />
        <div className='create-timer-action-buttons'>
            <ActionButton 
                className='create-timer-action-button big'
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
                disabled={ timer.defaultTime === '000000' }
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
                className='create-timer-action-button small'
                name='new'
                value='NEW'
                type='button'
                disabled={ timer.defaultTime === '000000' }
                timer={ timer }
                onClick={ onAction.onNew }
            />
            <ActionButton 
                className='create-timer-action-button big'
                name='reset'
                value='RESET'
                type='button'
                disabled={ timer.time !== 0 && (!timer.isStarted || !timer.isPaused) }
                timer={ timer }
                onClick={ onAction.onReset }
            />
            <LikeButton 
                className='create-timer-action-button small'
                id={ 0 }
                timer={ timer }
                onChange={ onAction.onLike }
                isLiked={ timer.isSaved.length > 0 && getIsLiked(timer) }
            />
        </div>
    </div>
);

CreateTimer.propTypes = {
    timer: PropTypes.object.isRequired,
    onAction: PropTypes.object.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    getIsLiked: PropTypes.func.isRequired,
    getTimeFromNum: PropTypes.func.isRequired,
}

export default CreateTimer;