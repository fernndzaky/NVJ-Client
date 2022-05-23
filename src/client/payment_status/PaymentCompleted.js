import React from 'react';
import {Helmet} from 'react-helmet';

import '../../css/index.css';

// Components Import
import Navbar from '../components/Navbar';



class PaymentCompleted extends React.Component {
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
            Pembayaran Selesai - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>
        
        {/* START OF TOP SECTION*/}
        <div className='row page-container upper-page-padding-small pb-4 mtm-5 mt-5' style={{borderBottom:'0.5vw solid #DBE2E9'}}>
            <div className='col-12' style={{textAlign:'center'}}>
              <img className="img-fluid payment_status_icon" style={{width:'25vw',height:'25vw',objectFit:'contain'}} src="/assets/images/Payment_Success.png" alt="Payment Success" />

              <p className='px-28 mt-4 mtm-5' style={{color:'#1BC47D',fontFamily:'Roboto Bold'}}>Pembayaran selesai!</p>
              <p className='px-18 mtm-5' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Terima kasih atas pembeliannya! <br></br> E-Ticket anda telah terkirim ke email Anda. Kami harap Anda menikmati masa tinggal Anda di Nepal Van Java!</p>

            </div>
        </div>
        {/* END OF TOP SECTION*/}

        {/* START OF RESEND EMAIL SECTION*/}
        <div className='row page-container pt-5'>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Belum menerima email?</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Klik tombol di bawah untuk mengirim ulang ke email yang telah diisi sebelumnya.</p>
            <button className='px-18 btn-outline-grey w-100 mt-3' style={{fontFamily:'Roboto Bold',backgroundColor:'#FFFFFF'}}>
            Kirim Ulang Email
            </button>
          </div>

        </div>
        {/* END OF RESEND EMAIL SECTION*/}

        {/* START OF BOOKINNG DETAILS SECTION*/}
        <div className='row page-container upper-page-padding-small pb-5'>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Detail Pemesanan</p>

            <table className="table mt-4">
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

          <div className='p-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Tanggal Kunjungan</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>17 Agustus 1945</p>
          </div>

          <div className='p-0' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <p className='px-24' style={{color:'#1BC47D',fontFamily:'Nunito Semi Bold'}}>Grand Total</p>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Rp30,000</p>

          </div>

        </div>
        {/* END OF BOOKING DETAILS SECTION*/}

      </div>
      )
  }
}

export default PaymentCompleted;
