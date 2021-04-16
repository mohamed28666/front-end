import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { json } from 'body-parser';

let relays_state;
let rel_number=[];
let etat_de_relais=[];

export default class Deleted extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Relays:[]};
        
      }



      async componentDidMount(){
        await axios.get('http://localhost:3333').then(resp => {
            relays_state=resp.data;
            Object.keys(relays_state).forEach(function(key) {rel_number.push(key);});
            Object.values(relays_state).forEach(function(key) {etat_de_relais.push(key);});
            console.log(Object.values(relays_state));
            }); 
            
            
         console.log(relays_state);
         console.log(etat_de_relais);
        this.setState({Relays:rel_number})  ;
      }   
       
        
                                     
            
          
        
          
      
      
      
      


      render() {
         
        const button_components = this.state.Relays.map((rel)=><Button style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color="secondary">{rel}</Button>);
        
       
        
        return (
          <div className="welcome-component">
           
           {button_components}
           <Button style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color="secondary">fuck</Button>
            <Button style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color="primary">Relay 2</Button>
            <Button style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color="primary">Relay 3</Button>
            <Button style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color="primary">Relay 4</Button>
            <Button style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color="primary">Relay 5</Button>
            <Button style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color="primary">Relay 6</Button>
          </div>
        );
      }
   
    
    
}