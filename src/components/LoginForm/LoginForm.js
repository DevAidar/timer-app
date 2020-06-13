import React, { useState }   from 'react';
import PropTypes             from 'prop-types';

import InputField            from '../InputField/InputField';
import SubmitButton          from '../SubmitButton/SubmitButton';

import logo                  from '../../images/LMP_LOGO_DARK.png';

import './LoginForm.css';

const LoginForm = ({ users, updateUserStore, closeSignInWindow, userStore }) => {
    const initialLoginState = {
        username: '',
        password: '',
        buttonDisabled: false,
    }

    const [loginState, setLoginState] = useState(initialLoginState);

    /**
     * Handles input changes
     * @param {*} event 
     */
    const handleInputChange = event => {
		const { name, value } = event.target

		setLoginState({ ...loginState, [name]: value })
    }
    
    /**
     * Helper function that updates parent's userStore with root values
     */
    const doSignUp = () => {
        updateUserStore({...userStore, isSigningUp: true});
    }

    /**
     * Helper function that handles login functionality
     * [FUTURE] Add a proper error message
     */
    const doLogin = () => {
        if (!loginState.username || !loginState.password) {
            return false;
        }

        setLoginState({...loginState, buttonDisabled: true})

        if (!users.every(user => !(user.username === loginState.username && user.password === loginState.password))) {
            updateUserStore({
                ...userStore,
                loading: false,
                isLoggedIn: true,
                id: users.find(user => user.username === loginState.username && user.password === loginState.password).id,
            });
            setLoginState(initialLoginState);
            return true;
        } else {
            setLoginState({...loginState, password: '', disabled: false});
            console.log('Username or Password are incorrect');
            return false;
        }
    }


    return ( 
        <div id='login-screen' className="login-screen">
            <div className='close-button' onClick={() => closeSignInWindow()}>&times;</div>
            <img id='login-logo' className='login-logo' src={logo} alt='Logo' />
            <form className = 'login-form'
                onSubmit={event => {
                    event.preventDefault();
                    doLogin();
                }}
            >
                <InputField 
                    className='login-username-input login-input'
                    type = 'text'
                    name = 'username'
                    placeholder = 'Username'
                    value = { loginState.username ? loginState.username : '' }
                    onChanges = { handleInputChange }
                /> 

                <InputField 
                    className='login-password-input login-input'
                    type = 'password'
                    name = 'password'
                    placeholder = 'Password'
                    value = { loginState.password ? loginState.password : '' }
                    onChanges = { handleInputChange }
                /> 
                <SubmitButton 
                    className='login-button btn'
                    text = 'Log In'
                    disabled = { loginState.buttonDisabled }
                /> 
                <span id='sign-up-label' className='sign-up-label'>Don't have an account?</span>
                <a className='sign-up-label sign-up-button' onClick={() => doSignUp()}>Sign up</a>
            </form>
        </div>
    );
}

LoginForm.propTypes = {
    users: PropTypes.array.isRequired,
    updateUserStore: PropTypes.func.isRequired,
    closeSignInWindow: PropTypes.func.isRequired,
    userStore: PropTypes.object.isRequired,
};

export default LoginForm;