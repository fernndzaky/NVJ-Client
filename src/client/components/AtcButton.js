import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import '../../css/index.css';


export default class AtcButton extends Component {
    render(){
        return(
          <div >
            <button onClick={()=> window.open("/cart", "_self")} className='btn-circle-grey-to-blue'>
                <FontAwesomeIcon icon="plus" className='px-24' style={{cursor:'pointer'}} />
            </button>
          </div>
          )
      }
}

