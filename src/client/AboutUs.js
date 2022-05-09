import React from 'react';
import {Helmet} from 'react-helmet';
import '../css/index.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';


class AboutUs extends React.Component {
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
            Tentang Kami - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        {/* START OF TOP SECTION*/}
        <div className='row page-container mt-4' style={{
                                                    background: `url('/assets/images/BG_Image.png') no-repeat center`,
                                                    backgroundSize: '90%'}}>
            <div className='col-12 ps-0 pe-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Dusun Butuh
Nepal Van Java</p>
            </div>
            <div className='col-12 ps-0 pe-0 mt-4 mtm-5' >
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. 
                <br></br>
                <br></br>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. 
                </p>
            </div>
        </div>
        {/* END OF TOP SECTION*/}
        {/* START OF TOP CAROUSEL */}
        <div id="top_carousel"  className="carousel slide mt-4 mtm-5" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#top_carousel" data-slide-to={0} className="active" />
                <li data-target="#top_carousel" data-slide-to={1} />
                <li data-target="#top_carousel" data-slide-to={2} />
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
            <a className="carousel-control-prev" href="#top_carousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a className="carousel-control-next" href="#top_carousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
        </div>
        {/* END OF TOP CAROUSEL */}


        {/* START OF HISTORY SECTION*/}
        <div className='row page-container upper-page-padding-small mtm-5' >
            <div className='col-12 ps-0 pe-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>History of Dusun Butuh</p>
            </div>
            <div className='col-12 ps-0 pe-0 mt-4 mtm-5' >
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. 
                <br></br>
                <br></br>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text. 
                </p>
            </div>
        </div>
        
        {/* END OF HISTORY SECTION*/}

        {/* START OF BOTTOM CAROUSEL */}
        <div id="bottom_carousel" className="carousel slide mt-4 mtm-5" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#bottom_carousel" data-slide-to={0} className="active" />
                <li data-target="#bottom_carousel" data-slide-to={1} />
                <li data-target="#bottom_carousel" data-slide-to={2} />
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
            <a className="carousel-control-prev" href="#bottom_carousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
            <a className="carousel-control-next" href="#bottom_carousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
        </div>
        {/* END OF BOTTOM CAROUSEL */}
            <BottomNavbar></BottomNavbar>


      </div>
      )
  }
}

export default AboutUs;
