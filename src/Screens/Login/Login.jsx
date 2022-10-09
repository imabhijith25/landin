import cn from 'classnames'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link, useSearchParams } from 'react-router-dom';
import { LoginApi } from '../../API/authentication';
import { useDispatch } from 'react-redux'
import styles from "./Login.module.css"
import { setUserData } from '../../Redux/userSlice';
import PuffLoader from 'react-spinners/PuffLoader'
import { LoginValidation } from '../../Utils/formValidation';
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({})
    const [params] = useSearchParams()
    const [checkUrl, setCheckUrl] = useState("")
    console.log(params.get("q"))
    useEffect(() => {
        if (params.get("q")) {
            setCheckUrl(params.get("q"))
        }

    }, [])

    const handleChange = (e) => {
        setError({})
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submitForm = async () => {
        setLoader(true)
        const errors = LoginValidation(form.email, form.password)

        if (Object.keys(errors).length == 0) {
            const val = await LoginApi(form)
            if (val?.data?.success) {
                dispatch(setUserData(val?.data?.data))
                localStorage.setItem("userToken", val?.data?.token)
                navigate("/dashboard", { replace: true })
                setLoader(false)
            }
            else {
                setError({ ...error, submit: val?.response?.data?.message })
                setLoader(false)

            }
        }
        else {
            setError(errors)
            setLoader(false)
        }

    }
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
                            onChange={handleChange}
                            value={form.email}
                            className={cn("textbox", styles.input)}
                        />
                        <div className={styles.error}>
                            <p>{error?.email}</p>

                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <input type="password" name="password" placeholder='password'
                            onChange={handleChange}
                            value={form.password}
                            className={cn("textbox", styles.input)}
                        />
                        <div className={styles.error}>
                            <p>{error?.password}</p>

                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <button type="button" name="login"
                            value="Login"
                            onClick={() => { submitForm() }}
                            className={cn("button", styles.input)}

                        > {loader ? <PuffLoader color='white' size={12} /> : "Login"} </button>
                        <div className={styles.error}>
                            <p>{error?.submit}</p>

                        </div>
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