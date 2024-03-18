// import React, { useState } from 'react'
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom"

import { ConfigProvider } from 'zarm'
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import routes from '@/router'
import NavBar from "@/components/NavBar"
import { useEffect, useState } from "react"

function App() {
  // 拿到当前路由地址
  const { pathname } = useLocation() // 拿到 location 实例
  const needNav = ['/', '/data', '/user'] // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false) // 是否展示 Nav
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname])
  return (<>
    <>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        {<Routes>
          {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
        </Routes>}
      </ConfigProvider>
      <NavBar showNav={showNav} />
    </>
  </>
  )
}

export default App
