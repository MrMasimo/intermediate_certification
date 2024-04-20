import {useAuthContext} from "../../context/authContext";
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {Button, Flex, Menu, MenuProps} from "antd"
import userImg from '../../img/user.png';

export default function MyHeader() {
    const location = useLocation();
    const navigate = useNavigate();
    const {isLogin, user, logout} = useAuthContext()

    const logoutHandler = () => {
        logout(() => {
            navigate('/login')
        });
    }

    let topNavItems: MenuProps['items'] = [
        {
            key: '/',
            label: <NavLink to="/">Главная</NavLink>
        },
    ];

    if (isLogin) {
        topNavItems.push({
            key: '/pollution',
            label: <NavLink to="/pollution">Загрязнения</NavLink>
        })
        topNavItems.push({
            key: '/city',
            label: <NavLink to="/city">Информация о городе</NavLink>
        })
    } else {
        topNavItems.push(...[
            {
                key: '/login',
                label: <NavLink to="/login">Вход</NavLink>
            },
            {
                key: '/registration',
                label: <NavLink to="/registration">Регистрация</NavLink>
            },
        ])
    }

    return (
        <Flex align={'center'} justify={'space-between'}>
            <Menu
                items={topNavItems}
                mode="horizontal"
                theme="dark"
                selectedKeys={[location.pathname]}
            />

            {isLogin && user && <Flex gap={'middle'} align={'center'}>
            <img
                    src={userImg}
                    alt={JSON.parse(user).email}
                    title={JSON.parse(user).email}
                    style={{color: 'white', cursor:'pointer'}}
                />
                <Button
                    onClick={logoutHandler}
                    size={'small'}
                    type={'primary'}
                >Выйти</Button>
            </Flex>}
        </Flex>
    )
}
