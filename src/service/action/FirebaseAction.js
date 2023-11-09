import axios from "axios"
import { FIREBASE } from "../constant"
import { API_URL, getUserName } from "../util/util"

export const sendNotificate = (pmID, body) => {
    var pm = ''
    if (typeof pmID === 'string')
        pm = pmID
    var url = `${API_URL}/Notification?topic=pm${pm}`
    var token = JSON.parse(localStorage.getItem('FirebaseToken'))
    var message = {
        title: `Human Resources ${getUserName()} sent you a notification`,
        body: body
    }
    console.log('sendNotificate', message)

    return (dispatch) => {
        if (localStorage.getItem('token') !== null && token !== null) {
            var unsubcriptUrl = `${API_URL}/Notification/unsubscription?token=${token}&topic=pm${pm}`
            axios.post(
                unsubcriptUrl,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                if (pm !== '') {
                    axios.post(
                        url,
                        message,
                        { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
                    ).then(res => {
                        console.log(res)
                    }).catch(err => {
                        console.log(err)
                    })
                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            dispatch(recieveNotificateFailed())
        }
    }
}

export const recieveNotificate = (token) => {
    var url = `${API_URL}/Notification/subscription?token=${token}&topic=news`
    return (dispatch) => {
        if (localStorage.getItem('token') !== null && token !== null)
            axios.post(
                url,
                { headers: { "Authorization": `Bearer ${localStorage.getItem('token').replace(/"/g, "")}` } }
            ).then(res => {
                console.log('recieveNotificate ok', res.status)
            }).catch(err => {
                console.log(err)
            })
    }
}

export const recieveNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const recieveNotificateFailed = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}

export const sendNotificateSuccess = () => {
    return { type: FIREBASE.RECIEVE_MESSAGE }
}