import React,{createContext, useState} from "react";
import { useEffect } from "react";
// import all_product from '../Components/Assets/all_product'


export const ShopContext=createContext(null)

const getdefaultCart=()=>{
    let cart={};
    for (let index = 0; index < 300+1; index++) {
        cart[index]=0;
    }
    return cart;
 }
const ShopContextProvider=(props)=>{

//To display all product using api
    const[all_product,setAll_Product]=useState([]);
    const [cartItems,setCartItems]=useState(getdefaultCart());
//using useEffect displaying all product
    useEffect(()=>{
        fetch('http://localhost:4000/allproducts')
        .then((respone)=>respone.json())
        .then((data)=>setAll_Product(data))

    //Using api to fetch the cart data when user is logged in
    if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/getcart',{
        method:'POST',
        headers:{
            Accept:'application/form-data',
            'auth-token':`${localStorage.getItem('auth-token')}`,
            'Content-Type':'application/json',
        },
        body:"",
    
    }).then((respone)=>respone.json())
    .then((data)=>setCartItems(data))
    }
    },[])
    //[] used to run only one time when product will be mounted otherwise it will be run infinitely causing lag problem

    const addToCart=(itemId)=>{
        
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))

        //fetching from api if there is product and the user has already loged in and added the product
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtocart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart=(itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        //Using api to remove the cart data from database
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }


    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                let itemInfo=all_product.find((product)=>product.id===Number(item));
                totalAmount+=itemInfo.new_price* cartItems[item];
            }
        }
        console.log(totalAmount);
        return totalAmount;

    }

    const getTotalCartItems=()=>{
        let totalItem=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem+=cartItems[item];
            }
        }
                console.log(totalItem);
        return totalItem;
    }

    const contextValue={getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;