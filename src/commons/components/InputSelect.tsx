import Form from "react-bootstrap/Form";
import React, {ChangeEvent} from "react";

interface InputSelectProps {
    title: string;
    name: string;
    value: string;
    options: string[];
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({title,name,value, options, onChange}) => {
    return (
        <Form.Group className="mb-1">
            <Form.Label htmlFor={`input${title}`}>{title}</Form.Label>
            <Form.Select id={`input${title}`} name={name} value={value} aria-label="Default select example" onChange={onChange}>
                {options.map((props, idx) => {
                    return <option key={props + idx} value={props}>{props}</option>
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default InputSelect;