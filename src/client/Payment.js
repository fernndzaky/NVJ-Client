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
      visitDate    : null,
      firstname    : null,
      lastname     : null,
      phoneNumber  : null,
      email         : null,
      isLoading     : false,
      visitDateError  : null,
      firstnameError  : null,
      lastnameError  : null,
      phoneNumberError  : null,
      emailError  : null,
      errorMessage : null
    }
  }

  listenerMidtransSnap = (token) => {
      // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
      window.snap.pay(token);
      // customer will be redirected after completing payment pop-up
      
  }

  disabledPreviousDate (){
    var today = new Date().toISOString().split('T')[0];
    document.getElementsByName("visitDate")[0].setAttribute('min', today);
  }


  onChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })

  }

  createOrder = async(event) =>{

    event.preventDefault();

    if(this.state.email.length < 10){
      await this.setState({
        emailError : 'Format email belum benar.'
      })
      return true
    }
    

    this.showLoading()

    const orderItems = []

    this.setState({
      isLoading : true
      })


    await this.state.tickets.map( (e , index) => {
      const tempItem = {
        "quantity" : e.qty,
        "ticketId" : e.id,
      }
      orderItems.push(tempItem)
    })


    const data = {
      "email"     : this.state.email,
      "firstname" : this.state.firstname,
      "lastname"  : this.state.lastname,
      "phoneNumber"  : this.state.phoneNumber,
      "orderItems": orderItems,
      "visitDate" : this.state.visitDate,
    }

    const headers = {
      'accept': '*/*',
    }

   
    await api.post('/client/orders/create', data, {
      headers: headers
    })
    
    .then((response) => {
        if(response.data.success){
          this.setState({
            isLoading : false
            })
          this.listenerMidtransSnap(response.data.content.midtrans.token)
          window.localStorage.removeItem('cart');


        }

    })
    .catch((error) => {

       
        this.setState({
          visitDateError  : null,
          firstnameError  : null,
          lastnameError  : null,
          phoneNumberError  : null,
          emailError  : null,
          errorMessage : null,
          isLoading : false
        })
        if(error.response.data.errorMessage){
          this.setState({
            errorMessage : error.response.data.errorMessage
          })
        }
        else{
          for(let i = 0;i < error.response.data.errorFieldList.length ; i++){

            //nge check apakah ada error related field
            let obj = error.response.data.errorFieldList.find(o => o.relatedField === error.response.data.errorFieldList[i].relatedField)
            if(obj){
              console.log('obj', obj.relatedField)
              switch(obj.relatedField){
                case 'email':
                  this.setState({emailError : obj.message})
                  break
                case 'lastname':
                  this.setState({lastnameError : obj.message})
                  break
  
                case 'visitDate':
                  this.setState({visitDateError : obj.message})
                  break
  
                case 'firstname':
                  this.setState({firstnameError : obj.message})
                  break
  
                case 'phoneNumber':
                  this.setState({phoneNumberError : obj.message})
                  break
  
              }
            }
          }

        }
        
        
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
            if(burgerButton[0])
              burgerButton[0].classList.remove("burger-scroll-top");

        }
    };
  }

  



  componentDidMount(){
    this.getTicketsFromCart()
    this.addNavbarBorder()
    this.disabledPreviousDate()
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
    if(this.state.isLoading){
      return (
        <div className='row page-container mt-4' style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
            <div className='col-12 ps-0 pe-0' style={{textAlign:'center',marginTop:'20vw'}}>
                <p className='px-36' style={{color:'#333333',fontFamily:'Nunito Bold',whiteSpace:'pre-line'}}>Sedang membuat transaksi...</p>
            </div>
        </div>
      )
    }
    else{

    
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
        
        <form onSubmit={this.createOrder}>
       
          <div className='page-container upper-page-padding-small'>  
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Informasi Pengunjung</p>
            <p className='px-14 mb-0' style={{color:'#DA3832',fontFamily:'Roboto Bold'}}>{this.state.errorMessage}</p>

            {/*START OF ONE INPUT */}
            <div className='mt-4'>
              <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Tanggal Kunjungan</p>
              <input required name="visitDate" value={this.state.visitDate} onChange={this.onChange} type="date" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Masukan tanggal kunjungan" />
              <p className='px-14 mb-0' style={{color:'#DA3832',fontFamily:'Roboto Bold'}}>{this.state.visitDateError}</p>

            </div>  
            {/*END OF ONE INPUT */}
            {/*START OF ONE INPUT */}
            <div className='mt-4' style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div className='pe-2'>
                <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nama Depan</p>
                <input required name="firstname" value={this.state.firstname} onChange={this.onChange} type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="John" />
                <p className='px-14 mb-0' style={{color:'#DA3832',fontFamily:'Roboto Bold'}}>{this.state.firstnameError}</p>
              </div>
              <div className='ps-2'>
                <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nama Keluarga</p>
                <input required name="lastname" value={this.state.lastname} onChange={this.onChange} type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Doe" />
                <p className='px-14 mb-0' style={{color:'#DA3832',fontFamily:'Roboto Bold'}}>{this.state.lastnameError}</p>
              </div>
            </div>  
            {/*END OF ONE INPUT */}
            {/*START OF ONE INPUT */}
            <div className='mt-4'>
              <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nomor Kontak</p>
              <input required name="phoneNumber" value={this.state.phoneNumber} onChange={this.onChange} type="number" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="08111344759" />
              <p className='px-14 mb-0' style={{color:'#DA3832',fontFamily:'Roboto Bold'}}>{this.state.phoneNumberError}</p>
            </div>  
            {/*END OF ONE INPUT */}
            {/*START OF ONE INPUT */}
            <div className='mt-4'>
              <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Email</p>
              <input required name="email" value={this.state.email} onChange={this.onChange} type="email" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="john@doe.com" />
              <p className='px-14 mb-0' style={{color:'#DA3832',fontFamily:'Roboto Bold'}}>{this.state.emailError}</p>
              
            </div>  
            {/*END OF ONE INPUT */}

          </div>

          <div className='row page-container mtm-5 mt-5 pb-5'>
            <button type="submit" className='px-18 btn-grey mtm-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%',border:'none'}}>Pilih Metode Pembayaran</button>
          </div>
        </form>
        {/* END OF PERSONAL INFORMATION SECTION*/}



       
      </div>
      )
    }
  }
}

export default TicketDetail;
