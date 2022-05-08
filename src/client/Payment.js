import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import '../css/index.css';

// Components Import
import Navbar from './components/Navbar';



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
            Checkout - Dusun Butuh Nepal Van Java
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
                <a href="/cart" className='px-18 btn-outline-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',marginBottom:'8vw'}}>
                    <FontAwesomeIcon icon="chevron-left" className='px-18' style={{marginRight:'2vw'}} />

                    Back</a>

                <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'5vw'}}>Booking Details</p>

            </div>
        </div>
        {/* END OF TOP SECTION*/}
        {/* START OF BOOKINNG DETAILS SECTION*/}
        <div className='row page-container'>
          <div className='col-12 ps-0 pe-0'>
            <table className="table">
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
          <div className='p-0' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <p className='px-24' style={{color:'#1BC47D',fontFamily:'Nunito Semi Bold'}}>Booking Details</p>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Rp30,000</p>

          </div>

        </div>
        {/* END OF BOOKING DETAILS SECTION*/}

        <form>

        {/* START OF PERSONAL INFORMATION SECTION*/}
        <div className='page-container upper-page-padding-small'>  
  
          <div style={{padding:'5vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw'}}>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'5vw'}}>Personal Information</p>
            <div className='row'>
              <div className='col-6 ps-0 '>
                  <input  name="full_name" type="text" class="px-18" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Full Name" />
              </div> 
              <div className='col-6 pe-0 '>
                  <input  name="phone_number" type="text" class="px-18" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Phone Number" />
              </div> 
              <div className='col-12 pe-0 ps-0 mtm-5'>
                  <input  name="email" type="email" class="px-18" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Email" />
              </div> 

            </div>
          </div>    
          
          <div style={{display:'flex',alignItems:'center',marginTop:'5vw'}}>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px',width:'50%'}}>Visit Date</p>
            <input  name="visit_date" type="date" class="px-18" style={{marginLeft:'2vw',height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Email" />


          </div>  
        </div>
        {/* END OF PERSONAL INFORMATION SECTION*/}

        <div className='row page-container mtm-5 pb-5'>
          <button type="submit" className='px-18 btn-grey mtm-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%',border:'none'}}>Confirm Order</button>

        </div>
        </form>

      </div>
      )
  }
}

export default TicketDetail;
