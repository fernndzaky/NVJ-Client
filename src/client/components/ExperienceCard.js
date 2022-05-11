import React, {Component} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ClampLines from 'react-clamp-lines';

import '../../css/HomePage.css';
import '../../css/index.css';


export default class ExperienceCard extends Component {
    render(){
        return(
          <div style={{padding:'0px'}} className="mtm-5 mt-4">
            <div className='experience-card-wrapper' style={{padding:'0px',cursor:'pointer'}} onClick={()=> window.open("/experience/1", "_self")}>
                <img className="d-block w-100" style={{objectFit:'cover',borderRadius:'3vw 3vw 0vw 0vw',height:'50vw'}} src={this.props.image} alt="Experience" />
                <div className='experience-card-bottom-section' style={{backgroundColor:'#E8F9F2',padding:'4vw',borderRadius:'0vw 0vw 3vw 3vw'}}>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div style={{width:'75%'}}>
                        <ClampLines
                            text={this.props.title}
                            id="experience-card-title"
                            lines={2}
                            ellipsis="..."
                            moreText="Expand"
                            lessText="Collapse"
                            innerElement="p"
                            className="px-18"
                        />
                        </div>
                        <div >
                            <button style={{backgroundColor:'#1BC47D',border:'0px',borderRadius:'50%',padding:'2vw 3.5vw'}}>
                                <FontAwesomeIcon icon="chevron-right" className='px-18' style={{cursor:'pointer',color:'#FFFFFF'}} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
          </div>
          )
      }
}

