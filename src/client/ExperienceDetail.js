import React from 'react';
import {Helmet} from 'react-helmet';
import { Loading, Progress } from "react-loading-ui";

import '../css/index.css';
import '../css/ExperienceDetail.css';
import api from "../helpers/api"


// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import ExperienceCard from './components/ExperienceCard';
import TicketCard from './components/TicketCard';
import FreeTicketCard from './components/FreeTicketCard';


class ExperienceDetail extends React.Component {
  constructor(){
    super()
    this.state = {
        tickets : [],
        other_experiences       : [],
        experience_id           : null,
       experience_title        : null,
        experience_thumbnail    : null,
        experience_images       : null,
        experience_description  : null,
        ticketPurchasable       : true,
        progress                : 1 
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
    this.getExperienceDetail()
    this.getOtherExperiences()
  }

  componentDidUpdate(){
  }

  getExperienceDetail = async() =>{

    this.showLoading()
    const headers = {
        'accept': '*/*',
    }

    
    await api.post('/client/experiences/findById?id='+this.props.match.params.id, {
        headers: headers
    })
    
    .then((response) => {
        if(response.data.success){
          this.setState({
            experience_id           : response.data.content.id,
            experience_title        : response.data.content.title,
            experience_thumbnail    : response.data.content.thumbnail,
            experience_images       : response.data.content.images,
            experience_description  : response.data.content.description,
          })
        }

    })
    .catch((error) => {
        console.log(error)
    })

  }


  getOtherExperiences = async() =>{


    const headers = {
        'accept': '*/*',
    }

    
    await api.post('/client/experiences/findAll', {
        headers: headers
    })
    
    .then((response) => {
        if(response.data.success){
          this.setState({
            other_experiences : response.data.content
          })
        }

    })
    .catch((error) => {
        console.log(error)
    })
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

  getAllTickets = async(purchasable) =>{
    

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

    //update the qty based on local storage
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    for(var x in current_cart){
        this.updateTicketStateQty(current_cart[x]['ticket_id'], current_cart[x]['qty'] )
    }

  }


  
  changeTicketType = async(purchaseAble) =>{
    this.showLoading()

    await this.setState({            
        ticketPurchasable : purchaseAble,
        ticket_name : null
    })
    this.getAllTickets(this.state.ticketPurchasable)
}


  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            {this.state.experience_title}
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        {/* START OF TOP SECTION*/}
        <div className='row'>
            <div className='col-12 ps-0 pe-0' style={{textAlign:'center'}}>
                <p className='px-36 mt-4 mtm-5' style={{color:'#333333',fontFamily:'Nunito Bold'}}>{this.state.experience_title}</p>
                {/* START OF TOP CAROUSEL */}
                <div id="banner_carousel" className="carousel slide ps-0 pe-0 mt-5 mtm-5" data-ride="carousel">
                    <ol className="carousel-indicators">
                    {
                    this.state.active_experience_images &&

                        this.state.active_experience_images &&
                            this.state.active_experience_images.map( (e , index) => {
                            return(
                                <React.Fragment>
                                    {
                                        <li data-target="#banner_carousel" data-slide-to={index} className={index > 0 ? "" : "active"} />

                                    }
                                    </React.Fragment>
                
                                    )
                                })              
                    } 
                    </ol>
                    <div className="carousel-inner">
                    {
                    this.state.experience_images &&
                        this.state.experience_images.map( (e , index) => {
                        return(
                            <React.Fragment>
                                {
                                    <div className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                        <img
                                        onError={({ currentTarget }) => {
                                            currentTarget.onerror = null; // prevents looping
                                            currentTarget.src='/assets/images/Background-1.png';
                                        }} 
                                        className="d-block w-100 extra-big-image-carousel" style={{objectFit:'cover'}} src={e} alt="Carousel Image" />
                                    </div>
                                }
                            </React.Fragment>

                            )
                        })              
                    } 

                    </div>
                    <a className="carousel-control-prev" href="#banner_carousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                    </a>
                    <a className="carousel-control-next" href="#banner_carousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                    </a>
                </div>
                {/* END OF TOP CAROUSEL */}
            </div>

        </div>
        <div className='row page-container mtm-5 mt-5'>
            <div className='col-12 ps-0 pe-0'>
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',whiteSpace:'pre-wrap',textAlign:'justify'}}>
                    {this.state.experience_description}
                </p>

            </div>
        </div>
        {/* END OF TOP SECTION */}

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


        {/* START OF OTHER EXPERIENCES */}
        <div className='row upper-page-padding-small page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Daftar Wisata Lainnya</p>
            </div>
            <div className='mt-3 mtm-5'>

            </div>
            {
                this.state.other_experiences &&
                    this.state.other_experiences.map( (e , index) => {
                    return(
                        index < 2 &&
                        <React.Fragment>
                            {
                                <ExperienceCard experience_id={e.id} title={e.title} image={e.thumbnail} ></ExperienceCard>
                            }
                            </React.Fragment>

                            )
                        })              
            } 
          
            <div className='mtm-5 mt-5' style={{padding:'0'}}>
                <a href="/experiences" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>Lihat Semua Wisata</a>
            </div>
        </div>
        {/* END OF OTHER EXPERIENCES */}

        
        <BottomNavbar></BottomNavbar>



      </div>
      )
  }
}

export default ExperienceDetail;
