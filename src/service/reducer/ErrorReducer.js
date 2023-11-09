import { ERROR } from "../constant/index";

var initState = {}

const ErrorReducer = (state = initState, action) => {
    switch (action.type) {
        case ERROR.LOGIN_ERROR:
            state = action.error
            return state
        case ERROR.REGISTER_ERROR:
            state = action.error
            return state
        default:
            return state;
    }
}

export default ErrorReducer;