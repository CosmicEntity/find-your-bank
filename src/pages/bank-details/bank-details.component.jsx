import React from 'react';
import { useParams, useLocation } from 'react-router';
import { Container, Card } from 'semantic-ui-react';


const BankDetails = () => {
    debugger
    let { ifsc } = useParams();
    let location = useLocation();
    let banks = localStorage.getItem(`bank_details_${location.state.city}`);
    
    let foundBank = JSON.parse(banks).filter(bank => bank.ifsc === ifsc)
    const {bank_name,branch,bank_id,address,state} = foundBank[0]

    
    return (
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
    )
}

export default BankDetails;