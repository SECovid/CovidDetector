import React from "react";
import RecordPage from "./pages/RecordPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/navbar";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {blue, red} from '@material-ui/core/colors';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue.A700,
        },
        secondary: {
            main: red.A700,
        },
    },
});

class App extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
        <Router>

            <Switch>
                <Route path="/Login">
                    <ThemeProvider theme={theme}>
                        <NavBar/>
                        <LoginPage/>
                    </ThemeProvider>
                </Route>
                <Route path="/">
                    <ThemeProvider theme={theme}>
                        <NavBar/>
                        <RecordPage/>
                    </ThemeProvider>
                </Route>
            </Switch>
        </Router>
    )
    }

}

export default App;
