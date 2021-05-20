import React from "react";
import {Typography, Box} from "@material-ui/core";
import Helpout from "../components/helpout";


class HelpOutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Box container spacing={2} justify="center">
                <Typography align='center' variant='h1' color='secondary'  >Record now to help us out!</Typography>
                <Helpout/>
            </Box>
        )
    }

}

export default HelpOutPage;
