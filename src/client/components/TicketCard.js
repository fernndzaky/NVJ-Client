import React, {Component} from 'react';

import AtcButton from './AtcButton';
import BuyNowButton from './BuyNowButton';


export default class TicketCard extends Component {
    render(){
        return(
          <div style={{padding:'0px'}}>
            <div style={{padding:'4vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw',marginTop:'6vw'}}>
                <p onClick={()=> window.open("/ticket/1", "_self")} className='px-18' style={{color:'#333333',fontFamily:'Roboto Regular',}}>{this.props.title}</p>
                <p onClick={()=> window.open("/ticket/1", "_self")} className='px-28' style={{color:'#333333',fontFamily:'Nunito Bold',}}>Rp{this.props.price}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'12vw'}}>
                    <AtcButton></AtcButton>
                    <BuyNowButton></BuyNowButton>
                </div>
            </div>
          </div>
          )
      }
}

