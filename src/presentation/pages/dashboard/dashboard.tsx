import React, { useEffect } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons'

import { dashboardState } from '@/presentation/pages/dashboard/components'

import './dashboard-style.scss'

const { Header, Sider, Content } = Layout
const { SubMenu } = Menu

const makeDashboard: React.FC = () => {
  const resetDashboardState = useResetRecoilState(dashboardState)
  const [state, setState] = useRecoilState(dashboardState)

  useEffect(() => resetDashboardState(), [])

  const toggle = () => {
    setState(old => ({ ...old, collapsed: !old.collapsed }))
  }

  return (
    <Layout>
      <Sider className="side-menu" trigger={null} collapsible collapsed={state.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="mnuUtil " icon={<SettingOutlined />} title="Utility">
            <SubMenu key="utilUser" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280
          }}
        >
            Content
        </Content>
      </Layout>
    </Layout>
  )
}

export default makeDashboard
