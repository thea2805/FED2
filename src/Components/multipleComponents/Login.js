/* 
    This component handles user login
*/
import { useState } from 'react';
import LabelInput from '../individualComponents/LabelInput';
import SubmitButton from '../individualComponents/SubmitButton';
import './style.css'
import jwtDecode from "jwt-decode"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // The handleChange functions save the userinput, every time a change in input occurs

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents refresh

        let url = "https://localhost:7181/api/Account/login"
        let user = {
            "email" : email,
            "password": password,
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(user),
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        })
        .then(response => {
            if(!response.ok){
                alert("Wrong login");
            }
            else{
                return response.json();
            }
        })
        .then(
            (result) => {
                setSubmitted(true);
                console.log("result", result);

                if(result != undefined){
                    if(result == "Wrong Password" || result == "Invalid Username or Email"){
                        alert("Wrong login");
                    }
                    else {
                        let token = result;
                        console.log("login succesful");
                        console.log(token.jwt);
                        localStorage.setItem("loginToken", token.jwt)
                        
                        window.location.replace("/mypage");
                    }

                }
                
            },
            (error) => {
                setSubmitted(true);
                alert("Error: " + error)
            }
        )
    }

    return (
       <div>
           <form onSubmit={handleSubmit} className='loginForm'>
           <LabelInput type="text" name="emailAddress" placeholderText="ex: email@gmail.com" 
           value={email} labelFor="name" labelText="Email Adress" onChange={handleEmailChange}></LabelInput>
           <LabelInput type="text" name="password" placeholderText="ex: password123" 
           value={password} labelFor="name" labelText="Password" onChange={handlePasswordChange}></LabelInput>
           <SubmitButton text="Log In"></SubmitButton>
           </form>

       </div>
    )
}

export default Login;