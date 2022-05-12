import React from 'react';
import {Helmet} from 'react-helmet';

import '../css/index.css';
import '../css/ExperienceDetail.css';

// Components Import
import Navbar from './components/Navbar';
import BottomNavbar from './components/BottomNavbar';
import ExperienceCard from './components/ExperienceCard';
import TicketCard from './components/TicketCard';


class ExperienceDetail extends React.Component {
  constructor(){
    super()
    this.state = {
        tickets : []
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
                ticket_id   : 1,
                title       : 'Entrance Ticket to Dusun Butuh',
                price       : 10000,
                qty         : 0
            },
            {
                ticket_id   : 2,
                title       : 'Entrance Ticket to Dusun Butuh Nepal Van Java',
                price       : 15000,
                qty         : 0
            }
        ]
    })

    //update the qty based on local storage
    let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
    for(var x in current_cart){
        this.updateTicketStateQty(current_cart[x]['ticket_id'], current_cart[x]['qty'] )
    }
  }

  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            Teras Nepal - Dusun Butuh Nepal Van Java
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
                <p className='px-36 mt-4 mtm-5' style={{color:'#333333',fontFamily:'Nunito Bold'}}>Teras Nepal</p>
                {/* START OF TOP CAROUSEL */}
                <div id="banner_carousel" className="carousel slide ps-0 pe-0 mt-5 mtm-5" data-ride="carousel">
                    <ol className="carousel-indicators">
                        <li data-target="#banner_carousel" data-slide-to={0} className="active" />
                        <li data-target="#banner_carousel" data-slide-to={1} />
                        <li data-target="#banner_carousel" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img className="d-block w-100 extra-big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_1.png" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100 extra-big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_2.png" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100 extra-big-image-carousel" style={{objectFit:'cover'}} src="/assets/images/Dummy_Image_1.png" alt="Third slide" />
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
            </div>

        </div>
        <div className='row page-container mtm-5 mt-5'>
            <div className='col-12 ps-0 pe-0'>
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',whiteSpace:'pre-wrap'}}>Lorem Ipsum is simply dummy text of 
                    the printing and typesetting industry.
                    Lorem Ipsum has been the industry's
                    standard dummy text

                    <br></br>
                    <br></br>


                    Lorem Ipsum is simply dummy text of 
                    the printing and typesetting industry.
                    Lorem Ipsum has been the industry's
                    standard dummy text ever since the
                    1500s,  when an unknown printer took
                    a galley of type and scrambled it to
                    make a type specimen book
                </p>

            </div>
        </div>
        {/* END OF TOP SECTION */}

        {/* START OF AVAILABLE TICKETS */}
        <div className='row upper-page-padding-small page-container'>
            <div className='col-12 p-0'>
                <p className='px-36 ' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Available Tickets</p>
            </div>
            <div className='mt-3 mtm-5'>

            </div>
            {
                this.state.tickets.map( (e , index) => {
                return(
                    <React.Fragment>
                        {
                        index === 0 ?
                        <div  className='p-0'>
                            {e.qty === 0 ?
                            <TicketCard ticket_id={e.ticket_id} title={e.title} price={e.price} qty={e.qty} ></TicketCard>
                            :
                            <TicketCard ticket_id={e.ticket_id} title={e.title} price={e.price} qty={e.qty}></TicketCard>
                            }
                        </div>
                        :
                        <div  className='p-0 mtm-5 mt-4'>
                            {e.qty === 0 ?
                            <TicketCard ticket_id={e.ticket_id} title={e.title} price={e.price} qty={e.qty} ></TicketCard>
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
                <a href="/" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View All Tickets</a>
            </div>
        </div>
        {/* END OF AVAILABLE TICKETS */}

        {/* START OF OTHER EXPERIENCES */}
        <div className='row upper-page-padding-small page-container'>
            <div className='col-12 p-0'>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Other On-Site Experiences</p>
            </div>
            <div className='mt-3 mtm-5'>

            </div>
            <ExperienceCard title={'Jembatan Lembah Nepal Yang Indah'} image={'/assets/images/Dummy_Image_1.png'} ></ExperienceCard>
            <ExperienceCard title={'Jembatan Lembah Nepal Yang Indah'} image={'/assets/images/Dummy_Image_2.png'} ></ExperienceCard>

            <div className='mtm-5 mt-5' style={{padding:'0'}}>
                <a href="/experiences" className='px-18 btn-grey' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%'}}>View All On-Site List</a>
            </div>
        </div>
        {/* END OF OTHER EXPERIENCES */}

        
        <BottomNavbar></BottomNavbar>



      </div>
      )
  }
}

export default ExperienceDetail;
