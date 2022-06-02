import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Loading, Progress } from "react-loading-ui";
import NumberFormat from 'react-number-format';


import '../css/index.css';
import api from "../helpers/api";


// Components Import
import Navbar from './components/Navbar';



class TicketDetail extends React.Component {
  constructor(){
    super()
    this.state = {
      totalPrice    : 0,
      progress      : 1,
      tickets       : [],
      visit_date    : null,
      first_name    : null,
      last_name     : null,
      phone_number  : null,
      email         : null,
    }
  }

  listenerMidtransSnap = (token) => {
      // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
      window.snap.pay(token);
      // customer will be redirected after completing payment pop-up
      
  }


  onChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  createOrder = async() =>{

    const orderItems = []

    await this.state.tickets.map( (e , index) => {
      const tempItem = {
        "quantity" : e.qty,
        "ticketId" : e.id,
      }
      orderItems.push(tempItem)
    })

    const data = {
      "email"     : this.state.email,
      "firstname" : this.state.first_name,
      "lastname"  : this.state.last_name,
      "orderItems": orderItems,
      "visitDate" : this.state.visit_date,
    }

    const headers = {
      'accept': '*/*',
    }

    await api.post('/client/orders/create', data, {
      headers: headers
    })
    
    .then((response) => {
        if(response.data.success){
          this.listenerMidtransSnap(response.data.content.midtrans.token)

        }

    })
    .catch((error) => {
        
    })


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
    //this.listenerMidtransSnap()
    this.getTicketsFromCart()
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

  getTotalPrice = async() =>{
    for(var i in this.state.tickets){
        let price = this.state.tickets[i].price * this.state.tickets[i].qty
        await this.setState({
          totalPrice : this.state.totalPrice + price
        })
    }
  }

  getTicketsFromCart = async()=>{

    //get all ticket id from local storage
    let ticket_ids = JSON.parse(localStorage.getItem('cart')) || [];

    let queryString = ""
    for(var i in ticket_ids){
        queryString += "id="+ticket_ids[i]['ticket_id']
        if(ticket_ids.length > 1)
            queryString += "&"
    }

    const headers = {
        'accept': '*/*',
    }
    
    //if theres an item inside the cart
    if(ticket_ids.length > 0){

        this.showLoading()

        await api.post('/client/tickets/findByIds?'+queryString, {
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
            if(error.response.data.errorMessage === 'The requested ticket does not exists')
            window.location.href = '/404'
        })
        
        //update the qty based on local storage
        let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
        for(var x in current_cart){
            await this.updateTicketStateQty(current_cart[x]['ticket_id'], current_cart[x]['qty'] )
        }
    
        this.getTotalPrice()

    }
    else{
      window.location.href = '/cart'

    }
    
  }



  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            Checkout - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        
        {/* START OF TOP SECTION*/}
        <div className='row page-container' style={{marginTop:'4vw'}}>
            <div className='col-12 ps-0 pe-0'>
              <a href="javascript:history.back()" className='px-18 btn-outline-grey mb-2 mt-5 mb-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block'}}>
                    <FontAwesomeIcon icon="chevron-left" className='px-18 me-2' />

                    Kembali</a>

                <p className='px-28 mt-5 mtm-5' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Detail Pemesanan</p>

            </div>
        </div>
        {/* END OF TOP SECTION*/}
        {/* START OF BOOKINNG DETAILS SECTION*/}
        <div className='row page-container mt-3 mtm-5'>
          <div className='col-12 ps-0 pe-0'>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className='px-18' style={{fontFamily:'Roboto Bold'}}>Tiket</th>
                  <th scope="col" className='px-18' style={{fontFamily:'Roboto Bold',textAlign:'right'}}>Harga</th>
                </tr>
              </thead>
              <tbody>
              {
                this.state.tickets.map( (e , index) => {
                
                return(
                    <React.Fragment>
                        {/* START OF ONE ITEM */}
                        {
                          <tr>
                            <td style={{verticalAlign:'middle',paddingRight:'5vw'}}>
                              <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                                <span style={{fontFamily:'Roboto Bold'}}>x{e.qty} </span>
                              {e.title}
                              </p>
                            </td>
                            <td style={{verticalAlign:'middle',textAlign:'right'}}>
                              <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                                <NumberFormat value={e.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                              </p>
                            </td>
                          </tr>
                         }
                         {/* END OF ONE ITEM */}
                     </React.Fragment>
 
                     )
                 })              
                } 

              </tbody>
            </table>

          </div>
          <div className='p-0' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <p className='px-24' style={{color:'#1BC47D',fontFamily:'Nunito Semi Bold'}}>Grand Total</p>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>
              <NumberFormat value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
            </p>

          </div>

        </div>
        {/* END OF Detal Pemesanan SECTION*/}



        {/* START OF PERSONAL INFORMATION SECTION*/}
        {/* 
        <div className='page-container upper-page-padding-small'>  
  
          <div className='cart-wrapper' style={{padding:'5vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw'}}>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Informasi Pribadi</p>
            <div className='row mt-4'>
              <div className='col-6 ps-0 '>
                  <input  name="full_name" type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Nama Lengkap" />
              </div> 
              <div className='col-6 pe-0 '>
                  <input  name="phone_number" type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Nomor Telepon" />
              </div> 
              <div className='col-12 pe-0 ps-0 mtm-5 mt-4'>
                  <input  name="email" type="email" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Email" />
              </div> 

            </div>
          </div>    
          
          <div className='mtm-5 mt-3' style={{display:'flex',alignItems:'center'}}>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px',width:'50%'}}>Tanggal Kunjungan</p>
            <input  name="visit_date" type="date" class="px-18 input_field_text" style={{marginLeft:'2vw',height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Email" />


          </div>  
        </div>
      */}
        <div className='page-container upper-page-padding-small'>  
          <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Informasi Pengunjung</p>
          {/*START OF ONE INPUT */}
          <div className='mt-4'>
            <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Tanggal Kunjungan</p>
            <input required name="visit_date" value={this.state.visit_date} onChange={this.onChange} type="date" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Masukan tanggal kunjungan" />
          </div>  
          {/*END OF ONE INPUT */}
          {/*START OF ONE INPUT */}
          <div className='mt-4' style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div className='pe-2'>
              <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nama Depan</p>
              <input required name="first_name" value={this.state.first_name} onChange={this.onChange} type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="John" />
            </div>
            <div className='ps-2'>
              <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nama Keluarga</p>
              <input required name="last_name" value={this.state.last_name} onChange={this.onChange} type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Doe" />
            </div>
          </div>  
          {/*END OF ONE INPUT */}
          {/*START OF ONE INPUT */}
          <div className='mt-4'>
            <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nomor Kontak</p>
            <input required name="phone_number" value={this.state.phone_number} onChange={this.onChange} type="number" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="+628111344759" />
          </div>  
          {/*END OF ONE INPUT */}
          {/*START OF ONE INPUT */}
          <div className='mt-4'>
            <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Email</p>
            <input required name="email" value={this.state.email} onChange={this.onChange} type="email" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="john@doe.com" />
          </div>  
          {/*END OF ONE INPUT */}

        </div>
        {/* END OF PERSONAL INFORMATION SECTION*/}

        <div className='row page-container mtm-5 mt-5 pb-5'>
          <button onClick={() => this.createOrder()} className='px-18 btn-grey mtm-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%',border:'none'}}>Pilih Metode Pembayaran</button>
          <button id="pay-button">Pay!</button>
        </div>
        



       
      </div>
      )
  }
}

export default TicketDetail;
