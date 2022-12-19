import { useState, useContext } from 'react';
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signinAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import { UserContext } from '../../contexts/user.context';

import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signinAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
                alert('email or password is incorrect');
            }
        }

    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className='sign-up-container'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label={'Email'} name='email' type='email' required onChange={handleChange} value={email} />
                <FormInput label={'Password'} name='password' type='password' required onChange={handleChange} value={password} />
                <div className='buttons-container'>
                    <Button buttonType={'default'} type='submit'> Sign in</Button>
                    <Button buttonType={'google'} type='button' onClick={signInWithGoogle}> Google sign in</Button>
                </div>

            </form>
        </div>
    )
}


export default SignInForm;