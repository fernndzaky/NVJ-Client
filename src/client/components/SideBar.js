import React, {Component} from 'react';
import { slide as Menu } from "react-burger-menu";


export default class SideBar extends Component {
    render(){
        return(
            <Menu>
              <a href="/">
                <img id="nvj-logo-nav" className="img-fluid" src="/assets/images/Icon_NVJ.png" style={{width:'8vw'}} alt="NVJ LOGO" />
              </a>
              
              <div >
                <a className="navbar-item" href="/" style={{fontFamily:'Nunito Semi Bold',color:'#000000',marginBottom:'0px',textDecoration:'none',display:'inline-block'}} >Home</a>    
              </div>
              <div>
                <a className="navbar-item mtm-5" href="/experiences" style={{fontFamily:'Nunito Semi Bold',color:'#000000',marginBottom:'0px',textDecoration:'none',display:'inline-block'}} >Wisata</a>    
              </div>
              <div>
                <a className="navbar-item mtm-5" href="/tickets" style={{fontFamily:'Nunito Semi Bold',color:'#000000',marginBottom:'0px',textDecoration:'none',display:'inline-block'}} >Tiket</a>    
              </div>
              <div>
                <a className="navbar-item mtm-5" href="/cart" style={{fontFamily:'Nunito Semi Bold',color:'#000000',marginBottom:'0px',textDecoration:'none',display:'inline-block'}} >Keranjang</a>    
              </div>
              <div>
                <a className="navbar-item mtm-5" href="/about" style={{fontFamily:'Nunito Semi Bold',color:'#000000',marginBottom:'0px',textDecoration:'none',display:'inline-block'}} >Tentang Kami</a>    
              </div>
            </Menu>
          )
      }
}

