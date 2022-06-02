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
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Sejarah <br></br> Dusun Butuh</p>
            </div>
            <div className='col-12 ps-0 pe-0 mt-4 mtm-5' >
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Butuh adalah sebuah Dusun yang berada di ujung barat Kabupaten Magelang terletak di ketinggian 1.750 mdpl tepatnya di Desa Temanggung Kecamatan Kaliangkrik Kabupaten Magelang Provinsi Jawa Tengah, bisa disebut juga sebuah perkampungan tertinggi di Kabupaten Magelang dengan tata ruang alami atau posisi perumahan yang berjajar rapi menghadap selatan lereng Gunung Sumbing.</p>
            </div>
        </div>
        {/* END OF TOP SECTION*/}
        
        {/* START OF GALLERY CAROUSEL */}
        <div id="gallery_carousel" className="carousel slide mtm-5 mt-4" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#gallery_carousel" data-slide-to={0} className="active" />
                <li data-target="#gallery_carousel" data-slide-to={1} />
                <li data-target="#gallery_carousel" data-slide-to={2} />
                <li data-target="#gallery_carousel" data-slide-to={3} />
                <li data-target="#gallery_carousel" data-slide-to={4} />
                <li data-target="#gallery_carousel" data-slide-to={5} />
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Galleries/Galeri-1.JPG" alt="First slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Galleries/Galeri-2.JPG" alt="Second slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Galleries/Galeri-3.JPG" alt="Third slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Galleries/Galeri-4.JPG" alt="Third slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Galleries/Galeri-5.JPG" alt="Third slide" />
                </div>
                <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Galleries/Galeri-6.JPG" alt="Third slide" />
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
        <div className='row page-container mt-4' style={{
                                                background: `url('/assets/images/BG_Image.png') no-repeat center`,
                                                backgroundSize: '90%'}}>
            <div className='col-12 ps-0 pe-0 mt-4 mtm-5' >
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>
                Kenapa dinamakan Butuh?, sejarah singkat asal muasal Dusun Butuh adalah pada masa penjajahan Belanda waktu itu moyang atau leluhur yang berasal dari wilayah Yogyakarta karena dikejar penjajah terus melarikan diri dan menetap disebuah wilayah hutan waktu itu (Brajan) berada diantara Desa Temanggung dan Dusun Butuh sekarang ini, dikarenakan tidak adanya sumber air yang dekat untuk bertahan hidup maka mencari sebuah tempat yang lebih atas lagi di lereng Gunung Sumbing dan tepatnya berada diwilayah Dusun Butuh sekarang ini. Jadi bisa diambil kesimpulan mungkin karena waktu itu leluhur kami mem”butuh”kan air untuk bertahan dan menyambung hidup maka kenapa bisa dinamakan Dusun BUTUH.
                </p>

                
            </div>
        </div>

        {/* START OF TOP CAROUSEL */}
        <div id="banner_carousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#banner_carousel" data-slide-to={0} className="active" />
                    <li data-target="#banner_carousel" data-slide-to={1} />
                    <li data-target="#banner_carousel" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Background-1.png" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Background-2.png" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                    <img className="d-block w-100 big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Background-3.png" alt="Third slide" />
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

        <div className='row page-container mt-4' style={{
                                                background: `url('/assets/images/BG_Image.png') no-repeat center`,
                                                backgroundSize: '90%'}}>
            <div className='col-12 ps-0 pe-0 mt-4 mtm-5' >
                
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>
                (untuk tahun dan nama dari moyang atau leluhur belum diperoleh sumber yang akurat jadi belum bisa kami cantumkan)
                <br></br>
                <br></br>
                Dengan berjalannya waktu dan perkembangan jaman, saat ini Dusun Butuh terdapat kurang lebih 450 KK atau Kepala Keluarga dengan jumlah penduduk sekitar 1.500an Jiwa.
                </p>
                <div className='mt-5' style={{padding:'0'}}>
                    <a href="/experiences" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Semua Wisata</a>
                </div>
            </div>
        </div>
        
            <BottomNavbar></BottomNavbar>


      </div>
      )
  }
}

export default AboutUs;
