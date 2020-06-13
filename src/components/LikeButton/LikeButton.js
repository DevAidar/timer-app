import React            from 'react';
import PropTypes        from 'prop-types';

import likedButton      from '../../images/icon-liked.png'
import notLikedButton   from '../../images/icon-not-liked.png'

import './LikeButton.css';

const LikeButton = ({ id, timer, onChange, isLiked }) => (
    <>
        <input
            id={`like-${id}-checkbox`} 
            className={`like-checkbox${isLiked ? ' is-active' : ''} hidden-input`}
            checked={ isLiked }
            onChange={() => onChange(timer)}
            type='checkbox'
        />
        <label
            id={`like-${id}-label`} 
            className={`like-label${isLiked ? ' is-active' : ''}`}
            htmlFor={`like-${id}-checkbox`} 
        >
            <img 
                id={`like-${id}-button`} 
                className={`like-button${id === 0 ? '' : '-list'}${isLiked ? ' is-active' : ''}`}
                src={isLiked ? likedButton : notLikedButton}
                alt={isLiked ? 'liked' : 'not liked'}
            />
        </label>
    </>
);

LikeButton.propTypes = {
    id: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired, 
    isLiked: PropTypes.bool.isRequired,
}

export default LikeButton;

