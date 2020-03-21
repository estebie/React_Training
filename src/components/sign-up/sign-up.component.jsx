import React, {useState} from 'react';

import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {signUpStart} from '../../redux/user/user.actions';
import { connect } from 'react-redux';

 const SignUp = ({signUpStart}) => {
    const [user, setUser] = useState({displayName:'', email:'', password:'', confirmPassword:''});
    const {displayName, email, password, confirmPassword} = user;

    const handleSubmit = async event => {
        event.preventDefault(); 

        if (password !== confirmPassword) {
            alert('Passwords dont match!');
            return;
        }
        signUpStart({displayName, email, password});

    }

    const handleChange = event => {
         const {name, value} = event.target;

         setUser({...user, [name]:value});
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have a account.</h2>
            <span>Sign up with your email and password.</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required>    
                </FormInput>
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='email'
                    required>
                </FormInput>
                <FormInput 
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required>
                </FormInput>
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required>
                </FormInput>
                <CustomButton type='submit'>
                    Register
                </CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
})
export default connect(null, mapDispatchToProps)(SignUp);