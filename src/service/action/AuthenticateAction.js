import jwtDecode from "jwt-decode"
import moment from "moment"
import { SESSION, Type } from "../constant"
import { history } from "../helper/History"
import { getRole } from "../util/util"

export const checkSession = () => {
    var token = localStorage.getItem('token')
    if (token !== null) {
        var decode = jwtDecode(token)
        var time = null
        Object.keys(decode).forEach(key => {
            let res = key.split('/')
            if (res[res.length - 1] === 'exp') {
                time = moment.unix(decode[key]).format("DD/MM/YYYY HH:mm:ss")
            }
        })
        var now = moment().format("DD/MM/YYYY HH:mm:ss")
        var diff = moment(time, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"))
        return (dispatch) => {
            if (diff <= 0 || getRole() !== 'admin') {
                localStorage.clear()
                dispatch(sessionTimeOut())
                history.push('/login')
            } else {
                dispatch(sessionAllow())
            }
        }
    }
}

export const sessionTimeOut = () => {
    return { type: SESSION.SESSION_TIME_OUT }
}

export const sessionAllow = () => {
    return { type: SESSION.SESSION_ALLOW }
}

export const logout = () => {
    return { type: Type.LOGOUT };
}