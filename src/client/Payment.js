import React from 'react';
import {Helmet} from 'react-helmet';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

import '../css/index.css';

// Components Import
import Navbar from './components/Navbar';



class TicketDetail extends React.Component {
  constructor(){
    super()
    this.state = {
    }
  }

  listenerMidtransSnap = () => {
      // For example trigger on button clicked, or any time you need
      var payButton = document.getElementById('pay-button');
      console.log('pay button', payButton)
      payButton.addEventListener('click', function () {
        // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
        window.snap.pay('50b31b3d-eb9b-4dbf-a756-5fbceaf67187');
        // customer will be redirected after completing payment pop-up
      }); 
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
    this.listenerMidtransSnap()
  }

  componentDidUpdate(){
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
                {/* START OF ONE ITEM */}
                <tr>
                  <td style={{verticalAlign:'middle',paddingRight:'5vw'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                      <span style={{fontFamily:'Roboto Bold'}}>x1 </span>
                    Entrance Ticket to Dusun Butuh Nepal Van Java Di Magelang
                    </p>
                  </td>
                  <td style={{verticalAlign:'middle'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                    Rp10,000
                    </p>
                  </td>
                </tr>
                {/* END OF ONE ITEM */}
                {/* START OF ONE ITEM */}
                <tr>
                  <td style={{verticalAlign:'middle',paddingRight:'5vw'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                      <span style={{fontFamily:'Roboto Bold'}}>x2 </span>
                    Entrance Ticket to Dusun Butuh
                    </p>
                  </td>
                  <td style={{verticalAlign:'middle'}}>
                    <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                    Rp10,000
                    </p>
                  </td>
                </tr>
                {/* END OF ONE ITEM */}

              </tbody>
            </table>

          </div>
          <div className='p-0' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <p className='px-24' style={{color:'#1BC47D',fontFamily:'Nunito Semi Bold'}}>Grand Total</p>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Rp30,000</p>

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
          <input  name="visit_date" type="date" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Masukan tanggal kunjungan" />
        </div>  
        {/*END OF ONE INPUT */}
        {/*START OF ONE INPUT */}
        <div className='mt-4'>
          <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nama Pengunjung</p>
          <input  name="full_name" type="text" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Masukkan nama lengkap" />
        </div>  
        {/*END OF ONE INPUT */}
        {/*START OF ONE INPUT */}
        <div className='mt-4'>
          <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Nomor Kontak</p>
          <input  name="phone_number" type="number" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Masukkan nomor telepon" />
        </div>  
        {/*END OF ONE INPUT */}
        {/*START OF ONE INPUT */}
        <div className='mt-4'>
          <p className='px-18' style={{color:'#1D8ECE',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Email</p>
          <input  name="email" type="email" class="px-18 input_field_text" style={{height:'100%',padding:'2vw',color:'#333333',background:'none',border:'none',borderBottom:'0.5vw solid #9FADBB',width:'100%',fontFamily:'Roboto Regular'}} placeholder="Masukkan email pengunjung" />
        </div>  
        {/*END OF ONE INPUT */}

      </div>
        {/* END OF PERSONAL INFORMATION SECTION*/}

        <div className='row page-container mtm-5 mt-5 pb-5'>
          <button  className='px-18 btn-grey mtm-5' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',width:'100%',border:'none'}}>Pilih Metode Pembayaran</button>
          <button id="pay-button">Pay!</button>
        </div>



       
      </div>
      )
  }
}

export default TicketDetail;
