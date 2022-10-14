import cn from "classnames";
import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { register } from "../../API/authentication";
import styles from "./register.module.css";
import PuffLoader from "react-spinners/PuffLoader";
import { RegisterValidation } from "../../Utils/formValidation";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Redux/userSlice";
const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const [loader, setLoader] = useState(false);
    const [checkUrl, setCheckUrl] = useState("");
    const [error, setError] = useState({});
    console.log(params.get("q"));
    useEffect(() => {
        if (params.get("q")) {
            setCheckUrl(params.get("q"));
        }
        if (localStorage?.getItem("userToken")) {
            navigate("/dashboard");
        }
    }, []);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const handleChange = useCallback(
        (e) => {
            setError({});
            setForm({ ...form, [e.target.name]: e.target.value });
        },
        [form]
    );

    const submitForm = async () => {
        const error = RegisterValidation(form.email, form.name, form.password);
        if (Object.keys(error).length == 0) {
            setLoader(true);
            const val = await register(form);
            if (val?.data?.success) {
                setLoader(false);
                dispatch(setUserData(val?.data?.data));
                localStorage.setItem("userToken", val?.data?.token);
                navigate("/dashboard", { replace: true });
            } else {
                setError({ ...error, submit: val?.response?.data?.message });
                setLoader(false);
            }
        } else {
            setError(error);
            setLoader(false);
        }
    };
    return (
        <>
            <div className={cn("container", styles.loginContainer)}>
                <div className={styles.formWrapper}>
                    {/* {checkUrl &&
                        <>

                            <div className={cn("message", styles.checkUrl)}>
                                <p>{checkUrl} is available</p>
                            </div>


                        </>

                    } */}
                    <div className={styles.message}>
                        <p>Create an account</p>
                    </div>
                    <div className={styles.formControl}>
                        <input
                            type="text"
                            name="email"
                            placeholder="email"
                            onChange={handleChange}
                            value={form?.email}
                            className={cn("textbox", styles.input)}
                        />
                        <div className={styles.error}>
                            <p>{error?.email}</p>
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <input
                            type="text"
                            name="name"
                            placeholder="name"
                            onChange={handleChange}
                            value={form?.name}
                            className={cn("textbox", styles.input)}
                        />
                        <div className={styles.error}>
                            <p>{error?.name}</p>
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={handleChange}
                            value={form?.password}
                            className={cn("textbox", styles.input)}
                        />
                        <div className={styles.error}>
                            <p>{error?.password}</p>
                        </div>
                    </div>
                    <div className={styles.formControl}>
                        <button
                            name="register"
                            value="Register"
                            className={cn("button", styles.input)}
                            onClick={() => submitForm()}
                            disabled={loader}
                        >
                            {" "}
                            {loader ? (
                                <PuffLoader color="white" size={12} />
                            ) : (
                                "Register"
                            )}
                        </button>
                        <div className={styles.error}>
                            <p>{error?.submit}</p>
                        </div>
                    </div>

                    <div className={styles.message}>
                        <p>
                            Already have an account?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
