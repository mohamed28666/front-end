import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { json } from 'body-parser';
import Cookies from 'js-cookie';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import button_imf from'./logo.svg';
import On from './On.jpg';
import off from './OFF.jpg'
const styles = theme => ({

  spacing: 8



});
let relays_state;
let rel_number = [];
let etat_de_relais = [];
let display_array = [];
let display_image=[];



export default class dashboard extends React.Component {

  async updatethestate(e) {
    await axios.get('https://backend28.herokuapp.com/' + e.target.innerHTML).then(resp => {
      if (resp.data === 0) {
        axios.get('https://backend28.herokuapp.com/set/' + e.target.innerHTML, {
          headers: {
            'Authorization': `Bearer ${this.state.cookie}`

          }
        }).then(resp => {

          e.target.parentNode.className = "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSecondary MuiButton-containedSizeLarge MuiButton-sizeLarge";
          console.log(this.state.cookie);
        });



      } else if (resp.data === 1) {
        axios.get('https://backend28.herokuapp.com/reset/' + e.target.innerHTML, {
          headers: {
            'Authorization': `Bearer ${this.state.cookie}`
          }
        }).then(resp => { e.target.parentNode.className = "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-containedSizeLarge MuiButton-sizeLarge"; });



      }
    });

  }



  constructor(props) {
    super(props);
    this.state = { array1: [], array1_state: [], array1_display: [], color: props.color, cookie: "" };

  }





  async componentDidMount() {
    
    await axios.get('https://backend28.herokuapp.com/SU').then(resp => {
      relays_state = resp.data;

      Object.keys(relays_state).forEach(function (key) { rel_number.push(key); });
      Object.values(relays_state).forEach(function (keyy) { etat_de_relais.push(keyy); });

    });
    

    this.setState({ array1: rel_number });
    this.setState({ array1_state: etat_de_relais });

    this.state.array1_state.forEach(function (key) {
      if (key === "0") {display_array.push("primary");display_image.push(off)}
      else {display_array.push("secondary");display_image.push(On)}
    })
    this.setState({ array1_display: display_array });
    
    this.setState({ cookie: localStorage.getItem('auth') });


    window.localStorage.setItem("auth", window.location.href.split("token=")[1]);




  }











  render() {

    const button_components = this.state.array1.map((rel, index) => (
      <>
      <img src={display_image[index]}></img>
      <Button fullWidth={true}size="large" onClick={(e) => this.updatethestate(e)} tabIndex={index} style={{ display: 'block', marginTop: 10, marginLeft: 20 }} variant="contained" color={this.state.array1_display[index]}>{rel}</Button>

</>
    ));



    return (
      // <div className="d-inline  container welcome-component col-4">
      <Container >

        
         

           
        {button_components}

         



      </Container>
    );
  }



}