import React from 'react';
import { Table,Icon} from 'semantic-ui-react';

const BankListRow = ({bank})=>{
    const {bank_name,ifsc,branch,bank_id,address,favorite} = bank;
    return(
        <Table.Row textAlign="center">
           <Table.Cell width={1} data-favorite={`${ifsc}`}>
            <Icon name={`star ${!favorite?'outline':''}`} color={'yellow'} size='large' data-favorite={`${ifsc}`}/>
           </Table.Cell>
           <Table.Cell width={3} data-bank={`${ifsc}`}>{bank_name}</Table.Cell>
           <Table.Cell width={3} data-bank={`${ifsc}`}>{ifsc}</Table.Cell>
           <Table.Cell width={3} data-bank={`${ifsc}`}>{branch}</Table.Cell>
           <Table.Cell width={3} data-bank={`${ifsc}`}>{bank_id}</Table.Cell>
           <Table.Cell width={3} data-bank={`${ifsc}`}>{address}</Table.Cell>
        </Table.Row>
    )
}

export default BankListRow;