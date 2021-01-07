import React, { Component } from 'react';

export default class CustomInput extends Component {
    render() {
        const { input: { value, onChange, onBlur, name }, id, type, className, placeholder } = this.props;
        const icon = type === "password" ? "lock": "user";
    
        return (
            <div className="form-group has-error has-feedback" key={name}>
                <label htmlFor={id} className="control-label"></label>
                    { (type === "password" || "email") ?
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
                    }
            </div>
        );
    }
}