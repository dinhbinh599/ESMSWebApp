import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

class MenuLink extends Component {
    render() {
        return (
            <Route path={this.props.to} exact={this.props.activeOnlyWhenExace} children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className="nav-item">
                        <NavLink to={this.props.to} >
                            <div class="sb-sidenav-menu-heading"></div>
                            <a class={`nav-link ${active}`} style={{fontSize:17}} >{this.props.label}</a>                          
                        </NavLink>
                    </li>
                );
            }} />
        );
    }
}

export default MenuLink;