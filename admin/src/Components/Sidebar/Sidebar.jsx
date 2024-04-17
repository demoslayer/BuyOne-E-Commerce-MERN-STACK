import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product from '../../assets/Product_Cart.png'
import list_product_icon from '../../assets/Product_list_icon.png'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product} className='addproduct' alt="" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} className='addproduct' alt="" />
                <p>Product list</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar