import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ClampLines from 'react-clamp-lines';
import NumberFormat from 'react-number-format';


import '../css/index.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';


class Cart extends React.Component {
  constructor(){
    super()
    this.state = {
        tickets : [],
        totalPrice : 0
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


  getUserCart(){
    //get the current cart
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    let ticket_ids = []

    for(var i in current_cart)
        ticket_ids.push(current_cart[i]['ticket_id'])
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

  updateTicketStateQty(ticket_id,new_qty){   
    // 1. Make a shallow copy of the items
    let tickets = [...this.state.tickets];
    // 2. find the index from the state tickets
    var index = tickets.findIndex(p => p.ticket_id === ticket_id);
    // 3. Make a shallow copy of the item you want to mutate
    let ticket = {...tickets[index]}
    // 4. Replace the property you're intested in
    ticket.qty = new_qty
    // 5. Put it back into our array
    tickets[index] = ticket;
    // 6. Set the state to our new copy
    this.setState({tickets});
    
  }

  getTicketsFromCart = async()=>{
    await this.setState({
        tickets : [
            {
                ticket_id   : 1,
                title       : 'Entrance Ticket to Dusun Butuh',
                price       : 10000,
                qty         : 0
            },
            {
                ticket_id   : 2,
                title       : 'Entrance Ticket to Dusun Butuh Nepal Van Java',
                price       : 15000,
                qty         : 0
            },
            {
                ticket_id   : 3,
                title       : 'Exit Ticket from NVJ',
                price       : 30000,
                qty         : 0
            },
        ]
    })


    //update the qty based on local storage
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    for(var x in current_cart){
        this.updateTicketStateQty(current_cart[x]['ticket_id'], current_cart[x]['qty'] )
        this.updateTotalPrice('plus',0)
    }

    for(var i in this.state.tickets){
        let price = this.state.tickets[i].price * this.state.tickets[i].qty
        this.updateTotalPrice('plus',price)
    }
    
  }
  
  

  removeFromCart = async (ticket_id) =>{
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
    this.getTicketsFromCart()
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
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Your Cart</p>
            </div>
        </div>

        {/* START OF CART SECTION*/}

        <form action='/checkout'>
        <div className='row page-container'>
            <div className='col-12 ps-0 pe-0'>
            {
                this.state.tickets.map( (e , index) => {
                
                return(
                    <React.Fragment>
                        {/* START OF ONE ITEM */}
                        {
                            <div  className='cart-wrapper mtm-5 mt-4' style={{padding:'4vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>
                                <a href={'/ticket/'+1} style={{textDecoration:'none'}}>
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
                                    <div className='btn-red px-18' style={{fontFamily:'Roboto Bold',cursor:'pointer'}}>
                                        Delete
                                    </div>
                                    <div className='cart-qty-wrapper' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                                        <div onClick={()=> this.handleQtyChange('minus',e.ticket_id,e.qty-1,e.price)} className='btn-circle-white' style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon="minus" className='px-24' style={{cursor:'pointer'}} />
                                        </div>
                                        <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold',marginBottom:'0px',padding:'0vw 4vw'}}>{e.qty}</p>
                                        <div onClick={()=> this.handleQtyChange('plus',e.ticket_id,e.qty+1,e.price)} className='btn-circle-green' style={{cursor:'pointer'}}>
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
        <div className='row page-container mtm-5 mt-5'>
            <div className='col-12 ps-0 pe-0'>
                <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold'}}>Total:
                <span className='px-28'style={{fontFamily:'Roboto Bold',marginLeft:'2vw'}} >
                    <NumberFormat value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                </span>
                </p>

                <button type="submit" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%',border:'none'}}>Checkout</button>


            </div>
        </div>
        </form>
        {/* END OF BOTTOM SECTION*/}
        <BottomNavbar></BottomNavbar>



      </div>
      )
  }
}

export default Cart;
