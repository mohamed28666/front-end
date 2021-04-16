import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { json } from 'body-parser';

let relays_state;
let rel_number=[];
let etat_de_relais=[];
let display_array=[];




export default class dashboard extends React.Component {

 async updatethestate(e){
  await axios.get('https://backedn.herokuapp.com/'+e.target.innerHTML).then(resp=>{if(resp.data===0){ 
     axios.get('https://backedn.herokuapp.com/set/'+e.target.innerHTML).then(resp=>{ });
    this.setState({random:"30"} ); 
    window.location.reload(); 


  }else if(resp.data===1){
    axios.get('https://backedn.herokuapp.com/reset/'+e.target.innerHTML).then(resp=>{ });
    this.setState({random:"30"} ); 
    window.location.reload(); 

  }});
  
} 



    constructor(props) {
        super(props);
        this.state = {array1:[],array1_state:[],array1_display:[],color:props.color};
        
      }

     

      

      async componentDidMount(){
        
        await axios.get('https://backedn.herokuapp.com').then(resp => {
            relays_state=resp.data;
           
            Object.keys(relays_state).forEach(function(key) {rel_number.push(key);});
            Object.values(relays_state).forEach(function(keyy) {etat_de_relais.push(keyy);});
             
            }); 
        
        this.setState({array1:rel_number})  ;
        this.setState({array1_state:etat_de_relais})  ;
        
        this.state.array1_state.forEach(function (key) { 
          if(key==="0") display_array.push("primary");
          else display_array.push("secondary");
        }) 
        this.setState({array1_display:display_array})  ;  
        
       
        
        
      }   
       
        
          
        
          
      
      
      
      


      render() {
         
        const button_components = this.state.array1.map((rel,index)=>(
          
        
          <Button onClick={(e)=>this.updatethestate(e)} lisa={index}style={{display:'block',marginTop:10,marginLeft:20}} variant="contained" color={this.state.array1_display[index]}>{rel}</Button>
        
     
        ));
        
       
        
        return (
          <div className="welcome-component">
           
           {button_components}
          
            
          </div>
        );
      }
   
    
    
}