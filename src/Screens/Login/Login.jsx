import cn from 'classnames'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import styles from "./Login.module.css"
const Login = () => {
    const [params] = useSearchParams()
    const [checkUrl, setCheckUrl] = useState("")
    console.log(params.get("q"))
    useEffect(() => {
        if (params.get("q")) {
            setCheckUrl(params.get("q"))
        }

    }, [])
    return (
        <>
            <div className={cn("container", styles.loginContainer)}>

                <div className={styles.formWrapper}>

                    {checkUrl &&
                        <>

                            <div className={cn("message", styles.checkUrl)}>
                                <p>{checkUrl} is available</p>
                            </div>
                            <div className={styles.message}>
                                <p>Login to get this url</p>
                            </div>

                        </>

                    }
                    <div className={styles.formControl}>
                        <input type="text" name="email" placeholder='email'
                            className={cn("textbox", styles.input)}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <input type="password" name="password" placeholder='password'
                            className={cn("textbox", styles.input)}
                        />
                    </div>
                    <div className={styles.formControl}>
                        <input type="button" name="login"
                            value="Login"
                            className={cn("button", styles.input)}
                        />
                    </div>

                    <div className={styles.message}>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;