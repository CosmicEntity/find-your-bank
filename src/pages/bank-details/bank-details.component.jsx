import React from 'react';
import { useParams, useLocation } from 'react-router';
import { Container, Card } from 'semantic-ui-react';


const BankDetails = () => {

    let { ifsc } = useParams();
    let location = useLocation();
    let banks = localStorage.getItem(`bank_details_${location.state.city}`);
    
    let foundBank = JSON.parse(banks).filter(bank => bank.ifsc === ifsc)
    const {bank_name,branch,bank_id,address} = foundBank[0]

    
    return (
        <Container textAlign='center' style={{height:'100vh'}}>
        <Card style={{margin:"auto",marginTop:'150px'}} raised>
            <Card.Content header={bank_name} />
            <Card.Meta content={branch}/>
            <Card.Content description={address} />
            <Card.Content extra>
                {ifsc}
            </Card.Content>
        </Card>
        </Container>
    )
}

export default BankDetails;