import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import '../../css/index.css';


export default class BuyNowButton extends Component {
    render(){
        return(
          <div >
            <button onClick={()=> window.open("/checkout", "_self")} className='btn-green-to-white'>
                <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>Buy Now</p>
            </button>
          </div>
          )
      }
}

