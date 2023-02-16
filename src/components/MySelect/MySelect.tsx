import React, {FC} from 'react';
import {Form} from "react-bootstrap";

interface SelectProps {
    label: string,
    value: string
}

interface MySelectProps {
    onChange: (prev: string) => void,
    values: SelectProps[],
    defaultValue: string,
    styles?: {},
}

const MySelect: FC<MySelectProps> = ({ onChange, values, styles, defaultValue }) => {
    return (
        <Form.Select onChange={(e) => onChange(e.target.value)}
                     style={styles}
                     value={defaultValue}
        >
            {values.map(value => {
                return <option key={value.label + value.value}
                               value={ value.value }
                >{ value.label }</option>
            })}
        </Form.Select>
    );
};

export default MySelect;
