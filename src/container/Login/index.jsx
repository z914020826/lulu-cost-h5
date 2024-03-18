
import style from './style.module.less'
import CustomIcon from '@/components/CustomIcon'
import { Button, Input, Cell, Checkbox, Toast } from "zarm"
import Captcha from "react-captcha-code"
import { useCallback, useState } from 'react'
import { post } from '@/utils'
import cx from 'classnames'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verify, setVerify] = useState('')
    const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
    const [type, setType] = useState('login'); // 登录注册类型

    const handleChange = useCallback((captcha) => {
        setCaptcha(captcha)
    }, []);

    const onSubmit = async () => {
        if (!username) {
            Toast.show('请输入账号')
            return
        }
        if (!password) {
            Toast.show('请输入密码')
            return
        }
        try {
            if (type == 'login') {
                const { data } = await post('/api/user/login', { username, password })
                localStorage.setItem('token', data.token)
            } else {
                if (!verify) {
                    Toast.show('请输入验证码')
                    return
                }
                if (verify != captcha) {
                    Toast.show('验证码错误')
                    return
                }
                await post('/api/user/register', { username, password })
                Toast.show('注册成功');
                setType('login');

            }
        } catch (error) {
            Toast.show('系统错误');

        }

    }

    return <div className={style.auth}>
        <div className={style.head}>head</div>
        <div className={style.tab}>
            <span className={cx({ [style.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
            <span className={cx({ [style.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>        </div>
        <div className={style.form}>
            <Cell icon={<CustomIcon type="zhanghao" />}>
                <Input
                    clearable
                    type="text"
                    placeholder="请输入账号"
                    onChange={(value) => setUsername(value)}
                />
            </Cell>
            <Cell icon={<CustomIcon type="mima" />}>
                <Input
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    onChange={(value) => setPassword(value)}
                />
            </Cell>
            {type == 'register' ? <Cell icon={<CustomIcon type="mima" />}>
                <Input
                    clearable
                    type="text"
                    placeholder="请输入验证码"
                    onChange={(value) => setVerify(value)}
                />
                <Captcha charNum={4} onChange={handleChange} />
            </Cell> : null}
        </div>
        <div className={style.operation}>
            {type == 'register' ? <div className={style.agree}>
                <Checkbox />
                <label className="text-light">阅读并同意<a>《小鹿手帐条款》</a></label>
            </div> : null}
            <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
        </div>
    </div>
}

export default Login
