import React, {useEffect, Dispatch} from "react";
import "./App.css";

interface IProps {
    message: string,
    show: boolean,
    setShow: Dispatch<React.SetStateAction<boolean>>
}

const Snackbar: React.FC<IProps> = ({ message, show, setShow }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className={`snackbar ${show ? "show" : ""}`}>
            <div className="snackbar-message">{message}</div>
        </div>
    );
};

export default Snackbar;
