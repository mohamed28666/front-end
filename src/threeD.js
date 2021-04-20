import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
export default class ThreeD extends React.Component {


  constructor(props) {
    super(props);


  }
  
  async componentDidMount() {
   
    

  }
  readfile(){
    const url = "https://backedn.herokuapp.com/troisd";
    
    const authToken = Cookies.get('auth');
    
    const header = { 'Authorization': `Bearer ${authToken}` };
 
    const iframe = document.getElementById('my_iframe').contentDocument;
    axios.get(url, { headers: header })
      .then((response) => {
        
        iframe.write(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    let c;
    

    return (
      <div className="d-inline  threeD container">
        <iframe id="my_iframe" src="https://backedn.herokuapp.com/troisd" ></iframe>



      </div>
    );



  }
}