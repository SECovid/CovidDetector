import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {AppBar, Container} from "@material-ui/core";
import covidIcon from "../images/covidIcon.png";
import React from "react";

export default function Footer() {
    return (
        <AppBar position="static" color="secondary" className="fixed-bottom" style={{marginTop: '1%', maxWidth: '100%'}}>
            <Container maxWidth='100%'>
                <Toolbar>
                    <Typography align='left' style={{flexGrow:1}}>
                        © 2021 Corina - screening version. <br/><i>Project developed for the Software Engineering course at LAU by Georges, Charbel, and Abed</i>
                        <span/>
                    </Typography>
                    <img src={covidIcon} width={50} height={50}/>
                    <div style={{width: '8%'}}/>
                    <Typography align='right'>
                        <i>Reminder that this project does <b>not</b> replace traditional testing. If you feel ill, please contact your physician.</i>
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}