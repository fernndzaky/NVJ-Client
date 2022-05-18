import React, {Component} from 'react';
import ClampLines from 'react-clamp-lines';





export default class FreeTicketCard extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
    }


    render(){
        return(
          <div style={{padding:'0px'}}>
            <div className='ticket-card-wrapper' style={{padding:'4vw',boxShadow: '1px 1px 4px #D4D4D4',borderRadius:'3vw',height:'55vw',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <div onClick={()=> window.open("/ticket/"+this.props.ticket_id, "_self")} >
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
                    <a  className='px-14 pt-2 pb-2 pe-4 ps-4' style={{color:'#333333',fontFamily:'Roboto Bold',backgroundColor:'#1D8ECE',borderRadius:'5px',color:'#FFFFFF',textDecoration:'none'}}>
                        Pre Order
                    </a>

                </div>
                <button  onClick={()=> window.open("/ticket/"+this.props.ticket_id, "_self")} className='btn-green-to-white' style={{width:'100%'}}>
                    <p className='px-18' style={{color:'#333333',fontFamily:'Roboto Bold',marginBottom:'0px'}}>View Detail</p>
                </button>
            </div>
          </div>
          )
      }
}

