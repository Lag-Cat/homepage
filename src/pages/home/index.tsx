import React, { useEffect, useState } from 'react'
import Search from '../../components/input/search'
import Icon from '../../components/icon/icon'
import './index.less'
import '../../asset/iconfont/font_3250542_jbiasqyb1vk/iconfont.css'
import Field from '@/components/input/field/field'
import { getConfig, saveNavigatorConfig } from '@/utils/config'
import { initNavigatorItem } from '@/utils/init'
import Modal, { confirm as Confirm } from '@/components/modal/modal/modal'
import PageEditor from './components/pageEditor'

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
    useEffect(() => {
        saveNavigatorConfig(navigator)
    }, [navigator])
    return <div className='homepage' style={{ ...backgroundStyle }}>
        <div className='toolbar'>

        </div>
        <div className="main-content">
            <div className={'logo'} style={{ ...logoStyle }}></div>
            <Search
                className='searchBox'
                searchText='搜索'
                value={searchText}
                onChange={val => setSearchText(val ? val : "")}
            />
            <div className='navigator'>
                {
                    navigator.data.map((item, key) => {
                        return <Icon key={key} src={item.favicon} onClick={() => { window.open(item.target, '_blank') }} />
                    })
                }
                <Icon icon='icon-jiahao' onClick={() => setModal(true)} />
            </div>
        </div>
        <Confirm
            visible={modal}
            content={<>
                <Field title="目标链接" placeholder='目标链接' value={targetUrl} onChange={(val) => { console.log(11); setTargetUrl(val) }} />
                <Field title="图标链接" placeholder='图标链接' value={faviconUrl} onChange={(val) => { setFaviconUrl(val) }} />
            </>}
            title={"新增"}
            onConfirm={() => {
                setNavigator({
                    ...navigator,
                    data: [
                        ...navigator.data,
                        initNavigatorItem({
                            target: targetUrl,
                            favicon: faviconUrl
                        })
                    ]
                })
                setModal(false)
            }}
            onClose={() => setModal(false)}
        />
        {/* <PageEditor /> */}
    </div >
}

export default Home;