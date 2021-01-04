import React from 'react';
import CartControl from './cartControl';


const controls = [
    {id:1,label: 'Pastries', type: 'pastries',price:100},
    {id:2,label: 'Salad', type: 'salad',price:120},
    {id: 3,label: 'Croissant', type: 'croissant', price: 230},
    {id: 4,label: 'Bacon', type: 'bacon', price: 250},
    {id: 5, label: 'Pepporony', type: 'pepporony', price: 110},

]


const CartControllers = (props) => {
    
    return (
    <div className = "">
         {controls.map(ctrl => {
            let item = props.cartItems.find(item=>item.id===ctrl.id)
            console.log("cartItemss",item)
            return (
         <CartControl
           counter ={item?item.quantity:0}
           key = {ctrl.label}
           label = {ctrl.label}
           added = {() => props.ingredientsAdded(ctrl)}
           removed = {() => props.ingredientsRemoved(ctrl)}
           />  
         )}

         
         )}
    </div>
)}; 

export default CartControllers