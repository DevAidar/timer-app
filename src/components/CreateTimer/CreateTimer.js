import React        from 'react';
import PropTypes    from 'prop-types';

import EditTimer    from '../EditTimer/EditTimer';
import ActionButton from '../ActionButton/ActionButton';
import LikeButton   from '../LikeButton/LikeButton';

const CreateTimer = ({ timer, onAction, handleInputChange, getIsLiked, getTimeFromNum }) => (
    <div className='create-timer'>
        <EditTimer id={`create-timer-0`} setTimer={ onAction.onChange } timer={ timer } handleInputChange={ handleInputChange } onSubmit={ onAction.onStart } getTimeFromNum={ getTimeFromNum } showColumns={ false } />
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
        <LikeButton 
            id={ 0 }
            timer={ timer }
            onChange={ onAction.onLike }
            isLiked={ timer.isSaved.length > 0 && getIsLiked(timer) }
        />
        <ActionButton 
            name='reset'
            value='RESET'
            type='button'
            disabled={ timer.time !== 0 && (!timer.isStarted || !timer.isPaused) }
            timer={ timer }
            onClick={ onAction.onReset }
        />
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