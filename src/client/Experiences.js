import React from 'react';
import {Helmet} from 'react-helmet';
import ClampLines from 'react-clamp-lines';

import '../css/index.css';
import '../css/Experiences.css';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Pagination
  } from 'swiper/core';

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css"


// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';

class Experiences extends React.Component {
  constructor(){
    super()
    this.state = {
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
  }

  componentDidUpdate(){
  }





  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            Experiences - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        {/* START OF TOP SECTION*/}
        <div className='row page-container'>
            <div className='col-12 ps-0 pe-0 mtm-5'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold'}}>On-Site <br></br> Experience List </p>
            </div>
        </div>
        {/* END OF TOP SECTION */}

        {/* START OF EXPERIENCES SECTION*/}
        <div className='mtm-5 mt-4 pb-4' style={{borderBottom:'0.5vw solid #9FADBB'}}>
            <div className='row page-container-left'>
                <div id="experiences_container" className='p-0'>
                    <Swiper
                        slidesPerView={3.5}
                        spaceBetween={30}
                        pagination={{
                        clickable: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <div className='experience_detail_container experience_detail_container_active'>
                                <div className='experience_detail experience_detail_active' style={{width:'100%',height:'22vw'}}>
                                    <img src="/assets/images/Dummy_Image_2.png" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} alt="First Testimony" />
                                </div> 
                                <div className='mt-2' style={{textAlign:'center'}}>
                                    <ClampLines
                                        text="Entrance Gate"
                                        id="cart-title-text"
                                        lines={2}
                                        ellipsis="..."
                                        moreText="Expand"
                                        lessText="Collapse"
                                        innerElement="p"
                                        className="px-18"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='experience_detail_container'>
                                <div className='experience_detail ' style={{width:'100%',height:'22vw'}}>
                                    <img src="/assets/images/Navbar.png" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} alt="First Testimony" />
                                </div> 
                                <div className='mt-2' style={{textAlign:'center'}}>
                                    <ClampLines
                                        text="Jembatan Kaca"
                                        id="cart-title-text"
                                        lines={2}
                                        ellipsis="..."
                                        moreText="Expand"
                                        lessText="Collapse"
                                        innerElement="p"
                                        className="px-18"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='experience_detail_container'>
                                <div className='experience_detail ' style={{width:'100%',height:'22vw'}}>
                                    <img src="/assets/images/Dummy_Image_1.png" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} alt="First Testimony" />
                                </div> 
                                <div className='mt-2' style={{textAlign:'center'}}>
                                    <ClampLines
                                        text="Saung Jawa"
                                        id="cart-title-text"
                                        lines={2}
                                        ellipsis="..."
                                        moreText="Expand"
                                        lessText="Collapse"
                                        innerElement="p"
                                        className="px-18"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='experience_detail_container'>
                                <div className='experience_detail ' style={{width:'100%',height:'22vw'}}>
                                    <img src="/assets/images/Dummy_Image_2.png" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} alt="First Testimony" />
                                </div> 
                                <div className='mt-2' style={{textAlign:'center'}}>
                                    <ClampLines
                                        text="Masjid Umum"
                                        id="cart-title-text"
                                        lines={2}
                                        ellipsis="..."
                                        moreText="Expand"
                                        lessText="Collapse"
                                        innerElement="p"
                                        className="px-18"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                </div>
            </div>
        </div>
        {/* END OF EXPERIENCES SECTION*/}

        {/*  START OF EXPERIENCE DETAIL SECTION*/}
        <div className='row page-container mtm-5'>
            <div className='col-12 ps-0 pe-0'>
                <p className='px-36 mt-5 mtm-5' style={{color:'#333333',fontFamily:'Nunito Bold'}}>Entrance Gate</p>
            </div>
        </div>
         {/* START OF EXPERIENCE DETAIL CAROUSEL */}
         <div id="experience_detail_carousel" className="carousel slide mt-4 mtm-5" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#experience_detail_carousel" data-slide-to={0} className="active" />
                <li data-target="#experience_detail_carousel" data-slide-to={1} />
                <li data-target="#experience_detail_carousel" data-slide-to={2} />
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
            <a className="carousel-control-prev" href="#experience_detail_carousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a className="carousel-control-next" href="#experience_detail_carousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
        </div>
        {/* END OF EXPERIENCE DETAIL CAROUSEL */}
        <div className='row page-container mtm-5 mt-4'>
            <div className='col-12 ps-0 pe-0'>
                <ClampLines
                    text="Lorem Ipsum is simply dummy text of 
                    the printing and typesetting industry.
                    Lorem Ipsum has been the industry's
                    standard dummy text ever since the
                    1500s,  when an unknown printer took
                    a galley of type and scrambled it to
                    make a type specimen book"
                    id="cart-title-text"
                    lines={4}
                    ellipsis="..."
                    moreText="Expand"
                    lessText="Collapse"
                    innerElement="p"
                    className="px-18"
                />
            </div>
            <a href="/experience/1" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View More</a>

        </div>
        {/*  END OF EXPERIENCE DETAIL SECTION*/}

        
        <BottomNavbar></BottomNavbar>



      </div>
      )
  }
}

export default Experiences;
