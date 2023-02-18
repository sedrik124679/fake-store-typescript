import React, {FC, useCallback, useState} from 'react';
import {Button, Form, Modal, OverlayTrigger, Popover} from "react-bootstrap";
import {useForm} from "react-hook-form";
import MyTextField from "../MyTextField/MyTextField";
import {fakeStoreAPI} from "../../services/fakeStore";
import MyAlert from "../MyAlert/MyAlert";
import {ILoginCredentials} from "../../models/IAuthorization";
import {AiFillQuestionCircle} from "react-icons/ai";


interface AuthorizationModalProps {
    show: boolean,
    handleClose: () => void,
    setIsAuthorize: (prev: string) => void
}

const popover = (
    <Popover id="popover-basic">
        <Popover.Header as="h3">Ready data</Popover.Header>
        <Popover.Body>
            Username: johnd
        </Popover.Body>
        <Popover.Body>
            Password: m38rmF$
        </Popover.Body>
    </Popover>
);

const AuthorizationModal: FC<AuthorizationModalProps> = ({show, handleClose, setIsAuthorize}) => {
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ILoginCredentials>();
    const [alreadyHaveAccount, setAlreadyHaveAccount] = useState<boolean>(true);
    const [userLogin, response] = fakeStoreAPI.useAuthLoginMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    const handleAlertClose = useCallback(() => {
        setShowAlert(false);
        setErrorMessage(null);
    }, []);


    const onSubmit = async (data: ILoginCredentials) => {
        const response = await userLogin(data);
        if ("data" in response) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', '1');
            setIsAuthorize(response.data.token);
            handleClose();
        }
        if ("error" in response) {
            if ("data" in response.error) {
                setErrorMessage(response.error.data as string);
                setShowAlert(true);
            }
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            {showAlert && <MyAlert variant={'danger'}
                                   message={errorMessage}
                                   onClose={handleAlertClose}
            />}
            <Modal.Header closeButton>
                <Modal.Title>{alreadyHaveAccount ? 'Log In' : 'Sign Up'}</Modal.Title>
                <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                    <span style={{cursor: 'pointer', marginLeft: '10px'}}><AiFillQuestionCircle size={24} /></span>
                </OverlayTrigger>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <MyTextField
                        name={'username'}
                        placeholder={'Username...'}
                        register={register}
                        label={'Username'}
                        type={'text'}
                        registerOptions={{required: 'Required'}}
                        error={errors.username}
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
