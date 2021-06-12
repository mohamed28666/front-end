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
import Avatar from '@material-ui/core/Avatar';
import { Height } from '@material-ui/icons';

const styles = theme => ({

  spacing: 8



});
let relays_state;
let rel_number = [];
let etat_de_relais = [];
let display_array = [];
let display_image=[];



export default class dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { array1: [], array1_state: [], array1_display: [],imagebtn:[], color: props.color, cookie: "" };

  }
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
    this.setState({ imagebtn: display_image });
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
    console.log(display_image);
    this.setState({ imagebtn: display_image });
    this.setState({ cookie: localStorage.getItem('auth') });


    window.localStorage.setItem("auth", window.location.href.split("token=")[1]);




  }











  render() {

    const button_components = this.state.array1.map((rel, index) => (
 

        <Paper elevation={10}  style={{backgroundColor :'beige',width:"100%"}}>
          
        
           
             <Box p={1}my={5} >
             
            <Avatar style={{height:'100%',width:"100%",alignSelf: 'center'}} variant={'circular'}  src={this.state.imagebtn[index]}></Avatar>
            
            
            <Box my={2}  >
            <Paper elevation={24}> 
            
              <Button size="large" onClick={(e) => this.updatethestate(e)} tabIndex={index} style={{  display: 'block',width:"100%",}} variant="contained" color={this.state.array1_display[index]}>{rel}</Button>
            </Paper>
            </Box>
            </Box>
            
      
      </Paper>
      
     
    ));



    return (
      // <div className="d-inline  container welcome-component col-4">
      < >

        
<Container  style={{width:"50%"}}>

           
        {button_components}

         

        </Container>


      </>
    );
  }



}