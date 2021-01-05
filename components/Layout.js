import React from 'react'
import {Container} from 'semantic-ui-react'
import Menu from './Menu'
const Layout = ({children}) => {
    return (
        <Container>
            <Menu/>
            {children}
        </Container>
    );
};

export default Layout;