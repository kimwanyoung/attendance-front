import Form from 'react-bootstrap/Form';
import React, {ChangeEvent} from "react";

interface InputFormProps {
    title: string;
    name: string;
    value: string;
    inputType: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({title,name, value, inputType, onChange}) => {
    return (
        <Form.Group className="mb-1">
            <Form.Label htmlFor={`input${title + inputType}`}>{title}</Form.Label>
            <Form.Control
                type={inputType}
                id={`input${title + inputType}`}
                name={name}
                value={value}
                onChange={onChange}
            />
        </Form.Group>
    )
}

export default InputForm;