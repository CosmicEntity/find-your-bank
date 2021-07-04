const BASE_URL = 'https://vast-shore-74260.herokuapp.com'


export const getBankDetails = (city) => {
   const getCacheData = localStorage.getItem(`bank_details_${city}`)
   if(!!getCacheData){
      const data = JSON.parse(getCacheData)
      return Promise.resolve(data)
   }
   return fetch(`${BASE_URL}/banks?city=${city}`).then(response => response.json())
} 

