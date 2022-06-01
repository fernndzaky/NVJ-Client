import React from 'react';
import {Helmet} from 'react-helmet';
import { Loading, Progress } from "react-loading-ui";

import '../css/index.css';
import api from "../helpers/api";

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import TicketCard from './components/TicketCard';
import FreeTicketCard from './components/FreeTicketCard';



class Tickets extends React.Component {
  constructor(){
    super()
    this.state = {
        tickets     : [],
        ticketPurchasable  : true,
        progress : 1,
        ticket_name : null,
        sort_by : null,


    }
  }




  addNavbarBorder() {
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
    this.getAllTickets(this.state.ticketPurchasable,this.state.ticket_name)
  }

  onChange = (e) =>{
    this.setState({
    [e.target.name] : e.target.value
    })
  }
  onSelectChange = async(e) =>{
    await this.setState({
        [e.target.name] : e.target.value
    })
    this.getAllTickets(this.state.ticketPurchasable,this.state.ticket_name,this.state.sort_by)

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



  getAllTickets = async(purchasable, title,sort_by) =>{
    
    this.showLoading()

    const headers = {
        'accept': '*/*',
    }

    const data = {
        "purchasable": purchasable,
    }

    if(title)
        data["title"] = title
    
    let api_url = '/client/tickets/findByFilter'
    if(sort_by && sort_by !== 'all')
        api_url = '/client/tickets/findByFilter?orderBy=price&sortBy='+this.state.sort_by
    
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
            Daftar Tiket - Dusun Butuh Nepal Van Java
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

             {/* 
             <div id="banner_carousel" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#banner_carousel" data-slide-to={0} className="active" />
                    <li data-target="#banner_carousel" data-slide-to={1} />
                    <li data-target="#banner_carousel" data-slide-to={2} />
                    <li data-target="#banner_carousel" data-slide-to={3} />
                    <li data-target="#banner_carousel" data-slide-to={4} />
                    <li data-target="#banner_carousel" data-slide-to={5} />
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
                <a className="carousel-control-prev" href="#banner_carousel" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                </a>
                <a className="carousel-control-next" href="#banner_carousel" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                </a>
            </div>
            */}
            {/* END OF TOP CAROUSEL */}

            <div className='row page-container mt-5 mtm-5'>
                <div className='col-12 ps-0 pe-0'>
                    {/* START OF TOGGLE */}
                    <div className='mb-5' style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                        <div onClick={()=> this.changeTicketType(true)} className={this.state.ticketPurchasable ? "ticket-blue-btn ticket-blue-btn-active" : "ticket-blue-btn"}  style={{borderRadius:'10px 0px 0px 10px',width:'50%'}}>
                            <p className="px-18" style={{fontFamily: 'Roboto Bold',marginBottom:'0px'}}>Tiket</p>
                        </div>
                        <div onClick={()=> this.changeTicketType(false)} className={!this.state.ticketPurchasable ? "ticket-blue-btn ticket-blue-btn-active" : "ticket-blue-btn"} style={{borderRadius:'0px 10px 10px 0px',width:'50%'}}>
                            <p className="px-18" style={{fontFamily: 'Roboto Bold',marginBottom:'0px'}}>Paket Wisata</p>
                        </div>
                    </div>
                    {/* END OF TOGGLE */}
                    {this.state.ticketType === 'tickets' ?
                        <p className='px-36 mt-4' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Daftar Tiket <br></br> Dusun Butuh</p>
                        :
                        <p className='px-36 mt-4' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Daftar Paket Wisata</p>
                    }
                </div>
                <div className='col-12 ps-0 pe-0 mt-4 mtm-5' >
                    <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',textAlign:'justify'}}>Ingin memesan tiket untuk wisata-wisata di Dusun Butuh? Silahkan jelajahi halamann ini untuk melihat semua tiket dan juga paket wisata yang ditawarkan oleh Dusun Butuh Nepal Van Java.</p>
                </div>
            </div>

        </div>
        {/* END OF TOP CONTENT */}

        {/* START OF FILTER SECTION */}
        <div className='row page-container mt-3 mtm-5 ticket-filter-wrapper' style={{paddingBottom:'6vw',borderBottom:'1vw solid #9FADBB'}}>
            <div className={this.state.ticketPurchasable ? 'col-6 ps-0' :  'col-12 ps-0 pe-0' }>
                    <input name="ticket_name" onKeyPress={(e) => {(e.key === 'Enter' && this.getAllTickets(this.state.ticketPurchasable,this.state.ticket_name))}}  onChange={this.onChange} defaultValue="" type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder={this.state.ticketPurchasable ? "Cari Tiket" : "Cari Paket Wisata"} />
            </div>     
            {this.state.ticketPurchasable &&
                <div className='col-6 pe-0'>
                    <select name="sort_by"  onChange={this.onSelectChange}  className="px-18 input_field_text"  style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}}>
                        <option value="all" selected>Semua</option>
                        <option value="ASC">Harga Termurah</option>
                        <option value="DESC">Harga Termahal</option>
                    </select>   
                </div>            
            }       
        </div>
        {/* END OF FILTER SECTION */}
        {/* START OF AVAILABLE TICKETS */}
        <div className='row page-container mt-5 mtm-5'>
            <p className='px-18 mtm-5 pb-3' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'0px',padding:'0px'}}>Memperlihatkan {this.state.tickets.length} hasil</p>
            {
                this.state.tickets.map( (e , index) => {
                return(
                    <React.Fragment>
                        {
                        index === 0 ?
                        <div  className='p-0'>
                            {!e.purchasable ?
                            <FreeTicketCard ticket_id={e.id} title={e.title} ></FreeTicketCard>
                            :
                            <TicketCard ticket_id={e.id} title={e.title} price={e.price} qty={e.qty}></TicketCard>
                            }
                        </div>
                        :
                        <div  className='p-0 mtm-5 mt-4'>
                            {!e.purchasable ?
                            <FreeTicketCard ticket_id={e.id} title={e.title} ></FreeTicketCard>
                            :
                            <TicketCard ticket_id={e.id} title={e.title} price={e.price} qty={e.qty}></TicketCard>
                            }
                        </div>
                        }
                    </React.Fragment>

                    )
                })              
            } 
        </div>
        {/* END OF AVAILABLE TICKETS */}
        
        <BottomNavbar></BottomNavbar>



      </div>
      )
  }
}

export default Tickets;
