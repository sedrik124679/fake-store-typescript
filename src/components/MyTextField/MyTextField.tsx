import React, {FC} from 'react';
import {FieldError, RegisterOptions, UseFormRegister} from "react-hook-form";
import {Form} from "react-bootstrap";

interface MyTextFieldProps {
    name: string,
    label?: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any
}

const MyTextField: FC<MyTextFieldProps> = ({ name, label, register, registerOptions, error, ...props }) => {
    return (
        <Form.Group controlId={name + "-input"} className={'mb-3'}>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                {...props}
                isInvalid={!!error}
                {...register(name, registerOptions)}
            />
            <Form.Control.Feedback type={'invalid'}>{error?.message}</Form.Control.Feedback>
        </Form.Group>
    );
};

export default MyTextField;
