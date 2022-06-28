import React from 'react';
import {Helmet} from 'react-helmet';
import '../css/index.css';

// Components Import
import Navbar from './components/Navbar';

class PageNotFound extends React.Component {
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
            if(burgerButton[0])
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
            Halaman Tidak Ditemukan - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        {/* START OF TOP SECTION*/}
        <div className='row page-container mt-4' style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
            <div className='col-12 ps-0 pe-0' style={{textAlign:'center',marginTop:'20vw'}}>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Halaman Tidak Ditemukan..</p>
            </div>
            <div className='col-12 ps-0 pe-0 mt-4 mtm-5' >
            <a href="/experiences" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Daftar Wisata</a>

            </div>
        </div>
        {/* END OF TOP SECTION*/}


      </div>
      )
  }
}

export default PageNotFound;
