import React from 'react'
import { Container, Header, Icon } from 'semantic-ui-react';
import SideMenu from '../../components/side-menu/side-menu.component';
const Error404 = ()=>{
    return(
        <>
        <SideMenu/>
        <Container fluid style={{height:'100vh'}}>
            <Header as='h2' icon style={{marginTop:'150px'}}>
            <Icon name='file code outline' />
                Error 404 - Page Not Found
            </Header>
    
        </Container>
        </>
    )
}

export default Error404;