import React, {Component} from 'react';
import SideBar from "./SideBar";
import {MobileView} from 'react-device-detect';
import {isMobile} from 'react-device-detect';
export default class Navbar extends Component {
  constructor(){
    super()
    this.state = {
      showNavbar : true,
    }
  }

  componentDidMount(){
    this.showNavbar()
  }
    
  showNavbar = async() => {
    //list of url that hide burger button
    const urls = ['/experiences','/experience','/profile','/cart','/tickets','/about']
    var burgerButton = document.getElementsByClassName('bm-burger-button');

    for (let i = 0; i < urls.length; i++) {

      if(window.location.pathname.startsWith(urls[i]) || window.location.pathname === '/'){
          await this.setState({
              showNavbar : false
          })
          burgerButton[0].classList.add("d-none");
      }
    }

    /* IF DESKTOP VERSION, ADD BURGER BUTTON */
    if(!isMobile){
      await this.setState({
        showNavbar : true
      })
      burgerButton[0].classList.remove("d-none");

    }

  }
    render(){
        return(
          <div className="row">
            {this.state.showNavbar ?
            <div className="col-12 page-container" style={{position:'fixed',paddingTop:'2vw',paddingBottom:'2vw',zIndex:'99'}}  id="nvj-navbar">
                <a href="/">
                  <img id="nvj-logo" className="img-fluid" src="/assets/images/Icon_NVJ.png" style={{width:'7vw'}} />
                </a>
                <SideBar pageWrapId={"page-wrap"}  />
            </div>
              :
            <div className="col-12 page-container" style={{paddingTop:'2vw',paddingBottom:'2vw',zIndex:'99'}}  id="nvj-navbar">
                <a href="/">
                  <img id="nvj-logo" className="img-fluid" src="/assets/images/Icon_NVJ.png" style={{width:'7vw'}} />
                </a>
                <SideBar pageWrapId={"page-wrap"}  />
                <MobileView>
                  <div style={{paddingBottom:'2vw'}}>
                  </div>
                </MobileView>
            </div>
            }

            
            {this.state.showNavbar &&
            <div className='upper-page-padding-small'>
            </div>
            }
            
          </div>
          )
      }
}

