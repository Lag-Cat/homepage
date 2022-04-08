import React, { useState } from 'react'
import { useDispatch } from 'umi';

const BaseLayout: React.FC = (props) => {
    // let dispatch = useDispatch();
    // dispatch({
    //     type: "settings/initBackgroundSettings",
    //     payload: JSON.parse((localStorage.getItem("CONFIG_BACKGROUND") as string))
    // })

    // // return <>{props.children}</>

    return <>{props.children}</>
}

export default BaseLayout