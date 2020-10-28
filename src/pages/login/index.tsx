import React from 'react'
import Header from '../../components/Header'
import styles from './Login.module.scss'
import firebase from "firebase";
import InputMask from 'react-input-mask';
import { useHistory } from 'react-router-dom';

export default function Login(){
    const history = useHistory()
    const [number, setNumber] = React.useState<string>("")
    const [codeSended, setCodeSended] = React.useState<boolean>(false)
    const [code, setCode] = React.useState<string>("")
    const phoneRegex = /^(\+7)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g
    const confirmationResultRef = React.useRef<any>(null)

    React.useEffect(() => {
        (window as any).recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback':() => console.log('captcha verivied successfully'),
        });
    }, [])

    React.useEffect(() => {
        console.log(code)
        console.log(code.replace(' ','').length)
        if(/^[0-9]{1,6}$/g.test(code)){
            confirmationResultRef.current.confirm(code.replace(' ', '')).then(function (result:any) {
                // User signed in successfully.
                var user = result.user;
                console.log(user)
                alert('authorized')
                history.push('/')
            }).catch((error:any) => {
                alert('Wrong code')
                console.log(error)
            });
        }
    }, [code])


    firebase.auth().languageCode = 'ru';

    function sendCode(){
        firebase.auth().signInWithPhoneNumber(number, (window as any).recaptchaVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                confirmationResultRef.current = confirmationResult
                setCodeSended(true)
                console.log(confirmationResult)
            }).catch((error:any) => {
                alert('Failed to send code')
                console.log(error)
            })
    }

    return (
        <div className={styles.page}>
            <Header />
            <div className={styles.content}>
                {!codeSended ?
                    <div className={styles.phone_section}>
                        <a className={styles.title}>
                            НОМЕР НЕ ТЕЛЕФОНА 📱,
                            <br />
                            А ЗАТЕМ КОД НЕ ИЗ СМС
                        </a>
                        <InputMask
                            name={'phone'}
                            id={'phone'}
                            mask="+7 999 999 99 99"
                            maskChar={' '}
                            value={number}
                            style={{marginTop:20}}
                            onChange={e => setNumber(e.target.value)}
                            placeholder={"+7 777 000 00 00"}
                            className={styles.input}
                        />
                        <button
                            onClick={sendCode}
                            disabled={!phoneRegex.test(number)}
                            className={styles.button}
                            style={{marginTop:20}}
                        >
                            Получить номер
                        </button>
                    </div>
                    :
                    <div className={styles.phone_section}>
                        <a className={styles.title}>
                            НЕ ПРОВЕРЯЙТЕ СМСКИ НА
                            <br />
                            <a className={styles.number}>{number}</a>
                        </a>
                        <InputMask
                            name={'code'}
                            mask={'999999'}
                            id={'code'}
                            value={code}
                            style={{marginTop:20}}
                            onChange={e => setCode(e.target.value)}
                            placeholder={"0 0 0 0 0 0"}
                            className={styles.input}
                        />
                    </div>
                }
                <div id={'recaptcha-container'}></div>
            </div>
        </div>
    )
}