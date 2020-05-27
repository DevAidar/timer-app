import React, { useState }   from 'react';
import PropTypes             from 'prop-types';

import InputField            from '../InputField/InputField';
import SubmitButton          from '../SubmitButton/SubmitButton';

const LoginForm = ({ users, updateUserStore, userStore }) => {
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
            <form className = 'login-form'
                onSubmit={event => {
                    event.preventDefault();
                    doLogin();
                }}
            >

                <label id='sign-in-label' className='sign-in-label'>Sign in</label>
                <InputField 
                    type = 'text'
                    name = 'username'
                    placeholder = 'Username'
                    value = { loginState.username ? loginState.username : '' }
                    onChanges = { handleInputChange }
                /> 

                <InputField 
                    type = 'password'
                    name = 'password'
                    placeholder = 'Password'
                    value = { loginState.password ? loginState.password : '' }
                    onChanges = { handleInputChange }
                /> 
                <SubmitButton 
                    text = 'Login'
                    disabled = { loginState.buttonDisabled }
                /> 
            </form>
            <label id='sign-up-label' className='sign-up-label'>Don't have an account? <a className='sign-up-button' onClick={() => doSignUp()}>Sign up</a></label>
        </div>
    );
}

LoginForm.propTypes = {
    users: PropTypes.array.isRequired,
    updateUserStore: PropTypes.func.isRequired,
    userStore: PropTypes.object.isRequired,
};

export default LoginForm;