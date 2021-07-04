import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { Table, Container, Pagination, Dimmer, Loader } from 'semantic-ui-react';
import BankListRow from './bank-list-row.component';
import { DEFAULT_ROW_SIZE} from '../constant'

import './bank-list.styles.css'

const BankList = (props) => {
    
    const {data,city,query_string,favoriteActionHandler,loading} = props,
    bankData = data,
    [activePage, setActivePage] = useState(1),
    [paginatedData, setPaginatedData] = useState([]),
    [rowSize, setRowSize] = useState(DEFAULT_ROW_SIZE),
    history = useHistory();
    
    const handlePageChange = (e, {activePage})=>{
        setActivePage(activePage);
    }

    useEffect(()=>{
      setPaginatedData([])
    },[bankData])

    
    useEffect(() => {
      const startIndex = (activePage-1)*rowSize,
      endIndex=startIndex+rowSize;
      setPaginatedData(bankData.slice(startIndex,endIndex))

    }, [activePage,bankData, rowSize])

    useEffect(() => {
      if(query_string){
        setActivePage(1)
      }
    }, [query_string])

    useEffect(() => {
      
      setActivePage(1)
      
    }, [city])
    

    return (
        <Container>
        <Table celled unstackable selectable inverted>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>FAVORITE</Table.HeaderCell>
            <Table.HeaderCell>BANK</Table.HeaderCell>
            <Table.HeaderCell>IFSC</Table.HeaderCell>
            <Table.HeaderCell>BRANCH</Table.HeaderCell>
            <Table.HeaderCell>BANK ID</Table.HeaderCell>
            <Table.HeaderCell>ADDRESS</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {!loading ? (
        <Table.Body onClick={e=>{
          if(paginatedData.length){
            if(e.target.dataset.bank){
            history.push({
            pathname:`/all-banks/${e.target.dataset.bank}`,
            state:{city:city}
            })}
            if(e.target.dataset.favorite){
              favoriteActionHandler(e.target.dataset.favorite)
            }
          }
        }}>
          {
            paginatedData.length ?
            paginatedData.map(bank => 
              <BankListRow bank={bank} key={bank.ifsc} />
            ):( <Table.Row>
                  <Table.HeaderCell colSpan='6'>
                    <h3 style={{textAlign:'center'}}>No Favorite Banks Available</h3>
                  </Table.HeaderCell>
                </Table.Row>
                )
          }
        </Table.Body>
          ): (<Table.Body>
              <Table.Row>
                <Table.HeaderCell colSpan='6'>
                  <Loader active inverted inline='centered'>Loading...</Loader>  
                </Table.HeaderCell>
              </Table.Row>
            </Table.Body>
            )
        }
        <Table.Footer fullWidth>
            <Table.Row>
                <Table.HeaderCell colSpan='6'>
                <span className='row-details'>Rows per page: {paginatedData.length}
                </span>
               { !!Math.ceil(bankData.length/(rowSize)) &&(<Pagination 
                  totalPages={Math.ceil(bankData.length/(rowSize))} 
                  floated='right'
                  activePage={activePage}
                  onPageChange={handlePageChange}
                  color={'grey'}
                  inverted/>)}
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
        </Table>
       </Container>     
        
    )
}

export default BankList;