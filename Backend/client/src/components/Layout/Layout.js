import React from 'react';

import NavBar from '../NavBar/NavBar';

const Layout = (props) => {

    return (
        <React.Fragment>
            <NavBar />
            <section>
                {props.children}
            </section>
        </React.Fragment>
    )
} 

export default Layout;