import React from 'react'
import styles from './Header.module.scss'
import {LogIn, LogOut} from 'react-feather'
import {Link, useHistory } from "react-router-dom";
import firebase from 'firebase';

export default function Header(){
    const history = useHistory()

    function handleLoginClick(){
        history.push('/login')
    }

    function handleLogoutClick(){
        firebase.auth().signOut().then(function() {
            alert("Sign out successful")
            history.push('/')
        }).catch(function(error) {
            console.log(error)
        });
    }

    var user = firebase.auth().currentUser;
    return (
        <div className={styles.wrapper}>
            <div className={styles.inner}>
                <Link to={'/'}>
                    <a className={styles.logo}>
                        НЕГОТОВО
                    </a>
                </Link>
                <div
                    className={styles.icon}
                >
                    {!user ?
                        <LogIn
                            onClick={handleLoginClick}
                        />
                        :
                        <LogOut
                            onClick={handleLogoutClick}
                        />
                    }
                </div>
            </div>
        </div>
    )
}