import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ClampLines from 'react-clamp-lines';
import NumberFormat from 'react-number-format';
import { Loading, Progress } from "react-loading-ui";


import '../css/index.css';
import api from "../helpers/api";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';


class Cart extends React.Component {
  constructor(){
    super()
    this.state = {
        tickets     : [],
        totalPrice  : 0,
        progress    : 1 
    }
  }




  addNavbarBorder () {
    var myNav = document.getElementById('nvj-navbar');
    var burgerButton = document.getElementsByClassName('bm-burger-button');
    window.onscroll = function () { 
        if (document.body.scrollTop >= 10 || document.documentElement.scrollTop >= 10 ){
            myNav.classList.add("nav-colored");
            myNav.classList.add("nav-scroll-padding");
            burgerButton[0].classList.add("burger-scroll-top");
            myNav.classList.remove("nav-transparent");
        } 
        else {
            myNav.classList.add("nav-transparent");
            myNav.classList.remove("nav-colored");
            myNav.classList.remove("nav-scroll-padding");
            burgerButton[0].classList.remove("burger-scroll-top");

        }
    };
  }

  



  componentDidMount(){
    this.addNavbarBorder()
    this.getUserCart()
    this.getTicketsFromCart()
    
  }

  componentDidUpdate(){
  }

  showLoading(){
    /* Show loading-ui */
    Loading({title:'Loading', text:'Memuat konten, harap menunggu..',theme:'dark',progress:true,progressedClose :true});
    let interval = null;

    interval = setInterval(() => {
      this.setState({ progress: this.state.progress + 4 }, () => {
        // Set Progress Value
        Progress(this.state.progress);

        if (this.state.progress >= 100) {
          this.setState({ progress: 0 });
          clearInterval(interval);
        }
      });
    }, 100);
  }


  getUserCart(){
    //get the current cart
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    let ticket_ids = []

    for(var i in current_cart)
        ticket_ids.push(current_cart[i]['ticket_id'])
  }

  getTotalPrice = async() =>{
    await this.setState({
        totalPrice : 0
    })
    for(var i in this.state.tickets){
        let price = this.state.tickets[i].price * this.state.tickets[i].qty
        await this.updateTotalPrice('plus',price)
    }
  }

  updateTotalPrice = (action,amount) =>{
      if(action === 'plus')
        this.setState({
            totalPrice : this.state.totalPrice + amount
        })
      
      else
        this.setState({
            totalPrice : this.state.totalPrice - amount
        })
      
  }

  updateTicketStateQty = async(ticket_id,new_qty) =>{  
    // 1. Make a shallow copy of the items
    let tickets = [...this.state.tickets]
    // 2. find the index from the state tickets
    var index = tickets.findIndex(p => p.id === ticket_id)
    // 3. Make a shallow copy of the item you want to mutate
    let ticket = {...tickets[index]}
    // 4. Replace the property you're intested in
    ticket.qty = new_qty
    // 5. Put it back into our array
    tickets[index] = ticket
    // 6. Set the state to our new copy
    await this.setState({tickets})

  }

  getTicketsFromCart = async()=>{


    //get all ticket id from local storage
    let ticket_ids = JSON.parse(localStorage.getItem('cart')) || [];
    let queryString = ""
    for(var i in ticket_ids){
        queryString += "id="+ticket_ids[i]['ticket_id']
        if(ticket_ids.length > 1)
            queryString += "&"
    }

    const headers = {
        'accept': '*/*',
    }
    
    //if theres an item inside the cart
    if(queryString){

        this.showLoading()

        await api.post('/client/tickets/findByIds?'+queryString, {
            headers: headers
        })
            
        .then((response) => {
            if(response.data.success){
                this.setState({
                    tickets : response.data.content
                })
            }
    
        })
        .catch((error) => {
            if(error.response.data.errorMessage === 'The requested ticket does not exists')
            window.location.href = '/404'
        })
        
        //update the qty based on local storage
        let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
        for(var x in current_cart){
            await this.updateTicketStateQty(current_cart[x]['ticket_id'], current_cart[x]['qty'] )
        }
    
        this.getTotalPrice()
        
    }
    else{
        await this.setState({
            tickets     : [],
            totalPrice  : 0
        })
    }
    
  }




  removeFromCart = async (ticket_id,price) =>{
    //remove from local storage
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    for(var i in current_cart){
        if(current_cart[i]['ticket_id'] === ticket_id){
            current_cart.splice(i, 1);
            break
        }          
    }

    localStorage.setItem("cart", JSON.stringify(current_cart));

    //get new tickets based on newly updated local storage
    await this.getTicketsFromCart()
    
    this.notify('Item berhasil dihapus!')

  }

  handleQtyChange(action,ticket_id, new_qty, ticket_price){
    if(new_qty > 0){
        this.updateTicketStateQty(ticket_id,new_qty)
        //update qty in the local storage
        let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
        for(var i in current_cart){
            if(current_cart[i]['ticket_id'] === ticket_id){
                current_cart[i]['qty'] = new_qty
                this.updateTotalPrice(action,ticket_price)
                break
            }          
        }
    
        localStorage.setItem("cart", JSON.stringify(current_cart));


    }
  }



  notify = (message) => toast(message);


  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            Keranjang - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        <div className='row page-container mtm-5 mt-3'>
            <div className='col-md-6 col-xs-12 ps-0 pe-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Keranjang</p>
            </div>
        </div>

        {/* START OF CART SECTION*/}

        <div className='row page-container'>
            <div className='col-12 ps-0 pe-0'>
            {
                this.state.tickets.map( (e , index) => {
                
                return(
                    <React.Fragment>
                        {/* START OF ONE ITEM */}
                        {
                            <div  className='cart-wrapper mtm-5 mt-4' style={{padding:'4vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>
                                <a href={'/ticket/'+e.id} style={{textDecoration:'none'}}>
                                    <ClampLines
                                        text={e.title}
                                        id="cart-title-text"
                                        lines={2}
                                        ellipsis=".."
                                        moreText="Expand"
                                        lessText="Collapse"
                                        innerElement="p"
                                        className="px-18"
                                    />
                                    <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold',}}>
                                        <NumberFormat value={e.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                                    </p>

                                </a >
                                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                    <div onClick={()=> this.removeFromCart(e.id,e.price)}  className='btn-red px-18' style={{fontFamily:'Roboto Bold',cursor:'pointer'}}>
                                        Hapus
                                    </div>
                                    <div className='cart-qty-wrapper' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                        <div onClick={()=> this.handleQtyChange('minus',e.id,e.qty-1,e.price)} className='btn-circle-white' style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon="minus" className='px-24' style={{cursor:'pointer'}} />
                                        </div>
                                        <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold',marginBottom:'0px',padding:'0vw 4vw'}}>{e.qty}</p>
                                        <div onClick={()=> this.handleQtyChange('plus',e.id,e.qty+1,e.price)} className='btn-circle-green' style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon="plus" className='px-24' style={{cursor:'pointer'}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        {/* END OF ONE ITEM */}
                    </React.Fragment>

                    )
                })              
            } 
                

            </div>
        </div>
        {/* END OF CART SECTION*/}
        {/* START OF BOTTOM SECTION*/}

        {this.state.tickets.length > 0 ?
            <div className='row page-container mtm-5 mt-5'>
                <div className='col-12 ps-0 pe-0'>
                    <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold'}}>Total:
                    <span className='px-28'style={{fontFamily:'Roboto Bold',marginLeft:'2vw'}} >
                        <NumberFormat value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                    </span>
                    </p>
                    <div className='mtm-5 mt-4' style={{padding:'0'}}>
                        <a href="/checkout" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Checkout</a>
                    </div>
                </div>
            </div>
            :
            <div className='row page-container mtm-5 mt-5'>
                <div className='col-12 ps-0 pe-0'>
                    <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold'}}>Belum ada tiket di dalam keranjang anda..
                    </p>

                    <div className='mtm-5 mt-4' style={{padding:'0'}}>
                        <a href="/tickets" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Semua Tiket</a>
                    </div>

                </div>
            </div>
            }
        {/* END OF BOTTOM SECTION*/}
        <BottomNavbar></BottomNavbar>

        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          {/* Same as */}
          <ToastContainer />

      </div>
      )
  }
}

export default Cart;
