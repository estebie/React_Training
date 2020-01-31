import React from 'react';

import SingIn from '../../components/sign-in/sign-in.component';

import './sign-up-and-sign-in.styles.scss';
import SignUp from '../../components/sign-up/sign-up.component';

const SignInAdnSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SingIn/>
        <SignUp/>
    </div>
);

export default SignInAdnSignUpPage;