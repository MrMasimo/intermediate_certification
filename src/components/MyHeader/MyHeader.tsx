import {useAuthContext} from "../../context/authContext";
import {useNavigate} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {Button, Flex, Menu, MenuProps} from "antd";
import userImg from '../../img/user.png';

export default function MyHeader() {
    const navigate = useNavigate();
    const {isLogin, user, logout} = useAuthContext()

    const logoutHandler = () => {
        logout(() => {
            navigate('/login')
        });
    }

    let topNavItems: MenuProps['items'] = [
        {
            key: 'home',
            label: <NavLink to="/">Главная</NavLink>
        },
    ];

    if (isLogin) {
        topNavItems.push({
            key: 'pollution',
            label: <NavLink to="/pollution">Загрязнения</NavLink>
        })
    } else {
        topNavItems.push(...[
            {
                key: 'login',
                label: <NavLink to="/login">Вход</NavLink>
            },
            {
                key: 'registration',
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
                defaultSelectedKeys={['home']}
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
