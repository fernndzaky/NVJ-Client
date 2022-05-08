import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ClampLines from 'react-clamp-lines';

import '../css/index.css';
import '../css/HomePage.css';

// import Swiper core and required modules
import { Swiper, SwiperSlide, FreeMode } from "swiper/react";
import SwiperCore, {
    Pagination
  } from 'swiper/core';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"

// Components Import
import TicketCard from './components/TicketCard';
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';


class HomePage extends React.Component {
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
                <div className='col-md-6 col-xs-12 ps-0 pe-0'>
                    <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',marginBottom:'5vw',whiteSpace:'pre-line'}}>Dusun Butuh
                    On-Site Experience</p>
                </div>
                <div className='col-md-6 col-xs-12 ps-0 pe-0' >
                    <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. </p>
                </div>
            </div>

        </div>
        {/* END OF TOP CONTENT */}


        {/* START OF AVAILABLE TICKETS */}
        <div className='row upper-page-padding-small page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',marginBottom:'5vw',whiteSpace:'pre-line'}}>Available Tickets</p>
            </div>
            <TicketCard title={'Entrance Ticket to Dusun Butuh'} price={'10,000'} ></TicketCard>
            <TicketCard title={'Entrance Ticket to Dusun Butuh'} price={'20,000'} ></TicketCard>
            
            <div style={{marginTop:'6vw',padding:'0'}}>
                <a href="/" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View All Tickets</a>
            </div>
        </div>
        {/* END OF AVAILABLE TICKETS */}

        {/* START OF GALLERIES */}
        <div className='row upper-page-padding page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',marginBottom:'5vw',whiteSpace:'pre-line'}}>Galleries</p>
            </div>
        </div>
        {/* START OF GALLERY CAROUSEL */}
        <div id="gallery_carousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#gallery_carousel" data-slide-to={0} className="active" />
                <li data-target="#gallery_carousel" data-slide-to={1} />
                <li data-target="#gallery_carousel" data-slide-to={2} />
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
        <div className='row upper-page-padding page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',marginBottom:'10vw',whiteSpace:'pre-line'}}>Testimonies</p>
            </div>
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
                        <img className='img-fluid' src="/assets/images/Dummy_Testimony_1.png" style={{width:'100%',borderRadius:'50%'}} alt="First Testimony" />
                    </div>
                    <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                        <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'6vw'}}>“Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard.”</p>
                        <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Fernandha Dzaky Saputra Aziz</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div>
                    <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                        <img className='img-fluid' src="/assets/images/Dummy_Testimony_1.png" style={{width:'100%',borderRadius:'50%'}} alt="First Testimony" />
                    </div>
                    <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                        <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'6vw'}}>“Lorem Ipsum is simply dummy text of the printing and typeset industry. Lorem Ipsum has been the industry's standard.”</p>
                        <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Fernandha Dzaky Saputra Aziz</p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        </div>
        {/* END OF TESTIMONIES */}


        {/* START OF ABOUT US */}
        <div className='row upper-page-padding page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',marginBottom:'5vw',whiteSpace:'pre-line'}}>About Us</p>
                <ClampLines
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text of something Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text of something "
                    id="paragraph-about-us-text"
                    lines={4}
                    ellipsis="..."
                    moreText="Expand"
                    lessText="Collapse"
                    innerElement="p"
                    className="px-18"
                />
                <div style={{marginTop:'6vw',padding:'0'}}>
                    <a href="/about" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View More</a>
                </div>
            </div>
        </div>
        {/* END OF ABOUT US */}

        {/* START OF CONTACT US */}
        <div className='row upper-page-padding page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',marginBottom:'5vw',whiteSpace:'pre-line'}}>Contact Us</p>
                <div style={{padding:'5vw',boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',borderRadius:'4vw'}}>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                        <FontAwesomeIcon icon="envelope" className='px-24' style={{color:'#9FADBB'}} />
                        <p className='px-18' style={{fontFamily:'Roboto Regular',marginBottom:'0px',marginLeft:'5vw'}}>nepalvanjava@gmail.com</p>
                    </div>
                    <div style={{display:'flex',alignItems:'flex-start',marginTop:'8vw'}}>
                        <FontAwesomeIcon icon="phone" className='px-24' style={{color:'#9FADBB'}} />
                        <p className='px-18' style={{fontFamily:'Roboto Regular',marginBottom:'0px',marginLeft:'5vw'}}>+628111377893</p>
                    </div>
                    <div style={{display:'flex',alignItems:'flex-start',marginTop:'8vw'}}>
                        <FontAwesomeIcon icon="search-location" className='px-24' style={{color:'#9FADBB'}} />
                        <div style={{marginLeft:'5vw',marginTop:'-2vw'}}>
                            <p className='px-18' style={{fontFamily:'Roboto Regular',marginBottom:'0px',marginBottom:'5vw'}}>Dusun, Butuh, Temanggung, Kec. Kaliangkrik, Kabupaten Magelang, Jawa Tengah 56153</p>
                            <a className='px-18' target="_blank" href="https://goo.gl/maps/NS7WP7hdqjAH1cNdA" style={{fontFamily:'Roboto Regular',marginBottom:'0px',textDecoration:'none',color:'#0D51D6'}}>View in Google Map</a>

                        </div>
                    </div>

                </div>
            </div>
        </div>
        {/* END OF CONTACT US */}

        <BottomNavbar></BottomNavbar>



      </div>
      )
  }
}

export default HomePage;
