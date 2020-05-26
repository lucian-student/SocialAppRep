import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';


function MenuBar(props) {

    const { user, logout } = useContext(AuthContext);

    const pathname = window.location.pathname;

    //path should change wen redireced
    const path = pathname === '/' ? 'login' : pathname.substr(1);

    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = ({ name }) => setActiveItem(name);

    function handleLogout(){
        logout();
    }

    const menuBar = user ? (
        <div>
            <Menu pointing secondary>
                <Link to='/home'>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                    />
                </Link>

                <Link to='/social'>
                    <Menu.Item
                        name='social'
                        active={activeItem === 'social'}
                        onClick={handleItemClick}
                    />
                </Link>
                
                <Menu.Menu position='right'>
                  
                    <Menu.Item
                        name='logout'
                        onClick={handleLogout}
                    />
               
                </Menu.Menu>
               
            </Menu>

        </div>

    ) : (
            <div>

                <Menu pointing secondary>


                    <Menu.Menu position='right'>
                        <Link to='/register' >
                            <Menu.Item
                                name='register'
                                active={activeItem === 'register'}
                                onClick={handleItemClick}
                            />
                        </Link>
                        <Link to='/' >
                            <Menu.Item
                                name='login'
                                active={activeItem === 'login'}
                                onClick={handleItemClick}
                            />
                        </Link>
                    </Menu.Menu>
                </Menu>

            </div>

        );

    return menuBar;



}
export default MenuBar;