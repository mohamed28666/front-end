import React from 'react';
import axios from 'axios';
export default class ws_camera extends React.Component {


    constructor(props) {
        super(props);


    }








    render() {
        let c;


        return (
            <div className="d-inline  threeD container">
                <iframe id="my_iframe" src="https://backend28.herokuapp.com/websocketfile" ></iframe>



            </div>
        );



    }

}