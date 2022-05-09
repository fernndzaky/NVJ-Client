import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ClampLines from 'react-clamp-lines';

import '../css/index.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';


class Cart extends React.Component {
  constructor(){
    super()
    this.state = {
    }
  }




  addNavbarBorder = () => {
    var myNav = document.getElementById('nvj-navbar');
    var burgerButton = document.getElementsByClassName('bm-burger-button');
    window.onscroll = function () { 
        "use strict";
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
  }

  componentDidUpdate(){
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
        <div className='row page-container' style={{marginTop:'4vw'}}>
            <div className='col-md-6 col-xs-12 ps-0 pe-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Your Cart</p>
            </div>
        </div>

        {/* START OF CART SECTION*/}

        <form action='/checkout'>
        <div className='row page-container'>
            <div className='col-12 ps-0 pe-0'>
                {/* START OF ONE ITEM */}
                <div className='cart-wrapper mtm-5 mt-4' style={{padding:'4vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>

                    <div>
                        <ClampLines
                            text="Entrance Ticket to Dusun Butuh Nepal Van Java Di Magelang Jogjakarta Di sebelahnya ada"
                            id="cart-title-text"
                            lines={2}
                            ellipsis=".."
                            moreText="Expand"
                            lessText="Collapse"
                            innerElement="p"
                            className="px-18"
                        />
                        <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold',}}>Rp10,000</p>

                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <button className='btn-red px-18' style={{fontFamily:'Roboto Bold'}}>
                            Delete
                        </button>
                        <div className='cart-qty-wrapper' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <button className='btn-circle-white'>
                                <FontAwesomeIcon icon="minus" className='px-24' style={{cursor:'pointer'}} />
                            </button>
                            <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold',marginBottom:'0px',padding:'0vw 4vw'}}>1</p>
                            <button className='btn-circle-green'>
                                <FontAwesomeIcon icon="plus" className='px-24' style={{cursor:'pointer'}} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* END OF ONE ITEM */}
                {/* START OF ONE ITEM */}
                <div className='cart-wrapper mtm-5 mt-4' style={{padding:'4vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw',display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%'}}>

                    <div>
                        <ClampLines
                            text="Entrance Ticket to Dusun Butuh Nepal Van Java Di Magelang Jogjakarta Di sebelahnya ada"
                            id="cart-title-text"
                            lines={2}
                            ellipsis=".."
                            moreText="Expand"
                            lessText="Collapse"
                            innerElement="p"
                            className="px-18"
                        />
                        <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold',}}>Rp10,000</p>

                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <button className='btn-red px-18' style={{fontFamily:'Roboto Bold'}}>
                            Delete
                        </button>
                        <div className='cart-qty-wrapper' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                            <button className='btn-circle-white'>
                                <FontAwesomeIcon icon="minus" className='px-24' style={{cursor:'pointer'}} />
                            </button>
                            <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold',marginBottom:'0px',padding:'0vw 4vw'}}>1</p>
                            <button className='btn-circle-green'>
                                <FontAwesomeIcon icon="plus" className='px-24' style={{cursor:'pointer'}} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* END OF ONE ITEM */}
            </div>
        </div>
        {/* END OF CART SECTION*/}
        {/* START OF BOTTOM SECTION*/}
        <div className='row page-container mtm-5 mt-5'>
            <div className='col-12 ps-0 pe-0'>
                <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold'}}>Total:
                <span className='px-28'style={{fontFamily:'Roboto Bold',marginLeft:'2vw'}} >
                    Rp50,000
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
