import React, { Component } from 'react';
import MenuLink from './MenuLink';
import NavigationList from './NavigationList';

class NavBar extends Component {

    showMenu = () => {
        var result = null;
        if (NavigationList.length > 0) {
            result = NavigationList.map((menu, index) => {
                return (
                    <MenuLink key={index} label={menu.name} to={menu.path} activeOnlyWhenExace={menu.exact} />
                );
            });
        }
        return result;
    }

    render() {
        return (
            <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div class="sb-sidenav-menu">
                    <div class="nav">
                        {this.showMenu()}
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;