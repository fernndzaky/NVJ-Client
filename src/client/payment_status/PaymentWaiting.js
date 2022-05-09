import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import '../../css/index.css';

// Components Import
import Navbar from '../components/Navbar';



class PaymentWaiting extends React.Component {
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
            Payment Completed - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        
        {/* START OF TOP SECTION*/}
        <div className='row page-container upper-page-padding-small pb-4' style={{borderBottom:'0.5vw solid #DBE2E9'}}>
            <div className='col-12' style={{textAlign:'center'}}>
              <img className="img-fluid payment_status_icon" style={{width:'25vw',height:'25vw',objectFit:'contain'}} src="/assets/images/Payment_Waiting.png" alt="Payment Waiting" />

              <p className='px-28 mt-5 mtm-4' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Waiting for payment..</p>
              <a href="/payment-waiting" className='px-18 btn-outline-grey w-100 mtm-5 mt-4' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',backgroundColor:'#FFFFFF'}}>
              Refresh payment status
              </a>
              <p className='px-18 mtm-5 mt-4' style={{color:'#ED4747',fontFamily:'Roboto Bold'}}>Please do not close this page until you complete the payment.</p>

            </div>
        </div>
        {/* END OF TOP SECTION*/}

        {/* START OF PAYMENT INSTRUCTION SECTION*/}
        <div className='row page-container mt-5'>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>The payment details and instruction has been sent to the email</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>fernandhadzaky@hotmail.com</p>
            <p className='px-18 mt-4 mtm-5' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Please complete the payment to the bank details down below :</p>
            <div className='p-0 mt-4' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <p className='px-24' style={{color:'#1BC47D',fontFamily:'Nunito Semi Bold'}}>Grand Total</p>
              <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Rp30,000</p>

            </div>
            <div className='cart-wrapper' style={{padding:'5vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw'}}>
              <p className='px-24' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>BCA Virtual Account</p>
              <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>a/n PT. Venidici Indonesia</p>
              <p className='px-18 mt-4 mtm-5' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Account No:</p>
              <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'0px'}}>206823119718804</p>
              
            </div>   
          </div>

        </div>
        {/* END OF PAYMENT INSTRUCTION SECTION*/}

        {/* START OF BOOKINNG DETAILS SECTION*/}
        <div className='row page-container upper-page-padding-small' style={{borderBottom:'0.5vw solid #DBE2E9'}}>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Booking Details</p>

            <table className="table mt-4 mtm-5">
              <thead>
                <tr>
                  <th scope="col" className='px-18' style={{fontFamily:'Roboto Bold'}}>Ticket</th>
                  <th scope="col" className='px-18' style={{fontFamily:'Roboto Bold',textAlign:'right'}}>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* START OF ONE ITEM */}
                <tr>
                  <td style={{verticalAlign:'middle',paddingRight:'5vw'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                      <span style={{fontFamily:'Roboto Bold'}}>x1 </span>
                    Entrance Ticket to Dusun Butuh Nepal Van Java Di Magelang
                    </p>
                  </td>
                  <td style={{verticalAlign:'middle'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                    Rp10,000
                    </p>
                  </td>
                </tr>
                {/* END OF ONE ITEM */}
                {/* START OF ONE ITEM */}
                <tr>
                  <td style={{verticalAlign:'middle',paddingRight:'5vw'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                      <span style={{fontFamily:'Roboto Bold'}}>x2 </span>
                    Entrance Ticket to Dusun Butuh
                    </p>
                  </td>
                  <td style={{verticalAlign:'middle'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                    Rp10,000
                    </p>
                  </td>
                </tr>
                {/* END OF ONE ITEM */}

              </tbody>
            </table>

          </div>

          <div className='p-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Visit Date</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>17 Agustus 1945</p>
          </div>

        </div>
        {/* END OF BOOKING DETAILS SECTION*/}

        {/* START OF RESEND EMAIL SECTION*/}
        <div className='row page-container pb-5 mt-5'>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Have not received any email? </p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Click the button down below to resend to the previously filled email</p>
            <button className='px-18 btn-outline-grey w-100 mt-4' style={{fontFamily:'Roboto Bold',backgroundColor:'#FFFFFF'}}>
            Resend Email
            </button>
          </div>

        </div>
        {/* END OF RESEND EMAIL SECTION*/}

      </div>
      )
  }
}

export default PaymentWaiting;
