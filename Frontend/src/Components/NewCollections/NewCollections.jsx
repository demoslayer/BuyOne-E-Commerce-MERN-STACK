import React, { useEffect, useState } from 'react'
import './NewCollections.css'
// import new_collection from '../Assets/new_collections'
import Item from '../Item/Item'

function NewCollections() {

const [new_collection,setNew_collection]=useState([]);

//getting new collection using useEffect
useEffect(()=>{
 fetch('http://localhost:4000/newcollections')
 .then((response)=>response.json())
 .then((data)=>setNew_collection(data));
},[]);
//[] is used so that when one time anthing is uploaded that time only it is being refreshed otherwise it will be refreshing so man
 //times causing like it is hanging

  return (
    <div className='new-collections'>
<h1>NEW COLLECTIONS</h1>
<hr />
<div className="collections">
{new_collection.map((item,i)=>{
 return <Item key={i} id={item.id} name={item.name} image={item.image}old_price={item.old_price} new_price={item.new_price} />
})}
</div>

    </div>
  )
}

export default NewCollections