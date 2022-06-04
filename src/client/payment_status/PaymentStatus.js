import React from 'react';
import {Helmet} from 'react-helmet';
import api from "../../helpers/api";
import NumberFormat from 'react-number-format';
import { Loading, Progress } from "react-loading-ui";

import '../../css/index.css';

// Components Import
import Navbar from '../components/Navbar';



class PaymentStatus extends React.Component {
  constructor(){
    super()
    this.state = {
      progress : 1,
      orderDetail : {},
      paymentStatus : 'settlement',
      orderItems : [],
      visitDate : null,
      orderId : null
    }
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
    this.getTransactionDetail()
    console.log(this.state.orderDetail)
  }

  componentDidUpdate(){
  }

  getTransactionDetail = async() => {
    const search = this.props.location.search;
    const order_id = new URLSearchParams(search).get("order_id");

    if(!order_id)
      window.location.href = '/404'

    const headers = {
      'accept': '*/*',
    }

    this.showLoading()

    await api.post('/client/orders/getDetailsByMidtransOrderId?midtransOrderId='+order_id, {
      headers: headers
    })
        
    .then((response) => {
        if(response.data.success){
            this.setState({
                orderDetail : response.data.content,
                orderItems : response.data.content.orderItems,
                visitDate : response.data.content.visitDate.split('T')[0],
                orderId   : response.data.content.midtrans.orderId
            })
        }

    })
    .catch((error) => {
        if(error.response.data.errorMessage === 'The requested midtrans-orderId does not exists')
          window.location.href = '/404'
    })
  }





  render(){
    return(
      <div className="">
        <Helmet>
            <title>
            Status Pembayaran - Dusun Butuh Nepal Van Java
            </title>
            <meta
                name="description"
                content="A village known for its colorful houses stacked up a slope against a dramatic mountain backdrop."
            />
        </Helmet>
        <Navbar></Navbar>

        {/* START OF TOP SECTION*/}
        {this.state.paymentStatus === 'settlement' ?
        <div className='row page-container upper-page-padding-small pb-4 mtm-5 mt-5' style={{borderBottom:'0.5vw solid #DBE2E9'}}>
            <div className='col-12' style={{textAlign:'center'}}>
              <img className="img-fluid payment_status_icon" style={{width:'25vw',height:'25vw',objectFit:'contain'}} src="/assets/images/Payment_Success.png" alt="Payment Success" />

              <p className='px-28 mt-4 mtm-5' style={{color:'#1BC47D',fontFamily:'Roboto Bold'}}>Pembayaran selesai!</p>
              <p className='px-18 mtm-5' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Terima kasih atas pembeliannya! <br></br> E-Ticket anda telah terkirim ke email Anda. Kami harap Anda menikmati masa tinggal Anda di Nepal Van Java!</p>

            </div>
        </div>
        
        :

        this.state.paymentStatus === 'pending' ?

        <div className='row page-container upper-page-padding-small pb-4 mtm-5 mt-5' style={{borderBottom:'0.5vw solid #DBE2E9'}}>
            <div className='col-12' style={{textAlign:'center'}}>
              <img className="img-fluid payment_status_icon" style={{width:'25vw',height:'25vw',objectFit:'contain'}} src="/assets/images/Payment_Waiting.png" alt="Payment Waiting" />

              <p className='px-28 mt-5 mtm-4' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Menunggu pembayaran..</p>
              <a href={'/payment-status?order_id='+this.state.orderId} className='px-18 btn-outline-grey w-100 mtm-5 mt-4' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',backgroundColor:'#FFFFFF'}}>
              Refresh payment status
              </a>
              <p className='px-18 mtm-5 mt-4' style={{color:'#ED4747',fontFamily:'Roboto Bold'}}>Harap jangan tutup halaman ini sampai anda menyelesaikan pembayaran.</p>

            </div>
        </div>

        :

        this.state.paymentStatus === 'expire' &&

        <div className='row page-container upper-page-padding-small pb-4 mtm-5 mt-5' style={{borderBottom:'0.5vw solid #DBE2E9'}}>
            <div className='col-12' style={{textAlign:'center'}}>
              <img className="img-fluid payment_status_icon" style={{width:'25vw',height:'25vw',objectFit:'contain'}} src="/assets/images/Payment_Expired.png" alt="Payment Expired" />

              <p className='px-28 mtm-5 m-4' style={{color:'#DA3832',fontFamily:'Roboto Bold'}}>Pemesanan Kadaluarsa..</p>
              <a href="/tickets" className='px-18 btn-outline-grey w-100' style={{fontFamily:'Roboto Bold',textDecoration:'none',display:'inline-block',backgroundColor:'#FFFFFF'}}>
              Kembali ke Halaman Tiket
              </a>
            </div>
        </div>
        
        }
        {/* END OF TOP SECTION*/}

        {/* START OF PAYMENT INSTRUCTION SECTION*/}
        {this.state.paymentStatus === 'pending' &&
          <div className='row page-container mt-5'>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Detail pembayaran dan instruksi telah dikirim ke email:</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>{this.state.orderDetail.email}</p>
            
          </div>

        </div>
        }
        {/* END OF PAYMENT INSTRUCTION SECTION*/}
          

        {/* START OF RESEND EMAIL SECTION*/}
        {this.state.paymentStatus === 'settlement' &&

        <div className='row page-container pt-5'>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Belum menerima email?</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Klik tombol di bawah untuk mengirim ulang ke email yang telah diisi sebelumnya.</p>
            <button className='px-18 btn-outline-grey w-100 mt-3' style={{fontFamily:'Roboto Bold',backgroundColor:'#FFFFFF'}}>
            Kirim Ulang Email
            </button>
          </div>

        </div>
        }
        {/* END OF RESEND EMAIL SECTION*/}

        {/* START OF BOOKINNG DETAILS SECTION*/}
        <div className='row page-container upper-page-padding-small pb-5'  style={{borderBottom:'0.5vw solid #DBE2E9'}}>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Detail Pemesanan</p>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className='px-18' style={{fontFamily:'Roboto Bold'}}>Tiket</th>
                  <th scope="col" className='px-18' style={{fontFamily:'Roboto Bold',textAlign:'right'}}>Harga</th>
                </tr>
              </thead>
              <tbody>
              {
                this.state.orderItems.map( (e , index) => {
                
                return(
                    <React.Fragment>
                        {/* START OF ONE ITEM */}
                        {
                          <tr>
                            <td style={{verticalAlign:'middle',paddingRight:'5vw'}}>
                              <p className='px-18' style={{fontFamily:'Roboto Regular'}}>
                                <span style={{fontFamily:'Roboto Bold'}}>x{e.quantity} </span>
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

          <div className='p-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',marginBottom:'0px'}}>Tanggal Kunjungan</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>{this.state.visitDate}</p>
          </div>

          <div className='p-0' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <p className='px-24' style={{color:'#1BC47D',fontFamily:'Nunito Semi Bold'}}>Grand Total</p>
            <p className='px-28' style={{color:'#333333',fontFamily:'Roboto Bold'}}><NumberFormat value={this.state.orderDetail.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></p>

          </div>

        </div>
        {/* END OF BOOKING DETAILS SECTION*/}

        {/* START OF RESEND EMAIL SECTION*/}
        {this.state.paymentStatus === 'pending' &&

        <div className='row page-container pb-5 mt-5'>
          <div className='col-12 ps-0 pe-0'>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold'}}>Belum menerima email?</p>
            <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular'}}>Klik tombol di bawah untuk mengirim ulang ke email yang telah diisi sebelumnya.</p>
            <button className='px-18 btn-outline-grey w-100 mt-4' style={{fontFamily:'Roboto Bold',backgroundColor:'#FFFFFF'}}>
            Kirim Ulang Email
            </button>
          </div>

        </div>
        }
        {/* END OF RESEND EMAIL SECTION*/}

      </div>
      )
  }
}

export default PaymentStatus;
