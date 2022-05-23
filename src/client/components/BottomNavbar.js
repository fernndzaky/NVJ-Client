import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import '../../css/index.css';

export default class BottomNavbar extends Component {
    constructor(){
        super()
        this.state = {
            showBottomNav : false
        }
      }
    checkBottomNavbar = async() => {
        //list of url that hide burger button
        const urls = ['/experiences','/experience','/profile','/cart','/tickets','/about']
    
        for (let i = 0; i < urls.length; i++) {
          if(window.location.pathname.startsWith(urls[i]) || window.location.pathname === '/')
            await this.setState({
                showBottomNav : true
            })
        }
    }

    componentDidMount(){
        this.checkBottomNavbar()
    }
    render(){
        return(
          <div>
            <div className='row upper-page-padding'>
            </div>
            <div className='row upper-page-padding-small'>
            </div>
            {this.state.showBottomNav ?
            <div className="bottom-navbar">
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                {/* START OF HOME*/}
                { (window.location.pathname === '/' || window.location.pathname === '/about' ) ?
                  
                <div id="bottom-navbar-item"  className="bottom-navbar-item-active">
                    <a href="/" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="home" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Home</p>
                    </a>
                </div>
                :
                <div id="bottom-navbar-item">
                    <a href="/" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="home" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Home</p>
                    </a>
                </div>
                }
                {/* END OF HOME*/}

                {/* START OF EXPERIENCE*/}
                { window.location.pathname.startsWith('/experience') ?
                <div id="bottom-navbar-item"  className="bottom-navbar-item-active">
                    <a href="/experiences" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="campground" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Wisata</p>
                    </a>
                </div>
                :
                <div id="bottom-navbar-item">
                    <a href="/experiences" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="campground" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Wisata</p>
                    </a>
                </div>
                }
                {/* END OF EXPERIENCE*/}

                {/* START OF TICKET*/}
                { window.location.pathname.startsWith('/ticket') ?
                <div id="bottom-navbar-item" className="bottom-navbar-item-active">
                    <a href="/tickets" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="ticket-alt" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Tiket</p>
                    </a>
                </div>
                :
                <div id="bottom-navbar-item" >
                    <a href="/tickets" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="ticket-alt" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Tiket</p>
                    </a>
                </div>
                }
                {/* END OF EXPERIENCE*/}

                {/* START OF CART*/}
                { window.location.pathname.startsWith('/cart') ?
                <div id="bottom-navbar-item" className="bottom-navbar-item-active">
                    <a href="/cart" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="shopping-cart" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Keranjang</p>
                    </a>
                </div>
                :
                <div id="bottom-navbar-item" >
                    <a href="/cart" style={{textDecoration:'none'}}>
                        <FontAwesomeIcon icon="shopping-cart" className='px-24' />
                        <p className='px-14' style={{fontFamily:'Roboto Regular',marginBottom:'0px',color:'#333333'}}>Keranjang</p>
                    </a>
                </div>
                }
                  
              </div>
            </div>
            :
            null
            }
            
          </div>
          )
      }
}

