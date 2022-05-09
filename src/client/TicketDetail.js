import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import '../css/index.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import AtcButton from './components/AtcButton';
import BuyNowButton from './components/BuyNowButton';



class TicketDetail extends React.Component {
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
            Entrance Ticket to Dusun Butuh - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        
        {/* START OF TOP SECTION*/}
        <div className='row page-container mtm-5 ' style={{background: `url('/assets/images/BG_Image.png') no-repeat center`,
                                                    backgroundSize: '90%'}}>
            <div className='col-12 ps-0 pe-0'>
                <a href="/tickets" className='px-18 btn-outline-grey mb-2 mt-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block'}}>
                    <FontAwesomeIcon icon="chevron-left" className='px-18 me-2' />

                    Back</a>

                <p className='px-36 mt-3 mtm-5' style={{color:'#333333',fontFamily:'Nunito Bold'}}>Entrance Ticket to Dusun Butuh</p>
                <p className='px-28' style={{color:'#333333',fontFamily:'Nunito Bold'}}>Rp10,000</p>
                <p className='px-18 mt-4 mtm-5' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                <br></br>
                <br></br>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.
                </p>

            </div>
        </div>
        {/* END OF TOP SECTION*/}

        <BottomNavbar></BottomNavbar>

        <div className="bottom-navbar bottom-navbar-ticket-detail" style={{padding:'4vw',
            borderTop: '1.5vw solid #9FADBB'
        }} >
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <button className='px-18 btn-outline-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',background:'#FFFFFF'}}>
                    <FontAwesomeIcon icon="plus" className='px-18 me-2' />
                    Add to cart</button>
                <BuyNowButton></BuyNowButton>
              </div>
        </div>



      </div>
      )
  }
}

export default TicketDetail;
