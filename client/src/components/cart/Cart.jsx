import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import './cart.css'
import { selectCartItemsCount, selectCartItems } from '../../redux/reselect/Selectors'
import CarItem from './CarItem'
const Cart = ({itemCount,  cartItems } ) => {
    const [show, showDropdown] = useState(false)
    return (
        <div className='cart-icon'>
            <ShoppingIcon className='shopping-icon' onClick={()=>showDropdown(!show)}/>
            {itemCount>0&& <span className='item-count'>{itemCount}</span>}
            { show &&<div className='cart-dropdown'>
                <div className='cart-items'>
                  {
                      cartItems.map(item => <CarItem key={item._id} item= {item}/>)
                  }
                 </div>
                <input className='gotocheckout' type = 'submit' value ='GO TO CHECKOUT' />
            </div> }
        </div>
    )
}
const mapStateToProps = state =>{
    return({
    cartItems: selectCartItems(state),
    itemCount: selectCartItemsCount(state)
    
})}
export default connect(mapStateToProps)(Cart)
