import React from "react";
import '../App.css'
import Login from "../components/login";
import Register from "../components/register"


class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogginActivate: true,
        }
    }
    changeState(){
        const {isLogginActivate} = this.state;
        if(isLogginActivate){
            this.RightSide.classList.remove("right");
            this.RightSide.classList.add("left");
        } else {
            this.RightSide.classList.remove("left");
            this.RightSide.classList.add("right");
        }
        this.setState((prevState)=>({isLogginActivate: !prevState.isLogginActivate}));
    }
    render(){
        const { isLogginActivate } = this.state;
        const current  = isLogginActivate ? "Register":"Login";

        return(
            <div className="App">
                <div className="login">
                    <div className="container">
                        {isLogginActivate && (<Login containerRef = {(ref) => this.current = ref}/>)}
                        {!isLogginActivate && (<Register containerRef = {(ref) => this.current = ref}/>)}
                    </div>
                    <RightSide current={current} containerRef={ref => this.RightSide = ref} onClick={this.changeState.bind(this)} />
                </div>
            </div>
        );
    }

}

const RightSide = props => {
    return <div className="right-side" ref={props.containerRef} onClick={props.onClick}>
        <div className="inner-container">
            <div className="text">
                {props.current}
            </div>
        </div>
    </div>
}

export default LoginPage;
