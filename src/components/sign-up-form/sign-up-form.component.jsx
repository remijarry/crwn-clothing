import React from "react";
import { useState, useContext } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handlechange = (event) => {
        const { name, value } = event.target;

        setFormFields({
            ...formFields,
            [name]: value,
        });
    };

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        // check password against confirmPassword
        if (password.length === 0 || confirmPassword.length === 0) return;

        if (password !== confirmPassword) alert("passwords don't match");
        // check if user exists

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/email-already-in-use') {
                alert('email already in use.')
            }
            console.log('user creation encountered an error', error);
        }


        // create user if not

    };

    return (
        <div className="sign-up-container">
            <h2>Dont' have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label={'Display Name'} name='displayName' type='text' required onChange={handlechange} value={displayName} />
                <FormInput label={'Email'} name='email' type='email' required onChange={handlechange} value={email} />
                <FormInput label={'Password'} name='password' type='password' required onChange={handlechange} value={password} />
                <FormInput label={'Confirm Password'} name='confirmPassword' type='password' required onChange={handlechange} value={confirmPassword} />

                <Button type='submit'> Sign up</Button>
            </form>
        </div >
    )
}

export default SignUpForm;