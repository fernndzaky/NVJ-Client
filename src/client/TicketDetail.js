import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import '../css/index.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import BuyNowButton from './components/BuyNowButton';



class TicketDetail extends React.Component {
  constructor(){
    super()
    this.state = {
      title : null,
      price : null,
      description : null,
      ticket_id : null
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
      title : 'Entrance Ticket to Dusun Butuh',
      price : 10000,
      description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text.',
      ticket_id : 1
    })
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

                    Back</a>
            </div>
        </div>
        <div className='row page-container mtm-5 ' style={{background: `url('/assets/images/BG_Image.png') no-repeat center`,
                                                    backgroundSize: '90%'}}>
            <div className='col-12 ps-0 pe-0'>
              

                <p className='px-36 mt-3 mtm-5' style={{color:'#333333',fontFamily:'Nunito Bold'}}>{this.state.title}</p>
                <p className='px-28' style={{color:'#333333',fontFamily:'Nunito Bold'}}>Rp{this.state.price}</p>
                <p className='px-18 mt-4 mtm-5' style={{color:'#333333',fontFamily:'Roboto Regular',whiteSpace:'pre-wrap'}}>{this.state.description}
                </p>

            </div>
        </div>
        {/* END OF TOP SECTION*/}

        <BottomNavbar></BottomNavbar>

        <div className="bottom-navbar bottom-navbar-ticket-detail" style={{padding:'4vw',
            borderTop: '1.5vw solid #9FADBB'
        }} >
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <button onClick={()=> this.addToCart(this.state.ticket_id)}  className='px-18 btn-outline-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',background:'#FFFFFF'}}>
                    <FontAwesomeIcon icon="plus" className='px-18 me-2' />
                    Add to cart</button>
                <BuyNowButton></BuyNowButton>
              </div>
        </div>


        <ToastContainer
          position="top-right"
          autoClose={5000}
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
