import Field from '@/components/input/field/field'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'dva'
import { IAction, IndexModels } from '@/models';
import "./index.less"
import Tab from '@/components/tab/tab/tab';
import TabItem from '@/components/tab/tab/tabItem';
import Card from '@/components/panel/card/card';
import Icon from '@/components/icon/icon/icon';


// interface Props extends ConnectProps {
//     settingState: SettingsModelState
// }
interface Props { }

const SettingPage: React.FC<Props> = (props) => {
    let [actived, setActived] = useState(0);
    let [showSider, setShowSider] = useState(false)
    let dispatch = useDispatch();

    let background = useSelector<IndexModels, IBackground>(state => state.settings.background)

    let setNavigatorStyle = () => {
        if (window.innerWidth < 854) {
            setShowSider(false);
        } else {
            setShowSider(true);
        }
    }
    useState(() => {
        setNavigatorStyle();
    })
    useEffect(() => {
        window.addEventListener('resize', () => {
            setNavigatorStyle();

        })
    })
    return <div className='setting'>
        <div className='header'>
            {!showSider ? <Icon icon="icon-ego-menu" className="setting-icon" /> : null}
            <span className='title'>设置</span>
        </div>
        <div className='main-content'>
            {showSider ? <div className='sider'>
                <ul>
                    <li onClick={() => setActived(0)}>
                        <Icon icon='icon-jichu' className='l-icon' />
                        <span>基本设置</span>
                    </li>
                </ul>
            </div> : null}
            <div className="content">
                <Tab active={actived} onTabChange={(val) => setActived(val)} className="tabs" hideTabs>
                    <TabItem title="aa">
                        <Card>
                            <Field
                                title="背景图片"
                                type="text"
                                value={background.url}
                                onChange={(e) => dispatch<IAction<IBackground>>({
                                    type: "settings/saveBackgroundSettings",
                                    payload: {
                                        url: e
                                    }
                                })}
                            />
                        </Card>
                    </TabItem>
                </Tab>
            </div>
        </div>
    </div>

}

export default SettingPage;