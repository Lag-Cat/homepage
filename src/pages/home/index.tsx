import React, { useEffect, useState } from 'react'
import Search from '../../components/input/search'
import IconButton from '../../components/icon/icon/iconButton'
import './index.less'
// import '../../asset/iconfont/font_3250542_jbiasqyb1vk/iconfont.css'
import Field from '@/components/input/field/field'
import { getConfig, getTimestamp, saveNavigatorConfig } from '@/utils/config'
import { IInitNavigatorItem, initNavigatorItem, intiNavigatorGroup } from '@/utils/init'
import Modal, { confirm as Confirm } from '@/components/modal/modal/modal'
import Badge from '../../components/badge/badge/badge'
import _Tab from '../../components/tab/tab/index'
import JsonP from 'jsonp'
import Icon from '@/components/icon/icon/icon'

interface GroupEdit {
    id?: number,
    name?: string,
    type: "add" | "update"
}

const { Tab, TabItem } = _Tab
const backgroundStyle = {
    background: `url(${localStorage.getItem("CONFIG_BACKGROUND")})`
}

const logoStyle = {
    height: "200px",
    width: "200px",
}

const Home: React.FC = () => {
    let [searchText, setSearchText] = useState<string>("")
    let [targetUrl, setTargetUrl] = useState<string>("");
    let [faviconUrl, setFaviconUrl] = useState<string>("");
    let [editTab, setEditTab] = useState<number>(1);
    let [modal, setModal] = useState<boolean>(false);
    let [groupModal, setGroupModal] = useState<boolean>(false);
    let [navigator, setNavigator] = useState<INavigatorConfig>(getConfig('CONFIG_NAVIGATOR'));
    let [isEditting, setIsEditting] = useState<boolean>(false);
    let [active, setActive] = useState<number>(0);
    let [quickSearchList, setQuickSearchList] = useState<Array<string>>([]);
    let [quickSearchVisible, setQuickSearchVisible] = useState<boolean>(false);
    let [group, setGroup] = useState<GroupEdit>({ type: 'add' });
    useEffect(() => {
        saveNavigatorConfig(navigator)
    }, [navigator])

    useEffect(() => {
        if (searchText) {
            getQuickQueryList(searchText).then((list) => {
                if ((list as BAIDU_RESPONSE).g) {
                    setQuickSearchList((list as BAIDU_RESPONSE).g.map(item => item.q));
                    setQuickSearchVisible(true)
                } else {
                    setQuickSearchVisible(false)
                }
            })
        }
        else {
            setQuickSearchList([])
        }

    }, [searchText])

    document.onclick = () => {
        setQuickSearchVisible(false);
    }

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
                    onFieldClick={(e) => {
                        quickSearchList.length > 0 && setQuickSearchVisible(true);
                        e.stopPropagation();
                    }}
                />
                <QuickSearch quickSearchList={quickSearchList} quickSearchVisible={quickSearchVisible} />
            </div>
            <Tab
                active={active}
                onTabChange={(key) => setActive(key)}
                className="navigator-content"
                mode="line"
                extraRight={
                    isEditting ?
                        <Icon icon="icon-jiahao" className="tab-add-btn" onClick={() => {
                            setGroupModal(true);
                            setGroup({ type: 'add' })
                        }} />
                        : <></>}
            >
                {
                    navigator.data.map((group, key) => {
                        return <TabItem
                            title={
                                <TabTitle
                                    showCloseBtn={isEditting}
                                    title={group.name}
                                    onClose={(e) => { setNavigator(removeNavigatorGroup(navigator, group.id)) }}
                                    onEdit={() => {
                                        setGroupModal(true)
                                        setGroup({ type: 'update', ...group })
                                    }}
                                />
                            }
                            key={key}
                        >
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
                                            <IconButton
                                                style={{ borderRadius: "10px" }}
                                                src={item.favicon}
                                                onClick={() => { window.open(item.target, '_blank') }}
                                            />
                                        </Badge>
                                    })
                                }
                                <IconButton
                                    className="navigator-item"
                                    icon='icon-jiahao'
                                    onClick={() => {
                                        setModal(true);
                                        setEditTab(group.id)
                                    }}
                                />
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
                setNavigator(setNavigatorItem(navigator, { target: targetUrl, favicon: faviconUrl }, editTab))
                setModal(false)
            }}
            onClose={() => setModal(false)}
            onCancel={() => setModal(false)}
        >
            <>
                <Field title="目标链接" placeholder='目标链接' value={targetUrl} onChange={(val) => { setTargetUrl(val) }} />
                <Field title="图标链接" placeholder='图标链接(默认为favicon)' value={faviconUrl} onChange={(val) => { setFaviconUrl(val) }} />
            </>
        </Confirm>
        <Confirm
            visible={groupModal}
            title={group.type === 'add' ? "新增" : "修改"}
            onConfirm={() => {
                if (group.type === 'add')
                    setNavigator(addNavigatorGroup(navigator, group.name || ""))
                else if (group.type === 'update')
                    setNavigator(updateNavigatorGroup(navigator, group.name || "", group.id || -1))
                setGroupModal(false)
            }}
            onClose={() => setGroupModal(false)}
            onCancel={() => setGroupModal(false)}
        >
            <>
                <Field title="名称" placeholder='分组名称' value={group.name} onChange={(val) => { setGroup({ ...group, name: val }) }} />
            </>
        </Confirm>
        <div className='tool-bar'>
            <IconButton className='setting' icon='icon-setting-fill' onClick={() => setIsEditting(!isEditting)} />
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

const addNavigatorGroup: (navi: INavigatorConfig, groupName: string) => INavigatorConfig = (navi, groupName) => {
    return {
        ...navi,
        data: [
            ...navi.data,
            intiNavigatorGroup(groupName)
        ]
    }
}

const updateNavigatorGroup: (navi: INavigatorConfig, groupName: string, groupid: number) => INavigatorConfig = (navi, groupName, groupid) => {
    return {
        ...navi,
        data: [
            ...navi.data.map(item => {
                if (item.id === groupid)
                    item.name = groupName;
                return item;
            })
        ]
    }
}

const removeNavigatorGroup: (navi: INavigatorConfig, groupid: number) => INavigatorConfig = (navi, groupid) => {
    return {
        ...navi,
        data: [
            ...navi.data.filter(item => item.id !== groupid)
        ]
    }
}

const QuickSearch = (props: { quickSearchList: Array<string>, quickSearchVisible: boolean }) => {
    return <div
        className='quickSearch'
        style={{ display: props.quickSearchVisible ? 'block' : 'none' }}
        onClick={
            (e) => { e.stopPropagation() }
        }
    >
        <ul className='quickSearch-list'>
            {
                props.quickSearchList.map((item, key) => (
                    <li className='quickSearch-list-item' key={key} onClick={() => window.open(`https://www.baidu.com/s?wd=${item}`, '_blank')}>
                        <span>{item}</span>
                    </li>)
                )
            }
        </ul>
    </div>
}

const TabTitle = (props: {
    title: string,
    showCloseBtn: boolean,
    onClose: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any,
    onEdit: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any
}) => {
    return <span>
        {props.title}
        {props.showCloseBtn ? <>
            <Icon
                icon="icon-bianji-m"
                className='tab-edit-btn'
                onClick={(e) => {
                    e.stopPropagation();
                    props.onEdit(e);
                }}
            />
            <Icon
                icon="icon-guanbi-m"
                className='tab-close-btn'
                onClick={(e) => {
                    e.stopPropagation();
                    props.onClose(e);
                }}
            />
        </> : null}
    </span>
}

interface BAIDU_RESPONSE {
    g: Array<BAIDU_RESPONSE_G>;
    p: boolean;
    q: string;
    queryid: string;
    slid: string;
}

interface BAIDU_RESPONSE_G {
    q: string;
    sa: string;
    type: string;
}

const getQuickQueryList = (searchText: string) => {
    const cb = `jQuery${getTimestamp()}`
    const url = `https://www.baidu.com/sugrec?prod=pc&from=pc_web&wd=${encodeURIComponent(searchText)}&cb=${cb}`
    return new Promise((resolve, reject) => {
        // fetch(url, { method: 'get' }).then((response) => {
        //     console.log(response);
        //     resolve(response)
        // })
        (window as any)[cb] = (val: BAIDU_RESPONSE) => {
            console.log(val, "test");
            resolve(val)
            delete (window as any)[cb]
        }
        JsonP(url, {}, (response) => {
        })
    })
}

export default Home;