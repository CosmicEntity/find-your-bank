import React, {useState, useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import BankList from '../../components/bank-list/bank-list.component';


function Favorites() {

  const [bankData, setBankData] = useState([])
  
  
  useEffect(()=>{
    let allFavouriteBanks = JSON.parse(localStorage.getItem('favorite_banks'))
    setBankData(allFavouriteBanks);
  },[])
  
  
  const handleFavorite = (ifsc)=>{
    const banks = JSON.parse(localStorage.getItem(`favorite_banks`))
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
             setBankData(favoriteBanks)
             localStorage.setItem('favorite_banks',JSON.stringify(favoriteBanks))
             //Removing from bank list
             const banks = JSON.parse(localStorage.getItem(`bank_details_${bank.city}`))
             banks.forEach(bank=>{
                 if(bank.ifsc===ifsc){
                     bank.favorite=!bank.favorite
                 }
             })
             localStorage.setItem(`bank_details_${bank.city}`,JSON.stringify(banks))
           }
         }
       }   
     })
    }
  
 
  return (
    <Container>
      <div className="table-header">
          <div>
            <h2 style={{marginTop:'20px'}}>FAVORITE BANKS</h2>
          </div>
         </div> 
        <BankList data={bankData} favoriteActionHandler={handleFavorite}/>
      </Container>
  );
}

export default Favorites;
