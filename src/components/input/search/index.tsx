import React, { useState } from 'react'
import classNames from 'classnames';
import './index.less'
interface Props {
    className?: string;
    style?: React.CSSProperties;
    searchText?: string;
    onSearch?: (searchText?: string) => any;
    onChange?: (searchText?: string) => any;
    onMouseEnter?: () => any;
    onMouseLeave?: () => any;
    onFieldFoucs?: () => any;
    onFieldBlur?: () => any;
    value?: string;
    isShowBorder?: boolean
}

const Search: React.FC<Props> = (props) => {
    let [showBorder, setShowBorder] = useState<boolean>(false);
    let onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange && props.onChange(e.target.value)
    }

    return <div
        onMouseEnter={() => { props.isShowBorder || setShowBorder(true); props.onMouseEnter && props.onMouseEnter() }}
        onMouseLeave={() => { props.isShowBorder || setShowBorder(false); props.onMouseLeave && props.onMouseLeave() }}
        style={{ ...props.style }}
        className={classNames('bui-searchBox', props.className, showBorder && "bui-searchBox-active")}
    >
        <input
            className='bui-searchBox-field'
            type="text"
            value={props.value}
            onChange={onChange}
            onFocus={() => { props.onFieldFoucs && props.onFieldFoucs() }}
            onBlur={() => { props.onFieldBlur && props.onFieldBlur() }}
        />
        <button
            className="bui-searchBox-button"
            type="button"
            onClick={() => props.onSearch && props.onSearch(props.value)}
        >
            {props.searchText}
        </button>
    </div>
}

export default Search;