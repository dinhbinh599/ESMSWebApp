import { Type } from "../constant/index";
import { history } from "../helper/History";


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case Type.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case Type.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case Type.LOGIN_FAILURE:
            return {};
        case Type.LOGOUT:
            localStorage.clear()
            history.push('/login')
            return {};
        default:
            return state
    }
}

export default authentication