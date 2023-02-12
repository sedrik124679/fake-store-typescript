import React, {FC} from 'react';
import {InputGroup, Form} from "react-bootstrap";

interface SearchBarProps {
    value: string,
    onChange: (event: string) => void,
}

const SearchBar: FC<SearchBarProps> = ({value, onChange}) => {
    return (
        <InputGroup className="mb-3 mt-3">
            <Form.Control
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder="Search..."
                aria-label="Search..."
                aria-describedby="Search..."
            />
        </InputGroup>
    );
};

export default SearchBar;
