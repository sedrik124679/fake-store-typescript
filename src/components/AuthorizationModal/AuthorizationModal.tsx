import React, {FC, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {useForm} from "react-hook-form";
import MyTextField from "../MyTextField/MyTextField";

interface AuthorizationModalProps {
    show: boolean,
    handleClose: () => void
}

interface LoginCredentials {
    email: string,
    password: string
}

const AuthorizationModal: FC<AuthorizationModalProps> = ({show, handleClose}) => {

    const [errorText, setErrorText] = useState<string | null>(null);
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();
    const [alreadyHaveAccount, setAlreadyHaveAccount] = useState<boolean>(true);

    const onSubmit = async () => {

    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{alreadyHaveAccount ? 'Log In' : 'Sign Up'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <MyTextField
                        name={'email'}
                        placeholder={'email@gmail.com'}
                        register={register}
                        label={'Email'}
                        type={'email'}
                        registerOptions={{required: 'Required'}}
                        error={errors.email}
                    />
                    <MyTextField
                        name={'password'}
                        placeholder={'********'}
                        register={register}
                        label={'Password'}
                        type={'password'}
                        registerOptions={{required: 'Required'}}
                        error={errors.password}
                    />
                    <Button
                        type={'submit'}
                        disabled={isSubmitting}
                    >{alreadyHaveAccount ? 'Log In' : 'Sign Up'}</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: 'center'}}>
                <span
                    style={{cursor: 'pointer', color: '#0d6efd'}}
                    onClick={() => setAlreadyHaveAccount(!alreadyHaveAccount)}
                >
                    {alreadyHaveAccount
                        ? `Don't have an account?`
                        : `Already have an account?`
                    }
                </span>
            </Modal.Footer>
        </Modal>
    );
};

export default AuthorizationModal;
