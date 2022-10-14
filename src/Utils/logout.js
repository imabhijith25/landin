import store from "../Redux/store";
import { setClear } from "../Redux/userSlice";
export const logout = () => {
    localStorage.removeItem("userToken");
    store.dispatch(setClear());
    window.location.href = "/login";
};
