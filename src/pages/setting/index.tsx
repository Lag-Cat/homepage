import Field from '@/components/input/field/field'
import React, { useState } from 'react'
import { useDispatch, useSelector, } from 'dva'
import { IndexModels } from '@/models';
import { getTimestamp } from '@/utils/config';


// interface Props extends ConnectProps {
//     settingState: SettingsModelState
// }
interface Props { }

const SettingPage: React.FC<Props> = (props) => {
    let [settings, setSettings] = useState<any>("");
    let dispatch = useDispatch();

    let count = useSelector<IndexModels>(state => state.settings.test)
    return <>
        <div>
            {/* <Field title="" type="text" value={settings} /> */}
            {(count as string)}
            <button
                onClick={() => dispatch({
                    type: "settings/saveBackgroundSettings",
                    payload: "asd" + getTimestamp()
                })}>aaa</button>
        </div>
    </>
}

export default SettingPage;