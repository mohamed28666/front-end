import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { json } from 'body-parser';
import Cookies from 'js-cookie';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
const styles = theme => ({

    spacing: 8



});

export default class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: "text" };


    }
    async  updatethestate(e) {

        this.setState({ text:"ff" });
    };
     componentDidMount() {


      

    }
    componentWillUnmount() {
       
      }
    render() {
        return (

            <Grid m={0} item xs={12}  >
                <Box m={0} py={1}>
                    <Paper elevation={15} >
                        <Box m={1} >
                            <Button onClick={(e) => this.updatethestate(e)}>{this.state.text}</Button>
                           
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        );
    }

}