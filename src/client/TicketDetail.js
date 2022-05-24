import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import NumberFormat from 'react-number-format';

import '../css/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import BuyNowButton from './components/BuyNowButton';
import AtcButton from './components/AtcButton';



class TicketDetail extends React.Component {
  constructor(){
    super()
    this.state = {
      title               : null,
      price               : null,
      description         : null,
      ticket_id           : null,
      purchaseAble        : null,
      phoneNumber         : null,
      contactName         : null,
      openIncrementWidget : 0,
      qty                 : 0,
      notYetOpened        : true
    }
  }

  addNavbarBorder = () => {
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
    this.getTicketDetail()
  }

  componentDidUpdate(){
  }

  getTicketDetail = async() =>{
    await this.setState({
      title         : 'Entrance Ticket to Dusun Butuh',
      price         : 10000,
      description   : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text.',
      ticket_id     : 1,
      purchaseAble  : false,
      phoneNumber   : '+628111377893',
      contactName   : 'Pak Lilik Setiyawan',
      qty           : 0
    })
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    for(var x in current_cart){
      if(this.state.ticket_id == current_cart[x]['ticket_id']){
        this.setState({
          qty : current_cart[x]['qty']
        })
        break
      }
    }
  }


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


    this.notify('Succesfully added to cart!')

  }

  openIncrementWidget = async() =>{
    console.log('hit open')
    if(this.state.notYetOpened){
        await this.setState({
            notYetOpened : false
        })
    }
    
    await this.setState({
        openIncrementWidget : 1,
    })
  }

  handleQtyChange = async(action,ticket_id, new_qty) =>{
      if(new_qty > 0){
          if(action === 'plus'){
              this.addToCart(this.props.ticket_id)
          }

          await this.setState({
              qty : new_qty
          })
          //update qty in the local storage
          let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
          for(var i in current_cart){
              if(current_cart[i]['ticket_id'] === ticket_id){
                  current_cart[i]['qty'] = new_qty
                  break
              }          
          }
          localStorage.setItem("cart", JSON.stringify(current_cart));
      }
      //close the increment widget, if it hits zero
      else{
          await this.setState({
              openIncrementWidget : 0,
              qty : 0
          })
          if(new_qty <= 0)
              this.removeFromCart(this.props.ticket_id)
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
  }





  notify = (message) => toast(message);


  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            {this.state.title}
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        
        {/* START OF TOP SECTION*/}
        <div className='row page-container' style={{marginTop:'4vw'}}>
            <div className='col-12 ps-0 pe-0'>
              <a href="javascript:history.back()" className='px-18 btn-outline-grey mb-2 mt-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block'}}>
                    <FontAwesomeIcon icon="chevron-left" className='px-18 me-2' />

                    Kembali</a>
            </div>
        </div>
        <div className='row page-container mtm-5 ' style={{background: `url('/assets/images/BG_Image.png') no-repeat center`,
                                                    backgroundSize: '90%'}}>
            <div className='col-12 ps-0 pe-0 mt-4'>
              

                <p className='px-36 mt-3 mtm-5' style={{color:'#333333',fontFamily:'Nunito Bold'}}>{this.state.title}</p>
                {this.state.purchaseAble &&                
                <p className='px-28 mt-5 pb-5' style={{color:'#333333',fontFamily:'Nunito Regular'}}>
                  <NumberFormat value={this.state.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />/orang
                </p>

                }
                {/* START OF CONTACT US */}
                {!this.state.purchaseAble &&                
                <div className='col-12 pe-0 plm-0  mt-4 mb-5' style={{backgroundColor:'white'}}>
                    <div className='contact-us-wrapper mtm-5' style={{padding:'5vw',boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',borderRadius:'4vw'}}>
                        <div style={{display:'flex',alignItems:'flex-start'}}>
                            <FontAwesomeIcon icon="user" className='px-24' style={{color:'#9FADBB'}} />
                            <p className='px-18 ms-3' style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>{this.state.contactName}</p>
                        </div>
                        <div id="contact-us-item-wrapper" style={{display:'flex',alignItems:'flex-start',marginTop:'8vw'}}>
                            <FontAwesomeIcon icon="phone" className='px-24' style={{color:'#9FADBB'}} />
                            <p className='px-18 ms-3' style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>{this.state.phoneNumber}</p>
                        </div>

                    </div>
                </div>


                }
                {/* END OF CONTACT US */}
                <p className='px-18 mt-5 mtm-5' style={{color:'#333333',fontFamily:'Roboto Regular',whiteSpace:'pre-wrap',textAlign:'justify'}}>{this.state.description}
                </p>

            </div>
        </div>
        {/* END OF TOP SECTION*/}

        <BottomNavbar></BottomNavbar>
        {this.state.purchaseAble ?               

        <div className="bottom-navbar bottom-navbar-ticket-detail" style={{padding:'4vw',
            borderTop: '1.5vw solid #9FADBB' }} >
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                {/* 
                <button onClick={()=> this.addToCart(this.state.ticket_id)}  className='px-18 btn-outline-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',background:'#FFFFFF'}}>
                  <FontAwesomeIcon icon="plus" className='px-18 me-2' />
                  Keranjang
                </button>
                */}
                
                {this.state.openIncrementWidget  === 1 ?
                  <div className='cart-qty-wrapper' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                      <div onClick={()=> this.handleQtyChange('minus',this.state.ticket_id,this.state.qty-1)} className='btn-circle-white' style={{cursor:'pointer'}}>
                          <FontAwesomeIcon icon="minus" className='px-24' style={{cursor:'pointer'}} />
                      </div>
                      <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold',marginBottom:'0px',padding:'0vw 4vw'}}>{this.state.qty}</p>
                      <div onClick={()=> this.handleQtyChange('plus',this.state.ticket_id,this.state.qty+1)} className='btn-circle-green' style={{cursor:'pointer'}}>
                          <FontAwesomeIcon icon="plus" className='px-24' style={{cursor:'pointer'}} />
                      </div>
                  </div>
                  :
                  <div onClick={()=> this.openIncrementWidget()}>
                      <AtcButton></AtcButton>
                  </div>
                  }

                <BuyNowButton></BuyNowButton>
              </div>
        </div>

        :

        <div className="bottom-navbar bottom-navbar-ticket-detail" style={{padding:'4vw',
            borderTop: '1.5vw solid #9FADBB' }} >
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                
                <button onClick={()=> window.open("https://api.whatsapp.com/send?phone="+this.state.phoneNumber+"&text=Hello%2C%20World!", "_blank")} className='btn-green-to-white' style={{width:'100%'}}>
                    <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>
                    <FontAwesomeIcon icon="phone" className='px-18 me-2' />
                    Kontak Via Whatsapp
                    </p>
                </button>
              </div>
        </div>
        }


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

export default TicketDetail;
