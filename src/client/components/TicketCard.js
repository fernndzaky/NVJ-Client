import React, {Component} from 'react';
import ClampLines from 'react-clamp-lines';
import NumberFormat from 'react-number-format';



import AtcButton from './AtcButton';
import BuyNowButton from './BuyNowButton';



export default class TicketCard extends Component {
    
    render(){
        return(
          <div style={{padding:'0px'}}>
            <div className='ticket-card-wrapper' style={{padding:'4vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw',height:'55vw',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div onClick={()=> window.open("/ticket/1", "_self")} >
                    <ClampLines
                        text={this.props.title}
                        id="cart-title-text"
                        lines={1}
                        ellipsis="..."
                        moreText="Expand"
                        lessText="Collapse"
                        innerElement="p"
                        className="px-18"
                        
                    />
                    <p onClick={()=> window.open("/ticket/1", "_self")} className='px-28' style={{color:'#333333',fontFamily:'Nunito Bold',cursor:'pointer'}}>
                        <NumberFormat value={this.props.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                    </p>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <AtcButton ticket_id={this.props.ticket_id}></AtcButton>
                    <BuyNowButton></BuyNowButton>
                </div>
            </div>
          </div>
          )
      }
}

