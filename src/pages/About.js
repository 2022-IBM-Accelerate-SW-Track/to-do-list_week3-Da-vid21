import React, { Component } from 'react';
import "./About.css";
import profile_pic_name from "../assets/profile_pic_name.png";

export default class About extends Component {
  render() {
    return (
      <div>
        <div class="about">
        <p> <about>About</about><b>   me </b> </p> 
        </div>
        <div>
        <div class="split left">
          <div className="centered">
            <img 
              className="profile_image"
              src={profile_pic_name}
              alt="Profile Pic"
              ></img>
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Dawit Tekeste</div>
            <div className="brief_description">
              2022 IBM Accelerate Software Track attendee
            </div>
          </div>
        </div>
      </div>
      </div>
      
      
    )
    
  }
}