import React, {FC} from 'react';
import {Alert} from "react-bootstrap";

interface MyAlertProps {
    variant: string,
    message: string | null,
    onClose: () => void
}

const MyAlert: FC<MyAlertProps> = ({ onClose, variant, message }) => {
    return (
        <Alert dismissible
               onClose={onClose}
               variant={variant}
        >
            {message && message}
        </Alert>
    );
};

export default MyAlert;
