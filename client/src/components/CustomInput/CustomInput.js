import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export default class CustomInput extends Component {
    render() {
        const { input: { value, onChange, onBlur, name }, id, type, className, placeholder, label } = this.props;
        let icon = "user";

        switch (name) {
            case "password":
                icon = "lock";
                break;
            case "email":
                icon = "envelope";
                break;
            default:
        }
        return (
            <div className="form-group has-error has-feedback" key={name}>
                <label htmlFor={id} className="control-label"></label>
                { (type === "password" || type === "text") ?
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"> <i className={`fa fa-${icon}`}></i> </span>
                        </div>
                        <input
                            name={name}
                            id={id}
                            placeholder={placeholder}
                            className={className}
                            type={type}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                        />
                    </div>
                    :
                    <Form.Group>
                        {label && <Form.Label>{label}</Form.Label>}
                        <Form.Control
                            name={name}
                            id={id}
                            placeholder={placeholder}
                            className={className}
                            type={type}
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}

                            {...this.props}
                        />
                    </Form.Group>
                }
            </div>
        );
    }
}