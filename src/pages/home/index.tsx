import React, { useEffect, useRef, useState } from 'react'
import Search from '../../components/input/search'
import IconButton from '../../components/icon/icon/iconButton'
import layout from './index.less'
// import '../../asset/iconfont/font_3250542_jbiasqyb1vk/iconfont.css'
import Field from '@/components/input/field/field'
import { getConfig, getTimestamp, saveNavigatorConfig } from '@/utils/config'
import { IInitNavigatorItem, initNavigatorItem, intiNavigatorGroup } from '@/utils/init'
import Modal, { confirm as Confirm } from '@/components/modal/modal/modal'
import Badge from '../../components/badge/badge/badge'
import _Tab from '../../components/tab/tab/index'
import JsonP from 'jsonp'
import Icon from '@/components/icon/icon/icon'
import { history, useSelector } from 'umi'
import { IndexModels } from '@/models'
import classNames from 'classnames'

interface GroupEdit {
    id?: number,
    name?: string,
    type: "add" | "update"
}

interface ItemEdit {
    type: "add" | "update";
    groupId: number;
    data?: INavigatorItem;
}

const { Tab, TabItem } = _Tab
// const backgroundStyle = {
//     background: `url(${localStorage.getItem("CONFIG_BACKGROUND")})`
// }

const logoStyle = {
    height: "200px",
    width: "200px",
}

const Home: React.FC = () => {
    let [searchText, setSearchText] = useState<string>("")
    let [editTab, setEditTab] = useState<ItemEdit>({ type: 'add', groupId: 0 });
    let [modal, setModal] = useState<boolean>(false);
    let [groupModal, setGroupModal] = useState<boolean>(false);
    let [navigator, setNavigator] = useState<INavigatorConfig>(getConfig('CONFIG_NAVIGATOR'));
    let [isEditting, setIsEditting] = useState<boolean>(false);
    let [active, setActive] = useState<number>(0);
    let [quickSearchList, setQuickSearchList] = useState<Array<string>>([]);
    let [quickSearchVisible, setQuickSearchVisible] = useState<boolean>(false);
    let [group, setGroup] = useState<GroupEdit>({ type: 'add' });
    let searchBoxRef = useRef<HTMLInputElement>(null);
    let backgroundStyle = useSelector<IndexModels, IBackground>(state => state.settings.background)
    let [selectItem, setSelectItem] = useState<number>(-1);

    useEffect(() => {
        saveNavigatorConfig(navigator)
    }, [navigator])

    let onSearchTextChange = (text?: string) => {
        if (text) {
            getQuickQueryList(text).then((list) => {
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
    }

    useEffect(() => {
        if (selectItem >= 0) {
            setSearchText(quickSearchList[selectItem])
        }
    }, [selectItem])

    useEffect(() => {
        let onWindowFocus = () => {
            searchBoxRef?.current?.focus();
        }
        window.addEventListener("focus", onWindowFocus);

        return () => {
            window.removeEventListener("focus", onWindowFocus);
        }
    })

    document.onclick = () => {
        setQuickSearchVisible(false);
    }

    return <div className={layout['homepage']} style={{ background: `url(${backgroundStyle.url})` }}>
        <div className={layout['toolbar']}>

        </div>
        <div className={layout["main-content"]}>
            <div className={layout['logo']} style={{ ...logoStyle }}></div>
            <div className={layout['searchBox']}>
                <Search
                    searchText='搜索'
                    value={searchText}
                    onChange={val => {
                        setSearchText(val ? val : "")
                        onSearchTextChange(val);
                    }}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            window.open(`https://www.baidu.com/s?wd=${searchText}`, '_blank')
                            setSelectItem(-1);
                        } else if (event.key === 'ArrowUp') {
                            setSelectItem(selectItem - 1);
                        } else if (event.key === 'ArrowDown') {
                            setSelectItem(selectItem + 1);
                        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                        } else {
                            setSelectItem(-1);
                        }
                    }}
                    onSearch={
                        () => window.open(`https://www.baidu.com/s?wd=${searchText}`, '_blank')
                    }
                    onFieldClick={(e) => {
                        quickSearchList.length > 0 && setQuickSearchVisible(true);
                        e.stopPropagation();
                    }}
                    ref={searchBoxRef}
                />
                <QuickSearch quickSearchList={quickSearchList} quickSearchVisible={quickSearchVisible} selected={selectItem} />
            </div>
            <Tab
                active={active}
                onTabChange={(key) => setActive(key)}
                className={layout["navigator-content"]}
                mode="line"
                extraRight={
                    isEditting ?
                        <Icon icon="icon-jiahao" className={layout["tab-add-btn"]} onClick={() => {
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
                            <div className={layout["navigator"]}>
                                {
                                    group.items.map((item, key1) => {
                                        return <div key={key1}>
                                            <Badge
                                                className={layout["navigator-item"]}
                                                dot={isEditting && <div style={{ fontSize: "13px", lineHeight: "10px" }}>×</div>}
                                                onClick={() => {
                                                    setNavigator(removeNavigatorItem(navigator, item.id, group.id))
                                                }}
                                            >
                                                <IconButton
                                                    style={{ borderRadius: "10px" }}
                                                    src={item.favicon}
                                                    onClick={() => {
                                                        if (!isEditting)
                                                            window.open(item.target, '_blank')
                                                        else {
                                                            setModal(true);
                                                            setEditTab({ groupId: group.id, type: 'update', data: item })
                                                        }
                                                    }}
                                                />
                                            </Badge>
                                            <div className={layout["navigator-item-title"]}>{item.title}</div>
                                        </div>
                                    })
                                }
                                <IconButton
                                    className={layout["navigator-item"]}
                                    icon='icon-jiahao'
                                    onClick={() => {
                                        setModal(true);
                                        setEditTab({ groupId: group.id, type: 'add', data: { target: "", favicon: "" } as any })
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
            title={editTab.type === 'add' ? '新增' : '修改'}
            onConfirm={() => {
                if (editTab.type === 'add')
                    setNavigator(
                        addNavigatorItem(
                            navigator,
                            editTab
                        )
                    )
                else
                    setNavigator(
                        updateNavigatorItem(
                            navigator,
                            editTab
                        )
                    )
                setModal(false)
            }}
            onClose={() => setModal(false)}
            onCancel={() => setModal(false)}
        >
            <>
                <Field title="目标链接" placeholder='目标链接' value={editTab.data?.target} onChange={(val) => {
                    setEditTab({
                        ...editTab,
                        data: ({
                            ...editTab.data,
                            target: val
                        } as INavigatorItem)
                    })
                }} />
                <Field title="图标链接" placeholder='图标链接(默认为favicon)' value={editTab.data?.favicon} onChange={(val) => {
                    setEditTab({
                        ...editTab,
                        data: ({
                            ...editTab.data,
                            favicon: val
                        } as INavigatorItem)
                    })
                }} />
                <Field title="名称" placeholder='名称' value={editTab.data?.title} onChange={(val) => {
                    setEditTab({
                        ...editTab,
                        data: ({
                            ...editTab.data,
                            title: val
                        } as INavigatorItem)
                    })
                }} />
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
            <Field title="名称" placeholder='分组名称' value={group.name} onChange={(val) => { setGroup({ ...group, name: val }) }} />
        </Confirm>
        <div className={layout['tool-bar']}>
            <IconButton className={layout['setting']} icon='icon-setting-fill' onClick={() => setIsEditting(!isEditting)} />
            <IconButton className={layout['setting']} icon='icon-ego-menu' onClick={() => history.push("/setting")} />
        </div>
    </div >
}

const addNavigatorItem: (navi: INavigatorConfig, item: ItemEdit) => INavigatorConfig = (navi, item) => {
    return {
        ...navi,
        data: [
            ...navi.data.map(naviItem => {
                if (naviItem.id === item.groupId) {
                    naviItem.items.push(initNavigatorItem({
                        target: item.data?.target ? item.data?.target : "",
                        favicon: item.data?.favicon ? item.data?.favicon : "",
                    }))
                }
                return naviItem
            })
        ]
    }
}

const updateNavigatorItem: (navi: INavigatorConfig, item: ItemEdit) => INavigatorConfig = (navi, item) => {
    return {
        ...navi,
        data: [
            ...navi.data.map(grouItem => {
                if (grouItem.id === item.groupId) {
                    grouItem.items = grouItem.items.map(naviItem => {
                        if (naviItem.id === item.data?.id) {
                            return item.data;
                        }
                        return naviItem;
                    })
                }
                return grouItem
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

const QuickSearch = (props: { quickSearchList: Array<string>, quickSearchVisible: boolean, selected: number }) => {
    return <div
        className={layout['quickSearch']}
        style={{ display: props.quickSearchVisible ? 'block' : 'none' }}
        onClick={
            (e) => { e.stopPropagation() }
        }
    >
        <ul className={layout['quickSearch-list']}>
            {
                props.quickSearchList.map((item, key) => (
                    <li className={classNames(layout['quickSearch-list-item'], key === props.selected ? layout['quickSearch-list-item-selected'] : '')} key={key} onClick={() => window.open(`https://www.baidu.com/s?wd=${item}`, '_blank')}>
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
                className={layout['tab-edit-btn']}
                onClick={(e) => {
                    e.stopPropagation();
                    props.onEdit(e);
                }}
            />
            <Icon
                icon="icon-guanbi-m"
                className={layout['tab-close-btn']}
                onClick={(e) => {
                    e.stopPropagation();
                    props.onClose(e);
                }}
            />
        </> : null}
    </span>
}

declare type TNavigatorBtn = 'icon' | 'label' | 'text'
const renderBtn = (type: TNavigatorBtn, icon: string, text: string) => {
    switch (type) {
        case "icon":
            return <IconButton src={icon} ></IconButton>
        case "label":
            return <div>
                <Icon src={icon} />
                <span>{text}</span>
            </div>
        case 'text':
            return <div><span>{text}</span></div>
        default:
            return <IconButton src={icon} ></IconButton>
    }
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
        (window as any)[cb] = (val: BAIDU_RESPONSE) => {
            resolve(val)
            delete (window as any)[cb]
        }
        JsonP(url, {}, (response) => {
        })
    })
}

export default Home;