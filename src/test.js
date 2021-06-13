import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { json } from 'body-parser';
import Cookies from 'js-cookie';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/styles';

import On from './On.jpg';
import off from './OFF.jpg'
import Avatar from '@material-ui/core/Avatar';
import { Height } from '@material-ui/icons';
const styles = theme => ({

    spacing: 8



});

export default class Test extends React.Component {
    constructor(props) {
        super(props);

        this.state = { Relays: [], Images: [] ,cookie:""}


    }
    async updatethestate(e, i) {
        let temp = [...this.state.Relays];
        let images = [...this.state.Images]
        if (temp[i] === "0") {
            temp[i] = "1";
            images[i] = On;



            axios.get('https://backend28.herokuapp.com/set/relay' + i+1, {
                headers: {
                    'Authorization': `Bearer ${this.state.cookie}`

                }
            }).then(resp => {

                this.setState({ Relays: temp });
                this.setState({ Images: images });
                console.log(resp);
            });

        }
        else {
            temp[i] = "0";
            images[i] = off;
            axios.get('https://backend28.herokuapp.com/reset/relay' + i+1, {
                headers: {
                    'Authorization': `Bearer ${this.state.cookie}`

                }
            }).then(resp => {

                this.setState({ Relays: temp });
                this.setState({ Images: images });
                console.log(resp);
            });
            this.setState({ Relays: temp });
            this.setState({ Images: images });
        }


    };
    
    async componentDidMount() {
        
        

        window.localStorage.setItem("auth", window.location.href.split("token=")[1]);
        this.setState({ cookie: localStorage.getItem('auth') });
        console.log(this.state.cookie);
        await axios.get('https://backend28.herokuapp.com/SU').then((resp) => {

            this.setState({ Relays: resp.data });

        });


        this.setState({ Relays: Object.values(this.state.Relays) })
        let images = [];
        for (let i = 0; i < this.state.Relays.length; i++) {

            if (this.state.Relays[i] === "1") {
                images[i] = On;

            } else {
                images[i] = off;
            }


        }
        this.setState({ Images: images })
        console.log(this.state.Relays)
    }
    componentWillUnmount() {

    }
    render() {

        let component = [];
        for (let i = 0; i < this.state.Relays.length; i++) {
            let R = this.state.Relays;
            let images = this.state.Images

            if (R[i] == "1") {

                component.push(

                    <Paper elevation={10} style={{ backgroundColor: 'beige', width: "100%" }}>



                        <Box p={1} my={5} >

                            <Avatar style={{ height: '100%', width: "100%", alignSelf: 'center' }} variant={'circular'} src={images[i]}  ></Avatar>


                            <Box my={2}  >
                                <Paper elevation={24}>

                                    <Button size="large" onClick={(e) => this.updatethestate(e, i)} style={{ display: 'block', width: "100%", }} variant="contained" >{R[i]}</Button>
                                </Paper>
                            </Box>
                        </Box>


                    </Paper>

                );
            } if (R[i] == "0") {



                component.push(
                    <Paper elevation={10} style={{ backgroundColor: 'beige', width: "100%" }}>



                        <Box p={1} my={5} >

                            <Avatar style={{ height: '100%', width: "100%", alignSelf: 'center' }} variant={'circular'} src={images[i]} ></Avatar>


                            <Box my={2}  >
                                <Paper elevation={24}>

                                    <Button size="large" onClick={(e) => this.updatethestate(e, i)} style={{ display: 'block', width: "100%", }} variant="contained" >{R[i]}</Button>
                                </Paper>
                            </Box>
                        </Box>


                    </Paper>
                )
            }

        }



        return (
            <>
                <Grid m={0} item xs={12}  >
                    {component}
                </Grid>
            </>

        );
    }

}