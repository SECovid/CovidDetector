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
import AdminPage from "./pages/AdminPage";
import adminTheme from "./themes/index";
import Footer from "./components/footer";


const theme = createMuiTheme({
    palette: {
        secondary: {
            main: blue.A700,
        },
        primary: {
            main: hexToRgb('#ffffff'),
        },
    },
    typography: {
        fontSize: 16,
        fontFamily: [
            "Roboto", "Helvetica", "Arial", 'sans-serif',
        ].join(','),
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
                            <div style={{minHeight: '100vh', position: 'relative'}}>
                            <NavBar/>
                            <LoginPage/>
                            </div>
                            <Footer/>
                        </ThemeProvider>
                    </Route>
                    <Route path="/history">
                        <ThemeProvider theme={theme}>
                            <div style={{minHeight: '100vh', position: 'relative'}}>
                            <NavBar/>
                            <HistoryPage/>
                            </div>
                            <Footer/>
                        </ThemeProvider>
                    </Route>
                    <Route path="/admin">
                        <ThemeProvider theme={theme}>
                            <div style={{minHeight: '100vh', position: 'relative'}}>
                            <NavBar/>
                            <ThemeProvider theme={adminTheme}>
                                <AdminPage/>
                            </ThemeProvider>
                            </div>
                            <Footer/>
                        </ThemeProvider>
                    </Route>
                    <Route path="/helpOut">
                        <ThemeProvider theme={theme}>
                            <div style={{minHeight: '100vh', position: 'relative'}}>
                            <NavBar/>
                            <HelpOutPage/>
                            </div>
                            <Footer/>
                        </ThemeProvider>
                    </Route>
                    <Route path="/">
                        <ThemeProvider theme={theme}>
                            <div style={{minHeight: '100vh'}}>
                            <NavBar/>
                            <RecordPage/>
                            </div>
                            <Footer/>
                        </ThemeProvider>
                    </Route>

                </Switch>
            </Router>
        )
    }
}

export default App;
