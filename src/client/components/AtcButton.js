import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../../css/index.css';


export default class AtcButton extends Component {


    addToCart(ticket_id){
      //get the current cart
      let current_cart = JSON.parse(localStorage.getItem('cart')) || [];

      //create empty cart if there is no item
      if(!current_cart.length){
        localStorage.setItem("cart", JSON.stringify(current_cart)); //store colors
        current_cart = JSON.parse(localStorage.getItem("cart")); //get them back
      }

      //check whether item is exists in cart
      let itemExists = 0
      for(var i in current_cart){
        //if ticket is already in the cart, get the current qty and increase by 1
        if(current_cart[i]['ticket_id'] === ticket_id){
          current_cart[i]['qty'] = current_cart[i]['qty'] + 1
          itemExists = 1
          break
        }          
      }
      
      //if the ticket is not in cart, add new one
      if(!itemExists){
        //add the id and increase the quantity
        current_cart.push({
          'ticket_id' : ticket_id,
          'qty' : 1
        })
      }
      //store to local storage
      localStorage.setItem("cart", JSON.stringify(current_cart));

      this.notify('Added to cart')


    }
    notify = (message) => toast(message);

    render(){
        return(
          <div >
            <button onClick={()=> this.addToCart(this.props.ticket_id)} className='btn-circle-grey-to-blue'>
                <FontAwesomeIcon icon="plus" className='px-24' style={{cursor:'pointer'}} />
            </button>

            <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
          </div>
          )
      }
}

