import Field from '@/components/input/field/field'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'dva'
import { IAction, IndexModels } from '@/models';
import "./index.less"
import Tab from '@/components/tab/tab/tab';
import TabItem from '@/components/tab/tab/tabItem';
import Card from '@/components/panel/card/card';
import Icon from '@/components/icon/icon/icon';
import Image from '@/components/image/image/image'
import { getSizeByScale } from '@/utils/screen';
import { history } from 'umi'

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
            <span className="setting-icon setting-icon-home">
                <Icon icon="icon-shouye" onClick={() => {
                    history.push("/home")
                }} />
            </span>
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
                    <TabItem>
                        <Card className="background-settings">
                            <div className="preview">
                                <div className='preview-item'>
                                    <div className="preview-item-pic"><Image style={{ height: getSizeByScale(3, 4, 0, 250) + "px", width: "250px", objectFit: "cover" }} src={background.url} /></div>
                                    <div className="preview-item-desc">4:3</div>
                                </div>
                                <div className='preview-item'>
                                    <div className="preview-item-pic"><Image style={{ height: getSizeByScale(9, 16, 0, 250) + "px", width: "250px", objectFit: "cover" }} src={background.url} /></div>
                                    <div className="preview-item-desc">16:9</div>
                                </div>
                                <div className='preview-item'>
                                    <div className="preview-item-pic"><Image style={{ height: getSizeByScale(10, 16, 0, 250) + "px", width: "250px", objectFit: "cover" }} src={background.url} /></div>
                                    <div className="preview-item-desc">16:10</div>
                                </div>
                                <div className='preview-item'>
                                    <div className="preview-item-pic"><Image style={{ height: getSizeByScale(9, 21, 0, 250) + "px", width: "250px", objectFit: "cover" }} src={background.url} /></div>
                                    <div className="preview-item-desc">21:9</div>
                                </div>
                            </div>
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