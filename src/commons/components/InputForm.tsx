import Form from 'react-bootstrap/Form';
import React, {ChangeEvent} from "react";

interface InputFormProps {
    title: string;
    name: string;
    value: string;
    inputType: string;
    required: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputForm: React.FC<InputFormProps> = ({required, title,name, value, inputType, onChange}) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={`input${title + inputType}`}>{title}</Form.Label>
            <Form.Control
                required={required}
                type={inputType}
                id={`input${title + inputType}`}
                name={name}
                value={value}
                onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">[{title}] 필수입니다!</Form.Control.Feedback>
        </Form.Group>
    )
}

export default InputForm;