import React from "react";
import {Typography, Box} from "@material-ui/core";
import Helpout from "../components/helpOut/helpout";
import send_request from "../API/APIcalls";


class HelpOutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataCount: 0
        }
    }

    componentDidMount() {
        send_request('admin/training_data','GET').then(
            res => {
                this.setState({dataCount: res['data']['size']})
            }
        )
    }

    render() {
        return (<Box container spacing={2} justify="center">
                <Typography align='center' variant='h3' color='secondary'>Join the {this.state.dataCount} people that have helped us out already </Typography>
                <Typography align='center' variant='h1' color='secondary'>Record now!</Typography>
                <Helpout/>
            </Box>
        )
    }

}

export default HelpOutPage;
