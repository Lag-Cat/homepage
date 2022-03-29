import React, { useEffect, useState } from 'react'
import Search from '../../components/input/search'
import Icon from '../../components/icon/icon'
import './index.less'
import '../../asset/iconfont/font_3250542_jbiasqyb1vk/iconfont.css'
import Field from '@/components/input/field/field'
import { getConfig, getTimestamp, saveNavigatorConfig } from '@/utils/config'
import { IInitNavigatorItem, initNavigatorItem } from '@/utils/init'
import Modal, { confirm as Confirm } from '@/components/modal/modal/modal'
import Badge from '../../components/badge/badge/badge'
import _Tab from '../../components/tab/tab/index'
import axios from 'axios'
import JsonP from 'jsonp'

const { Tab, TabItem } = _Tab
const backgroundStyle = {
    background: `url(${require('../../asset/img/bg.jpg')})`
}

const logoStyle = {
    height: "200px",
    width: "200px",
}

const Home: React.FC = () => {
    let [searchText, setSearchText] = useState<string>("")
    let [targetUrl, setTargetUrl] = useState<string>("");
    let [faviconUrl, setFaviconUrl] = useState<string>("");
    let [modal, setModal] = useState<boolean>(false);
    let [navigator, setNavigator] = useState<INavigatorConfig>(getConfig('CONFIG_NAVIGATOR'));
    let [isEditting, setIsEditting] = useState<boolean>(false);
    let [active, setActive] = useState<number>(0);
    useEffect(() => {
        saveNavigatorConfig(navigator)
    }, [navigator])

    useEffect(() => {
        getQuickQueryList(searchText)
    }, [searchText])

    return <div className='homepage' style={{ ...backgroundStyle }}>
        <div className='toolbar'>

        </div>
        <div className="main-content">
            <div className={'logo'} style={{ ...logoStyle }}></div>
            <div className='searchBox'>
                <Search
                    searchText='搜索'
                    value={searchText}
                    onChange={val => setSearchText(val ? val : "")}
                    onKeyDown={event => {
                        if (event.key === 'Enter')
                            window.open(`https://www.baidu.com/s?wd=${searchText}`, '_blank')
                    }}
                    onSearch={
                        () => window.open(`https://www.baidu.com/s?wd=${searchText}`, '_blank')
                    }
                />
                <div>
                    <ul>
                        <li></li>
                    </ul>
                </div>
            </div>
            <Tab active={active} onTabChange={(key) => setActive(key)} className="navigator-content" mode="line" >
                {
                    navigator.data.map((group, key) => {
                        return <TabItem title={group.name} key={key}>
                            <div className="navigator">
                                {
                                    group.items.map((item, key1) => {
                                        return <Badge
                                            className="navigator-item"
                                            dot={isEditting && <div style={{ fontSize: "13px", lineHeight: "10px" }}>×</div>}
                                            onClick={() => {
                                                setNavigator(removeNavigatorItem(navigator, item.id, group.id))
                                            }}
                                            key={key1}
                                        >
                                            <Icon style={{ borderRadius: "10px" }} src={item.favicon} onClick={() => { window.open(item.target, '_blank') }} />
                                        </Badge>
                                    })
                                }
                                <Icon className="navigator-item" icon='icon-jiahao' onClick={() => setModal(true)} />
                            </div>
                        </TabItem>
                    })
                }
            </Tab>
        </div>
        <Confirm
            visible={modal}
            title={"新增"}
            onConfirm={() => {
                setNavigator(setNavigatorItem(navigator, { target: targetUrl, favicon: faviconUrl }, 1))
                setModal(false)
            }}
            onClose={() => setModal(false)}
            onCancel={() => setModal(false)}
        >
            <>
                <div className='iconfont icon-jiahao'></div>
                <Field title="目标链接" placeholder='目标链接' value={targetUrl} onChange={(val) => { setTargetUrl(val) }} />
                <Field title="图标链接" placeholder='图标链接(默认为favicon)' value={faviconUrl} onChange={(val) => { setFaviconUrl(val) }} />
            </>
        </Confirm>
        <div className='tool-bar'>
            <Icon className='setting' icon='icon-setting-fill' onClick={() => setIsEditting(!isEditting)} />
        </div>
    </div >
}

const setNavigatorItem: (navi: INavigatorConfig, item: IInitNavigatorItem, groupid: number) => INavigatorConfig = (navi, item, groupid) => {
    return {
        ...navi,
        data: [
            ...navi.data.map(naviItem => {
                if (naviItem.id === groupid) {
                    naviItem.items.push(initNavigatorItem({ target: item.target, favicon: item.favicon }))
                }
                return naviItem
            })
        ]
    }
}

const removeNavigatorItem: (navi: INavigatorConfig, itemid: number, groupid: number) => INavigatorConfig = (navi, itemid, groupid) => {
    return {
        ...navi,
        data: [
            ...navi.data.map(naviItems => {
                if (naviItems.id === groupid) {
                    naviItems.items = naviItems.items.filter(naviItem => naviItem.id !== itemid)
                }
                return naviItems
            })
        ]
    }
}

const getQuickQueryList = (searchText: string) => {
    const cb = `jQuery${getTimestamp()}`
    const url = `https://www.baidu.com/sugrec?prod=pc&from=pc_web&wd=${encodeURIComponent(searchText)}&cb=${cb}`
    return new Promise((resolve, reject) => {
        // fetch(url, { method: 'get' }).then((response) => {
        //     console.log(response);
        //     resolve(response)
        // })
        (window as any)[cb] = (val: any) => {
            console.log(val, "test");
            delete (window as any)[cb]
        }
        JsonP(url, {}, (response) => {
            console.log("test2");
            resolve(response)
        })
    })
}

export default Home;