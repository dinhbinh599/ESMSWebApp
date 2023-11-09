import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../component/header/Header';
import NavBar from '../component/nav-bar/NavBar';
import RouteList from '../RouterMap'
import firebase from "../service/firebase/firebase";
import { notification } from 'antd';
import { connect } from 'react-redux';
import { recieveNotificate, sendNotificate } from "../service/action/FirebaseAction";
import { fetchProject } from '../service/action/ProjectAction';
import { history } from '../service/helper/History';

class Layout extends Component {
    componentDidMount = () => {
        const messaging = firebase.messaging()
        messaging.getToken({ vapidKey: 'BCzV0OJHq4w2DQyltsiIxhhiM7Ce4yLOujK-1QRgWkmjUloUxEPRkvp2PgtvuRQ0nj8rVe1OTIcA2eKTIbEZE2w' })
            .then(token => {
                if (token) {
                    localStorage.setItem('FirebaseToken', JSON.stringify(token))
                    this.props.recievedNoti(token)
                }
            })
        messaging.onMessage((payload) => {
            this.props.fetchProject();
            this.showNotificate(payload.notification);
        });
    }

    showNotificate = (messaging) => {
        notification.open({
            message: messaging.title,
            description: messaging.body,
            duration: 0,
            placement: 'bottomRight',
            style: { backgroundColor: '#F5FEFD' },
            onClick: this.onClickNoti
        });
    }

    onClickNoti = () => {
        history.push('/project')
        notification.destroy()
    }

    showContent = (RouteList) => {
        var result = null;
        if (RouteList.length > 0) {
            result = RouteList.map((route, index) => {
                return (
                    <Route key={index} path={route.path} exact={route.exact} render={route.main} />
                )
            });
        }
        return <Switch> {result} </Switch>
    }

    send = () => {
        this.props.sendNoti('e3604445-296d-47ab-99dd-984847e2e4f4', 'heelo')
    }
    render() {
        return (
            <div>
                <Header />
                <div id="layoutSidenav">
                    <div id="layoutSidenav_nav">
                        <NavBar />
                    </div>
                    <div id="layoutSidenav_content">
                        <main>
                            <div class="container-fluid">
                                {this.showContent(RouteList)}
                            </div>
                        </main>

                    </div>
                </div>
            </div>
        );
    }
}
const map = (dispatch) => {
    return {
        recievedNoti: (token) => {
            dispatch(recieveNotificate(token))
        },
        sendNoti: (pm, body) => {
            dispatch(sendNotificate(pm, body))
        },
        fetchProject: () => {
            dispatch(fetchProject(1, ''))
        }
    }
}
export default connect(null, map)(Layout);