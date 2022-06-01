import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ClampLines from 'react-clamp-lines';
import {isMobile} from 'react-device-detect';
import { Loading, Progress } from "react-loading-ui";

import '../css/index.css';
import '../css/HomePage.css';
import api from "../helpers/api";


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
        tickets             : [],
        ticketType          : 'tickets',
        ticketPurchasable   :  true,
        progress            : 1
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
    this.getAllTickets(this.state.ticketPurchasable)
  }

  showLoading(){
    /* Show loading-ui */
    Loading({title:'Loading', text:'Memuat konten, harap menunggu..',theme:'dark',progress:true,progressedClose :true});
    let interval = null;

    interval = setInterval(() => {
      this.setState({ progress: this.state.progress + 4 }, () => {
        // Set Progress Value
        Progress(this.state.progress);

        if (this.state.progress >= 100) {
          this.setState({ progress: 0 });
          clearInterval(interval);
        }
      });
    }, 100);
  }
  

  updateTicketStateQty = async(ticket_id,new_qty) =>{  
    // 1. Make a shallow copy of the items
    let tickets = [...this.state.tickets]
    // 2. find the index from the state tickets
    var index = tickets.findIndex(p => p.id === ticket_id)
    // 3. Make a shallow copy of the item you want to mutate
    let ticket = {...tickets[index]}
    // 4. Replace the property you're intested in
    ticket.qty = new_qty
    // 5. Put it back into our array
    tickets[index] = ticket
    // 6. Set the state to our new copy
    await this.setState({tickets})

  }

  addQtyToTickets = async() =>{  
    // 1. Make a shallow copy of the items
    let tickets = [...this.state.tickets];
    // 3. Make a shallow copy of the item you want to mutate
    for (let i = 0; i < tickets.length; i++) {
        tickets[i].qty = 0
      }
    // 4. Replace the property you're intested in
    //ticket.qty = 0
    // 6. Set the state to our new copy
    await this.setState({tickets});

  }

  getAllTickets = async(purchasable) =>{
    
    this.showLoading()

    const headers = {
        'accept': '*/*',
    }

    const data = {
        "purchasable": purchasable,
    }


    
    let api_url = '/client/tickets/findByFilter'

    await api.post(api_url, data, {
        headers: headers
    })
    
    .then((response) => {
        if(response.data.success){
          this.setState({
              tickets : response.data.content
          })
        }

    })
    .catch((error) => {
        console.log(error.response.data.errorMessage)
    })

    await this.addQtyToTickets()

    //update the qty based on local storage
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    for(var x in current_cart){
        this.updateTicketStateQty(current_cart[x]['ticket_id'], current_cart[x]['qty'] )
    }

  }


  changeTicketType = async(purchaseAble) =>{
    if(purchaseAble){
        await this.setState({            
            ticketPurchasable : true,
            ticket_name : null
        })
        this.getAllTickets(this.state.ticketPurchasable,this.state.ticket_name)
    }
    else if(!purchaseAble){
        await this.setState({
            ticketPurchasable : false,
            ticket_name : null

        })
        this.getAllTickets(this.state.ticketPurchasable,this.state.ticket_name)
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
            <div className='row page-container upper-page-padding-small'>
                <div className='col-xs-12 ps-0 pe-0'>
                    <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Dusun Butuh Nepal Van Java</p>
                </div>
                <div className='col-xs-12 ps-0 pe-0 mt-3 mtm-5' >
                    <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',textAlign:'justify'}}>Butuh adalah sebuah Dusun yang berada di ujung barat Kabupaten Magelang terletak di ketinggian 1.750 mdpl tepatnya di Desa Temanggung Kecamatan Kaliangkrik Kabupaten Magelang Provinsi Jawa Tengah, bisa disebut juga sebuah perkampungan tertinggi di Kabupaten Magelang dengan tata ruang alami atau posisi perumahan yang berjajar rapi menghadap selatan lereng Gunung Sumbing.</p>
                    <div className='mtm-5 mt-4' style={{padding:'0'}}>
                        <a href="/experiences" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Semua Wisata</a>
                    </div>
                </div>
            </div>

        </div>
        {/* END OF TOP CONTENT */}


        {/* START OF AVAILABLE TICKETS */}

        <div className='row upper-page-padding-small page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Tiket Dusun Butuh</p>
                {/* START OF TOGGLE */}
                <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <div onClick={()=> this.changeTicketType(true)} className={this.state.ticketPurchasable ? "ticket-blue-btn ticket-blue-btn-active" : "ticket-blue-btn"}  style={{borderRadius:'10px 0px 0px 10px',width:'50%'}}>
                        <p className="px-18" style={{fontFamily: 'Roboto Bold',marginBottom:'0px'}}>Tiket</p>
                    </div>
                    <div onClick={()=> this.changeTicketType(false)} className={!this.state.ticketPurchasable ? "ticket-blue-btn ticket-blue-btn-active" : "ticket-blue-btn"} style={{borderRadius:'0px 10px 10px 0px',width:'50%'}}>
                        <p className="px-18" style={{fontFamily: 'Roboto Bold',marginBottom:'0px'}}>Paket Wisata</p>
                    </div>
                </div>
                {/* END OF TOGGLE */}
            </div>
            <div className='mt-5'>

            </div>

            {
                this.state.tickets.map( (e , index) => {
                return(
                    <React.Fragment>
                        {
                        index < 2 &&
                        <div  className={index === 0 ? 'p-0' : 'p-0 mtm-5 mt-4'}>
                            {!e.purchasable ?
                            <FreeTicketCard ticket_id={e.id} title={e.title} ></FreeTicketCard>
                                :
                            <TicketCard ticket_id={e.id} title={e.title} price={e.price} qty={e.qty} ></TicketCard>
                            }
                        </div>
                        }
                    </React.Fragment>

                    )
                })              
            } 

            <div className='mtm-5 mt-5' style={{padding:'0'}}>
                {this.state.ticketPurchasable ?
                <a href="/tickets" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Semua Tiket</a>
                :
                <a href="/tickets" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Semua Paket</a>
                }
            </div>
        </div>


        {/* END OF AVAILABLE TICKETS */}

        {/* START OF GALLERIES */}
        <div className='row upper-page-padding page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Galeri Foto</p>
            </div>
        </div>
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
        {/* END OF GALLERIES */}


        {/* START OF TESTIMONIES */}
        <div className='row upper-page-padding'>
                <div className='col-12 page-container'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Apa kata mereka?</p>
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
                            <img className='img-fluid' src="/assets/images/testimonies/Testimony-1.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Negeri di atas awan. Desa yang unik. Rumah-rumah dibangun memeluk tebing, satu di atas yang lain. Jalan-jalan desa sangat terjal. Ada ojek dari parkiran mobil untuk keliling dusun Butuh sampai ke bawah base camp Gunung Sumbing.”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Brasukra G Sudjana</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/testimonies/Testimony-5.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Wow. Pas lihat lokasi ini di postingan orang” kagum asli. Dan gak nyangka ternyata punya teman daerah sini, daannn rumahnya yng jadi spot foto itu. Asli. Butuh, kaliangkrik. Kalau pakai google maps ambil jalur paling kiri atau lurus aja terus dari pasar kaliangkrik.
                            <br></br> 
                            <br></br> 
                            Jalannya bagus, aspal sampai atas, parkir mobil ada dan nyaman. Untuk lokasi penginapan diatas kurang tahu. Masjidnya bagus banget dan megah. Ini salah satu tempat untuk kalian yang ingin merefresh otak dan bersantai. 
                            <br></br> 
                            <br></br> 
                            Kalian bisa jalan” menelusuri kampung ini. Penduduknya ruuuaaaamah banget. Sering ditawarin mampir sekedar minum teh. Debest untuk desa ini. Dan alhamdulillah pas kesana pemandangannyaaaaa. Bagus banget parah”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Rizal zm</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/testimonies/Testimony-2.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Fix tempatnya wonderfull view banget 😅 iseng2 kesini dari semarang ke dusun butuh perjalanan lumayan 2jam 30menitan , tiket masuk 2 orang 1 motor 10k. Banyak spot buat foto sih disini cuman jalanannya naik2 ke puncak gunung banget bun 😂. Dan sekedar info aja nih gaes tgl 19 Oktober Nepal Van Java tutup sementara sampai batas waktu yg belum ditentukan 😔”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Hernita Dwi Nugraheni</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/testimonies/Testimony-3.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Kalau ga salah sih untuk sampai kemarin (30 Oktober 2020) Lokasi masih di tutup, tidak tau alasan pastinya, kalau dengar-dengar untuk waktu bersih-bersih. Untuk pemandangannya sendiri memang indah seperti di negara nepal hanya saja yang ini versi di Indonesia tepatnya Dusun butuh, Kabupaten Magelang.
                            <br></br> 
                            <br></br> 
                            Disarankan untuk menuju lokasi pagi hari, melihat info cuaca, dan pastinya pastikan kondisi kendaraan baik/fit terutama cek kampas rem karena untuk perjalanan pulang harus extra hati-hati di khususkan para pengguna motor matic. Karena rawan rem blong. Terimakasih.”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Cendikiawan Aditama</p>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <div className='testimony-outline-wrapper' style={{width:'25vw',height:'25vw',borderRadius:'50%',marginLeft:'5vw',border:'1vw solid #FFFFFF'}}>
                            <img className='img-fluid' src="/assets/images/testimonies/Testimony-4.png" style={{width:'100%',borderRadius:'50%',height:'100%',objectFit:'cover'}} alt="Testimony" />
                        </div>
                        <div className='testimony-content-wrapper' style={{padding:'17vw 5vw 5vw 5vw',borderRadius:'4vw',marginTop:'-13vw',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.15)'}}>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'5vw'}}>“Ini nepal van java yang bener” lagi viral dusun butuh desa tertinggi paling mentok dengan gunung sumbing. Dan disini adalah wisata dengan pemandangan bagus yang juga super murah karna cuma bayar parkir 3k dan stiker desa 5k sangat” murah dan udha bisa bikin pikiran fresh.
                            <br></br> 
                            <br></br> 
                            Jalan kesini juga udah halus mobil juga bisa sampe lokasi cuma emg agak jauh. Jajanan disini juga murah” kemaren beli nasgos sama soto udah minum jan kletikan juga cuma 25rb. Sangat cocok buat wisata di tanggal tua yang belom kesini buruan kesini ya.. Jalan pemandangan kesini juga sangat bagus”</p>
                            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Septi Nila</p>
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
                <p className={isMobile ? 'px-36' : 'px-36 mb-4'} style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Tentang Kami</p>
                <ClampLines
                    text="Kenapa dinamakan Butuh?, sejarah singkat asal muasal Dusun Butuh adalah pada masa penjajahan Belanda waktu itu moyang atau leluhur yang berasal dari wilayah Yogyakarta karena dikejar penjajah terus melarikan diri dan menetap disebuah wilayah hutan waktu itu (Brajan)"
                    id="paragraph-about-us-text"
                    lines={4}
                    ellipsis="..."
                    moreText="Expand"
                    lessText="Collapse"
                    innerElement="p"
                    className="px-18 mtm-5"
                />
                <div className='mtm-5 mt-5' style={{padding:'0'}}>
                    <a href="/about" className='px-18 btn-grey mtm-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Lebih Lanjut</a>
                </div>
            </div>
            {/* START OF CONTACT US */}
            <div className='col-12 pe-0 plm-0 upper-page-padding-small mt-4'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Hubungi Kami</p>
                <div className='contact-us-wrapper mtm-5' style={{padding:'5vw',boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.25)',borderRadius:'4vw'}}>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                        <FontAwesomeIcon icon="envelope" className='px-24' style={{color:'#9FADBB'}} />
                        <p className='px-18 ms-3' style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>pesonadusunbutuh@gmail.com</p>
                    </div>
                    <div id="contact-us-item-wrapper" style={{display:'flex',alignItems:'flex-start',marginTop:'8vw'}}>
                        <FontAwesomeIcon icon="phone" className='px-24' style={{color:'#9FADBB'}} />
                        <p className='px-18 ms-3' style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>(Pak Lilik) +62 823-2356-7878</p>
                    </div>
                    <div id="contact-us-item-wrapper" style={{display:'flex',alignItems:'flex-start',marginTop:'8vw'}}>
                        <FontAwesomeIcon icon="search-location" className='px-24' style={{color:'#9FADBB'}} />
                        <div className='ms-3'>
                            <p className={isMobile ?'px-18':'px-18 mb-3'} style={{fontFamily:'Roboto Regular',marginBottom:'0px'}}>Dusun, Butuh, Temanggung, Kec. Kaliangkrik, Kabupaten Magelang, Jawa Tengah 56153</p>
                            <a className='px-18 pt-3' target="_blank" rel="noreferrer" href="https://goo.gl/maps/NS7WP7hdqjAH1cNdA" style={{fontFamily:'Roboto Regular',marginBottom:'0px',textDecoration:'none',color:'#0D51D6',display:'inline-block'}}>Lihat di Google Map</a>

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
