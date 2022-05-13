import React, {Component} from 'react';
import ClampLines from 'react-clamp-lines';
import NumberFormat from 'react-number-format';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"



import AtcButton from './AtcButton';
import BuyNowButton from './BuyNowButton';



export default class TicketCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            openIncrementWidget : 0,
            qty : this.props.qty,
            notYetOpened : true,
        }
    }

    componentDidMount = async() => {
        await this.setState({
            qty : this.props.qty
        })
    }

    removeFromCart = async (ticket_id) =>{
        //remove from local storage
        let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
        for(var i in current_cart){
            if(current_cart[i]['ticket_id'] === ticket_id){
                current_cart.splice(i, 1);
                break
            }          
        }
        localStorage.setItem("cart", JSON.stringify(current_cart));
      }



    openIncrementWidget = async() =>{
        if(this.state.notYetOpened){
            await this.setState({
                qty : this.props.qty,
                notYetOpened : false
            })
        }
        
        await this.setState({
            openIncrementWidget : 1,
        })
    }

    handleQtyChange = async(action,ticket_id, new_qty) =>{
        if(new_qty > 0){
            if(action === 'plus'){
                this.addToCart(this.props.ticket_id)
            }

            await this.setState({
                qty : new_qty
            })
            //update qty in the local storage
            let current_cart = JSON.parse(localStorage.getItem('cart')) || [];
            for(var i in current_cart){
                if(current_cart[i]['ticket_id'] === ticket_id){
                    current_cart[i]['qty'] = new_qty
                    break
                }          
            }
            localStorage.setItem("cart", JSON.stringify(current_cart));
        }
        //close the increment widget, if it hits zero
        else{
            await this.setState({
                openIncrementWidget : 0,
                qty : 0
            })
            if(new_qty <= 0)
                this.removeFromCart(this.props.ticket_id)
        }
    }

    


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
                    {this.state.openIncrementWidget  === 1 ?
                    <div className='cart-qty-wrapper' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <div onClick={()=> this.handleQtyChange('minus',this.props.ticket_id,this.state.qty-1)} className='btn-circle-white' style={{cursor:'pointer'}}>
                            <FontAwesomeIcon icon="minus" className='px-24' style={{cursor:'pointer'}} />
                        </div>
                        <p className='px-24' style={{color:'#333333',fontFamily:'Nunito Semi Bold',marginBottom:'0px',padding:'0vw 4vw'}}>{this.state.qty}</p>
                        <div onClick={()=> this.handleQtyChange('plus',this.props.ticket_id,this.state.qty+1)} className='btn-circle-green' style={{cursor:'pointer'}}>
                            <FontAwesomeIcon icon="plus" className='px-24' style={{cursor:'pointer'}} />
                        </div>
                    </div>
                    :
                    <div onClick={()=> this.openIncrementWidget()}>
                        <AtcButton></AtcButton>
                    </div>
                    }
                    <BuyNowButton></BuyNowButton>
                </div>
            </div>
          </div>
          )
      }
}

