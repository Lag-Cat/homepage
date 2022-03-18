import React from 'react'
import './index.less'
interface Props {
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    onChange?: (value: string) => any;
    value?: string | number;
    title?: string;
}
declare type TypeOf = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"

const Field: React.FC<Props> = (props) => {
    return <div className='bui-field'>
        <div className='bui-field-title'>{props.title}</div>
        <input
            className='bui-field-input'
            type={props.type}
            placeholder={props.placeholder}
            onChange={(e) => props.onChange && props.onChange(parseValue(e.target.value, props.value ? typeof (props.value) : 'string'))}
            value={props.value}
        />
    </div>
}

const parseValue = (value: any, type: TypeOf) => {
    switch (type) {
        case "string":
            return value.toString();
        case "number":
            return parseFloat(value);
        case "boolean":
            if (value === "true")
                return true;
            if (value === "false")
                return false;
            break;
        default:
            return value.toString();
    }
}

export default Field;