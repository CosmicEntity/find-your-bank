import React from 'react';
import { useParams, useLocation } from 'react-router';
import { Container, Card } from 'semantic-ui-react';
import SideMenu from '../../components/side-menu/side-menu.component';
import Error404 from '../error/error-404.component';

const BankDetails = () => {
    let { ifsc } = useParams();
    let location = useLocation();
    if(location.state){
        let banks = localStorage.getItem(`bank_details_${location.state.city}`);
        let foundBank = JSON.parse(banks).filter(bank => bank.ifsc === ifsc)
        const {bank_name,branch,bank_id,address,state} = foundBank[0]    
    return (
            <>
            <SideMenu/>
            <Container textAlign='center' style={{height:'100vh'}}>
            <Card style={{margin:"auto",marginTop:'150px'}} fluid raised color={'violet'}>
                <Card.Content><h2>{bank_name}</h2></Card.Content>
                <Card.Meta> <h4>Branch - {branch}</h4><h4>Bank ID - {bank_id}</h4></Card.Meta>
                <Card.Content><h3>Address - {address}</h3></Card.Content>
                <Card.Content extra>
                    <h4>IFSC - {ifsc}</h4>
                    <h4>{state}</h4>
                </Card.Content>
            </Card>
            </Container>
            </>
        )
    }
        return (<Error404/>)
    
}

export default BankDetails;