import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { Form, Input, Button, Checkbox, Layout, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'
import { currentAccountState } from '@/presentation/components'
import { loginState } from '@/presentation/pages/login/components'

import './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)

  const history = useHistory()
  const [state, setState] = useRecoilState(loginState)

  const { Header, Footer, Content } = Layout

  useEffect(() => resetLoginState(), [])
  useEffect(() => validate('userId'), [state.userId])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { userId, password } = state
    const formData = { userId, password }

    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.userIdError || !!old.passwordError }))
  }

  const handleFinish = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(old => ({ ...old, isLoading: true }))
      const account = await authentication.auth({
        userId: state.userId,
        password: state.password
      })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      message.error({
        content: error.message,
        className: 'custom-class'
      })
      setState(old => ({ ...old, isLoading: false, mainError: error.message }))
    }
  }

  const handleUserNameChange = async (e) => {
    setState({ ...state, userId: e.target.value })
  }

  const handlePasswordChange = async (e) => {
    setState({ ...state, password: e.target.value })
  }

  return (
    <Layout className="login-layout">
      <Header className="login-layout-header">
        <div className="logo">Altin POS</div>
      </Header>
      <Content className="login-content">
        <div className="login-wrap">
          <div className="login-wrap__image">
            <h1 className="login-title">Login</h1>
            <p className="login-text">Grow together for a better life.</p>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleFinish}
          >
            <Form.Item
              name="userId"
              rules={[{ required: true, message: 'Please input your user id!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="User Id"
                onChange={handleUserNameChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer className="login-layout-footer">Footer</Footer>
    </Layout>
  )
}

export default Login
