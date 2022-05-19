import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ClampLines from 'react-clamp-lines';
import {isMobile} from 'react-device-detect';

import '../css/index.css';
import '../css/HomePage.css';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination
  } from 'swiper/core';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// Components Import
import TicketCard from './components/TicketCard';
import FreeTicketCard from './components/FreeTicketCard';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';


class HomePage extends React.Component {
  constructor(){
    super()
    this.state = {
        tickets     : [],
        ticketType  : 'tickets'
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
    this.getAllTickets()
  }

  componentDidUpdate(){
  }

  updateTicketStateQty = async(ticket_id,new_qty) =>{  
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
    await this.setState({tickets});

  }

  getAllTickets = async() =>{
    await this.setState({
        tickets : [
            {
                ticket_id    : 1,
                title        : 'Entrance Ticket to Dusun Butuh',
                price        : 10000,
                qty          : 0,
                purchaseAble : true
            },
            {
                ticket_id    : 2,
                title        : 'Entrance Ticket to Dusun Butuh Nepal Van Java',
                price        : 15000,
                qty          : 0,
                purchaseAble : true

            }
        ]
    })

    //update the qty based on local storage
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    for(var x in current_cart){
        this.updateTicketStateQty(current_cart[x]['ticket_id'], current_cart[x]['qty'] )
    }
  }


  changeTicketType = async(type) =>{
        if(type === 'tickets'){
            await this.setState({
                tickets : [
                    {
                        ticket_id    : 1,
                        title        : 'Entrance Ticket to Dusun Butuh',
                        price        : 10000,
                        qty          : 0,
                        purchaseAble : true
                    },
                    {
                        ticket_id    : 2,
                        title        : 'Entrance Ticket to Dusun Butuh Nepal Van Java',
                        price        : 15000,
                        qty          : 0,
                        purchaseAble : true
        
                    }
                ],
                ticketType : 'tickets'
            })
        }
        else if(type === 'packages'){
            await this.setState({
                tickets : [
                    {
                        ticket_id    : 4,
                        title        : 'Home Stay at Dusun Butuh',
                        price        : 10000,
                        qty          : 0,
                        purchaseAble : false
                    },
                    {
                        ticket_id    : 5,
                        title        : 'Agri Culture at Teras Nepal',
                        price        : 15000,
                        qty          : 0,
                        purchaseAble : false
        
                    }
                ],
                ticketType : 'packages'
            })
        }
  }





  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>

        {/* START OF TOP CONTENT */}
        <div >
            {/* START OF TOP CAROUSEL */}
            <div id="banner_carousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#banner_carousel" data-slide-to={0} className="active" />
                    <li data-target="#banner_carousel" data-slide-to={1} />
                    <li data-target="#banner_carousel" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_1.png" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_2.png" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_1.png" alt="Third slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#banner_carousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                </a>
                <a className="carousel-control-next" href="#banner_carousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                </a>
            </div>
            {/* END OF TOP CAROUSEL */}
            <div className='row page-container upper-page-padding-small'>
                <div className='col-xs-12 ps-0 pe-0'>
                    <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Dusun Butuh
                    On-Site Experience</p>
                </div>
                <div className='col-xs-12 ps-0 pe-0 mt-3 mtm-5' >
                    <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. </p>
                    <div className='mtm-5 mt-5' style={{padding:'0'}}>
                        <a href="/experiences" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View All Experiences</a>
                    </div>
                </div>
            </div>

        </div>
        {/* END OF TOP CONTENT */}


        {/* START OF AVAILABLE TICKETS */}

        <div className='row upper-page-padding-small page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Available Tickets</p>
                {/* START OF TOGGLE */}
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div onClick={()=> this.changeTicketType("tickets")} className={this.state.ticketType === 'tickets' ? "ticket-blue-btn ticket-blue-btn-active" : "ticket-blue-btn"}  style={{borderRadius:'10px 0px 0px 10px',width:'50%'}}>
                        <p className="px-18" style={{fontFamily: 'Roboto Bold',marginBottom:'0px'}}>Tickets</p>
                    </div>
                    <div onClick={()=> this.changeTicketType("packages")} className={this.state.ticketType === 'packages' ? "ticket-blue-btn ticket-blue-btn-active" : "ticket-blue-btn"} style={{borderRadius:'0px 10px 10px 0px',width:'50%'}}>
                        <p className="px-18" style={{fontFamily: 'Roboto Bold',marginBottom:'0px'}}>Packages</p>
                    </div>
                </div>
                {/* END OF TOGGLE */}
            </div>
            <div className='mt-5 mtm-5'>

            </div>

            {
                this.state.tickets.map( (e , index) => {
                return(
                    <React.Fragment>
                        {
                        index === 0 ?
                        <div  className='p-0'>
                            {!e.purchaseAble ?
                            <FreeTicketCard ticket_id={e.ticket_id} title={e.title} ></FreeTicketCard>
                                :
                            <TicketCard ticket_id={e.ticket_id} title={e.title} price={e.price} qty={e.qty} ></TicketCard>
                            }
                        </div>
                        :
                        <div  className='p-0 mtm-5 mt-4'>
                            {!e.purchaseAble ?
                            <FreeTicketCard ticket_id={e.ticket_id} title={e.title} ></FreeTicketCard>
                            :
                            <TicketCard ticket_id={e.ticket_id} title={e.title} price={e.price} qty={e.qty}></TicketCard>
                            }
                        </div>
                        }
                    </React.Fragment>

                    )
                })              
            } 

            <div className='mtm-5 mt-5' style={{padding:'0'}}>
                <a href="/tickets" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View All Tickets</a>
            </div>
        </div>


        {/* END OF AVAILABLE TICKETS */}

        {/* START OF GALLERIES */}
        <div className='row upper-page-padding page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Galleries</p>
            </div>
        </div>
        {/* START OF GALLERY CAROUSEL */}
        <div id="gallery_carousel" className="carousel slide mtm-5 mt-4" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#gallery_carousel" data-slide-to={0} className="active" />
                <li data-target="#gallery_carousel" data-slide-to={1} />
                <li data-target="#gallery_carousel" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_2.png" alt="First slide" />
                </div>
                <div className="carousel-item">
                <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_1.png" alt="Second slide" />
                </div>
                <div className="carousel-item">
                <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_2.png" alt="Third slide" />
                </div>
            </div>
            <a className="carousel-control-prev" href="#gallery_carousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a className="carousel-control-next" href="#gallery_carousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
        </div>
        {/* END OF GALLERY CAROUSEL */}
        {/* END OF GALLERIES */}


        {/* START OF TESTIMONIES */}
        <div className='row upper-page-padding'>
                <div className='col-12 page-container'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Testimonies</p>
                </div>
            <div className='col-12 page-container-left pe-0 mt-4 mtm-5'>
                <Swiper
                    slidesPerView={1.3}
                    spaceBetween={35}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/Dummy_Testimony_1.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard.”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Fernandha Dzaky Saputra Aziz</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/Dummy_Image_1.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard.”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Fernandha Dzaky Saputra Aziz</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/Dummy_Testimony_1.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard.”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Fernandha Dzaky Saputra Aziz</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/Dummy_Testimony_1.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}}  alt="Testimony"/>
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard.”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Fernandha Dzaky Saputra Aziz</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                    </div>
                </SwiperSlide>
                </Swiper>   

            </div>
        </div>
        {/* END OF TESTIMONIES */}


        {/* START OF ABOUT US */}
        <div  className='row upper-page-padding page-container' >
            <div className='col-12 ps-0 prm-0'  >
                <p className={isMobile ? 'px-36' : 'px-36 mb-4'} style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>About Us</p>
                <ClampLines
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text of something Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text of something "
                    id="paragraph-about-us-text"
                    lines={4}
                    ellipsis="..."
                    moreText="Expand"
                    lessText="Collapse"
                    innerElement="p"
                    className="px-18 mtm-5"
                />
                <div className='mtm-5 mt-5' style={{padding:'0'}}>
                    <a href="/about" className='px-18 btn-grey mtm-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View More</a>
                </div>
            </div>
            {/* START OF CONTACT US */}
            <div className='col-12 pe-0 plm-0 upper-page-padding-small mt-4'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Contact Us</p>
                <div className='contact-us-wrapper mtm-5' style={{padding:'5vw',boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',borderRadius:'4vw'}}>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                        <FontAwesomeIcon icon="envelope" className='px-24' style={{color:'#9FADBB'}} />
                        <p className='px-18 ms-3' style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>nepalvanjava@gmail.com</p>
                    </div>
                    <div id="contact-us-item-wrapper" style={{display:'flex',alignItems:'flex-start',marginTop:'8vw'}}>
                        <FontAwesomeIcon icon="phone" className='px-24' style={{color:'#9FADBB'}} />
                        <p className='px-18 ms-3' style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>+628111377893</p>
                    </div>
                    <div id="contact-us-item-wrapper" style={{display:'flex',alignItems:'flex-start',marginTop:'8vw'}}>
                        <FontAwesomeIcon icon="search-location" className='px-24' style={{color:'#9FADBB'}} />
                        <div className='ms-3'>
                            <p className={isMobile ?'px-18':'px-18 mb-3'} style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>Dusun, Butuh, Temanggung, Kec. Kaliangkrik, Kabupaten Magelang, Jawa Tengah 56153</p>
                            <a className='px-18 pt-3' target="_blank" rel="noreferrer" href="https://goo.gl/maps/NS7WP7hdqjAH1cNdA" style={{fontFamily:'Roboto Regular',marginBottom:'0px',textDecoration:'none',color:'#0D51D6',display:'inline-block'}}>View in Google Map</a>

                        </div>
                    </div>

                </div>
            </div>
            {/* END OF CONTACT US */}
        </div>
        {/* END OF ABOUT US */}


      
        <BottomNavbar></BottomNavbar>



      </div>
      )
  }
}

export default HomePage;
