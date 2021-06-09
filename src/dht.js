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

export default class Dht extends React.Component {
    constructor(props) {
        super(props);
        this.state = { DHT: [], time: Date.now() };


    }
    async componentDidMount() {


        this.interval=setInterval(async () => {

            await axios.get('https://backend28.herokuapp.com/get').then(resp => {
                this.setState({ DHT: resp.data });
                console.log(this.state.DHT)


            });

        }, 5000);

    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    render() {
        return (

            <Grid m={0} item xs={12}  >
                <Box m={0} py={1}>
                    <Paper elevation={15} >
                        <Box m={1} >
                            <Typography align="center" display="block" variant="p"> Temperature :  {this.state.DHT.Temperature} °C </Typography>
                            <Typography align="center" display="block" variant="p">Humidité :      {this.state.DHT.Humidity} % </Typography>
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        );
    }

}