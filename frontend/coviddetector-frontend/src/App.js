import React from "react";
import RecordPage from "./pages/RecordPage";
import LoginPage from "./pages/LoginPage";
import HistoryPage from "./pages/HistoryPage";
import NavBar from "./components/navbar";
import {createMuiTheme, hexToRgb} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {blue, red} from '@material-ui/core/colors';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import HelpOutPage from "./pages/HelpOutPage";
import AdminPage from "./admin/AdminPage";
import adminTheme from "./themes/index";


const theme = createMuiTheme({
    palette: {
        secondary: {
            main: blue.A700,
        },
        primary: {
            main: hexToRgb('#ffffff'),
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
                    <Route path="/history">
                        <ThemeProvider theme={theme}>
                            <NavBar/>
                            <HistoryPage/>
                        </ThemeProvider>
                    </Route>
                    <Route path="/admin">
                        <ThemeProvider theme={theme}>
                            <NavBar/>
                            <ThemeProvider theme={adminTheme}>
                                <AdminPage/>
                            </ThemeProvider>
                        </ThemeProvider>
                    </Route>
                    <Route path="/helpOut">
                        <ThemeProvider theme={theme}>
                            <NavBar/>
                            <HelpOutPage/>
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
