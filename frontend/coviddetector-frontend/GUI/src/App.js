import React from "react";
import RecordPage from "./pages/RecordPage";
import LoginPage from "./pages/LoginPage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

class App extends React.Component {

    constructor(props){
        super(props)
    }



    render(){
        return(
        <Router>
            <Switch>
                <Route path="/Login">
                    <LoginPage />
                </Route>
                <Route path="/Record">
                <RecordPage />
            </Route>
            </Switch>
        </Router>
        )
    }

}

export default App;
