import React from 'react';
import { Dropdown } from 'semantic-ui-react';


const DropdownMenu = (props) => {
    const {options, placeholder,value, ...others} = props;
    const city = sessionStorage.getItem('city')
    return(
        <Dropdown
            placeholder={placeholder}
            search
            selection
            options={options}
            {...others}
             defaultValue={value==='city'?city:value}
        />
    )
}

export default DropdownMenu; 