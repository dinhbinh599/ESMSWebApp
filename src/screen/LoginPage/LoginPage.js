import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Action from '../../service/action/LoginAction'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            submitted: false
        };
    }

    componentDidMount() {
        const user = localStorage.getItem('token') // your saved token in localstorage
        if (user && user !== 'undefined') {            // check for not undefined
            this.props.history.push('/')               // now you can redirect your desired route
        }
    }
    handleChange = (e) => {
        var { name, value } = e.target;
        this.setState({ [name]: value })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { email, password } = this.state;
        this.props.login(email, password);
    }

    render() {
        const { email, password, submitted } = this.state;
        var { error } = this.props
        return (
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-lg-5">
                                    <div class="card shadow-lg border-0 rounded-lg mt-5">
                                        <div class="card-header"><h3 class="text-center font-weight-light my-4">Login to Human Resources</h3></div>
                                        <div class="card-body">
                                            <form onSubmit={this.handleSubmit}>
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputEmailAddress">Email</label>
                                                    <input class="form-control py-4" type="text"
                                                        id="email" name="email"
                                                        className="form-control"
                                                        onChange={this.handleChange} />
                                                    {typeof error.Email !== 'undefined' ?
                                                        error.Email.map((element, index) => {
                                                            return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                        })
                                                        : ''}
                                                </div>
                                                <div class="form-group">
                                                    <label class="small mb-1" for="inputPassword">Password</label>
                                                    <input class="form-control py-4" type="password"
                                                        id="password" name="password"
                                                        className="form-control"
                                                        onChange={this.handleChange} />
                                                    {typeof error.Password !== 'undefined' ?
                                                        error.Password.map((element, index) => {
                                                            return (<div key={index} className="error text-danger font-weight-bold">{element}</div>)
                                                        })
                                                        : ''}
                                                </div>
                                                <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <button type='submit' class="btn btn-primary">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        loggingIn: state.authentication,
        error: state.ErrorReducer
    };
}

const mapDispatchToProp = dispatch => {
    return {
        login: (username, password) => {
            dispatch(Action.login(username, password))
        }
    }
}

export default connect(mapState, mapDispatchToProp)(Login);