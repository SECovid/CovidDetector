import React from "react";
import HistoryTable from "../components/history";
import {Link} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import KeyboardVoiceIcon from "@material-ui/icons/KeyboardVoice";


class HistoryPage extends React.Component {

    render() {
        return (<div><Box  display="flex"
                           justifyContent="center"
                           alignItems="center"marginTop='2em'><Link to='/helpOut'
                           style={{textDecoration: 'none', color: 'white'}}>
            <Button type="button" variant="contained"
                    color="secondary" size='large' startIcon={<KeyboardVoiceIcon />}
            >Help Out</Button>
        </Link></Box>
            <Typography
                align="center" variant="h1">Testing History</Typography>
            <HistoryTable/></div>)
    }


}

export default HistoryPage;
