import React, {useState, useEffect} from 'react';
import {Container,Search} from 'semantic-ui-react';
import { CITY_OPTIONS, CATEGORIES, DEFAULT_CITY } from '../../components/constant';
import { getBankDetails } from '../../components/services.js';
import BankList from '../../components/bank-list/bank-list.component';
import DropdownMenu from '../../components/dropdown-menu/dropdown-menu.component';

import './homepage.styles.css';

function Homepage() {

  const [city, setCity] = useState(DEFAULT_CITY),
  [originalData, setOriginalData] = useState([]),
  [bankData, setBankData] = useState([]),
  [category, setCategory] = useState(null),
  [query, setQuery] = useState(''),
  [isLoading,setIsLoading] = useState(false)
  
  const transformData = (data) => {
    return data.map(bank => {
      const {bank_name,ifsc,branch,bank_id,address,city} = bank;
      return {bank_name,ifsc,branch,bank_id,address,city,...{favorite:false}};
    })
  }
 const handleFavorite = (ifsc)=>{
   const banks = JSON.parse(localStorage.getItem(`bank_details_${city}`))
    banks.forEach(bank =>{
      if(bank.ifsc===ifsc){
        bank.favorite = !bank.favorite
        let favoriteBanks = [];
        
        if(bank.favorite){
          if(localStorage.getItem('favorite_banks')){
            favoriteBanks = JSON.parse(localStorage.getItem('favorite_banks'))
            favoriteBanks.push(bank)
          }else{
            favoriteBanks.push(bank)
          }
          localStorage.setItem('favorite_banks',JSON.stringify(favoriteBanks));
        }else{
          if(localStorage.getItem('favorite_banks')){
            favoriteBanks = JSON.parse(localStorage.getItem('favorite_banks'))
            let index = favoriteBanks.findIndex(bank=>bank.ifsc===ifsc)
            favoriteBanks.splice(index,1)
            localStorage.setItem('favorite_banks',JSON.stringify(favoriteBanks))
          }
        }
      }   
    })
    
    localStorage.setItem(`bank_details_${city}`,JSON.stringify(banks))
    
    setBankData(banks)
    setOriginalData(banks)
   
 }

  useEffect(()=>{
    if(sessionStorage.getItem('city'))
    {
      const data = sessionStorage.getItem('city')
      setCity(data);
    }
  },[])
  
  useEffect(()=>{
    sessionStorage.setItem('city',city)
  },[city])

  useEffect(() => {
    setIsLoading(true)
    getBankDetails(city)
    .then(data => {
      setIsLoading(false)
      const cacheData = JSON.parse(localStorage.getItem(`bank_details_${city}`))
      let modifiedData
      if(!cacheData){
        modifiedData = transformData(data);
        localStorage.setItem(`bank_details_${city}`,JSON.stringify(modifiedData))
        setBankData(modifiedData)
        setOriginalData(modifiedData)
      }else{
      setBankData(cacheData)
      setOriginalData(cacheData)
      }
      
    }).catch(err => console.err(err));
  }, [city])

  useEffect(() => {
      if(!!category && !!query){
        
      const data =  originalData.filter(bank => { 
        if(category!=='bank_id'){
          return bank[category].toLowerCase().includes(query.toLowerCase())
        }else{
          return JSON.stringify(bank[category]).includes(query)
        }
      })
      setBankData(data)
    }else{
      setBankData(originalData)
    }
    
  }, [query,setBankData,originalData,category])

  return (
    <Container>
      <div className="table-header">
          <div>
            <h2 style={{marginTop:'20px'}}>Banks in {city}</h2>
          </div>
          <div className='query-container'>      
            <div className='query-fields'>
              <DropdownMenu options={CITY_OPTIONS} 
                placeholder='Select City' 
                onChange={(e,data)=>{
                  setCity(data.value)
                  setQuery('')
                }}
                value='city'
              />          
            </div>
            <div className='query-fields'>
              <DropdownMenu options={CATEGORIES} 
                placeholder='Select Categorie' 
                onChange={(e,data) => {
                setCategory(data.value)
                setQuery('')
                }}
                value={category}
                />
            </div>
            <div className='query-fields'>
                <Search 
                  showNoResults={false}
                  onSearchChange={(e,data)=>{
                    setQuery(data.value)
                  }}
                  value={query}
                  disabled={!category}
                />
            </div>
          </div>
        </div> 
        <BankList data={bankData} 
          city={city} 
          favoriteActionHandler={handleFavorite} 
          query_string={query}
          loading={isLoading}/>
      </Container>
  );
}

export default Homepage;
