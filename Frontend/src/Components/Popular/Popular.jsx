import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data';
import Item from '../Item/Item';


function Popular() {
 //Fetching api from backend of popularinwomen

 const[popularProducts,setPopularProducts]=useState([]);

 //same useEffect is used to fetch api and set in setPopularProducts to display on frontend

 useEffect(()=>{
  fetch('http://localhost:4000/popularinwomen')
  .then((response)=>response.json())
  .then((data)=>setPopularProducts(data));
 },[])
 
  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr />
        <div className="popular-item">
            {popularProducts.map((item,i)=>
            {
                return <Item key={i} id={item.id} name={item.name} image={item.image} old_price={item.old_price} new_price={item.new_price}/>
            })}
        </div>
    </div>
  )
}

export default Popular