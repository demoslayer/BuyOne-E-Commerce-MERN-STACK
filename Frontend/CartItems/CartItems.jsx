import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


function CartItems() {
    const {getTotalCartAmount, all_product,cartItems,removeFromCart}=useContext(ShopContext);
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((cart)=>{
            if(cartItems[cart.id]>0)
            {
                return <div>
                <div className="cartitem-format cartitems-format-main">
                    <img src={cart.image} alt=""  className='carticon-product-icon'/>
                    <p>{cart.name}</p>
                    <p>Rs{cart.new_price}</p>
                    <button className='cartitems-quantity'>{cartItems[cart.id]}</button>
                    <p>Rs{cart.new_price*cartItems[cart.id]}</p>
                    <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(cart.id)}} alt="" />
                </div>
                <hr />
            </div>
            }
            return null;
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Total Amount</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping charge</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>{getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button>Proceed to Checkout</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have promocode enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text"  placeholder='promocode'/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems