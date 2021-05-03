import React from 'react';
import axios from 'axios';
export default class Ws_camera extends React.Component {


  constructor(props) {
    super(props);


  }





  readfile() {
    const url = "https://backend28.herokuapp.com/websocketfile";

    // const authToken = Cookies.get('auth');

    //const header = { 'Authorization': `Bearer ${authToken}` };

    const iframe = document.getElementById('my_iframe').contentDocument;
    axios.get(url)
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
      
        <div className="embed-responsive embed-responsive-16by9 col-8">
          <iframe id="" src="https://backend28.herokuapp.com/websocketfile" ></iframe>
 

       
      </div>
    );



  }

}