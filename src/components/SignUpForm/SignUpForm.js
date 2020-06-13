import React, { useState }   from 'react';
import PropTypes             from 'prop-types';

import InputField            from '../InputField/InputField';
import SubmitButton          from '../SubmitButton/SubmitButton';

import logo                  from '../../images/LMP_LOGO_DARK.png';

import './SignUpForm.css';

const SignUpForm = ({ users, addUser, updateUserStore, closeSignInWindow, userStore }) => {
    const initialSignUpState = {
        username: '',
        password: '',
        password2: '',
        buttonDisabled: false,
    }

    const [signUpstate, setSignUpState] = useState(initialSignUpState);


    /**
     * Handles input changes
     * @param {*} event 
     */
    const handleInputChange = event => {
		const { name, value } = event.target

		setSignUpState({ ...signUpstate, [name]: value })
    }
    
    /**
     * Helper function that updates parent's userStore with root values
     */
    const doLogin = () => {
        updateUserStore({...userStore, isSigningUp: false});
    }
    
    /**
     * Helper function that handles sign up functionality
     * [FUTURE] Add a proper error message
     */
    const doSignUp = () => {
        if (!signUpstate.username || !signUpstate.password || !signUpstate.password2) {
            return false;
        }

        if (signUpstate.password !== signUpstate.password2) {
            console.log("Passwords did not match");
            setSignUpState({...signUpstate, password: '', password2: ''});
            return false;
        }

        setSignUpState({...signUpstate, buttonDisabled: true})

        if (!users.every(user => user.username === signUpstate.username)) {
            
            updateUserStore({
                ...userStore,
                loading: false,
                isSigningUp: false,
                isLoggedIn: true,
                id: addUser({
                    username: signUpstate.username,
                    password: signUpstate.password,
                }),
            });
            return true;
        } else {
            setSignUpState(initialSignUpState);
            return false;
        }
    }


    return ( 
        <div id='sign-up-screen' className="sign-up-screen">
            <div className='close-button' onClick={() => closeSignInWindow()}>&times;</div>
            <img id='sign-up-logo' className='sign-up-logo' src={logo} alt='Logo' />
            <form className = 'sign-up-form'
                onSubmit={event => {
                    event.preventDefault()
                    doSignUp();
                }}
            >
                <InputField 
                    className='sign-up-username-input sign-up-input'
                    type = 'text'
                    name = 'username'
                    placeholder = 'Username'
                    value = { signUpstate.username ? signUpstate.username : '' }
                    onChanges = { handleInputChange }
                /> 

                <InputField 
                    className='sign-up-password-input sign-up-input'
                    type = 'password'
                    name = 'password'
                    placeholder = 'Password'
                    value = { signUpstate.password ? signUpstate.password : '' }
                    onChanges = { handleInputChange }
                /> 

                <InputField 
                    className='sign-up-password-repeat-input sign-up-input'
                    type = 'password'
                    name = 'password2'
                    placeholder = 'Repeat Password'
                    value = { signUpstate.password2 ? signUpstate.password2 : '' }
                    onChanges = { handleInputChange }
                /> 

                <SubmitButton
                    className='sign-up-button btn' 
                    text = 'Sign Up'
                    disabled = { signUpstate.buttonDisabled }
                /> 
                <span id='log-in-label' className='log-in-label'>Have an account?</span>
                <a className='log-in-label log-in-button' onClick={() => doLogin()}>Log in</a>
            </form>
        </div>
    );
}

SignUpForm.propTypes = {
    users: PropTypes.array.isRequired,
    updateUserStore: PropTypes.func.isRequired,
    closeSignInWindow: PropTypes.func.isRequired,
    userStore: PropTypes.object.isRequired,
};

export default SignUpForm;