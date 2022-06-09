import { useState } from 'react';
import SubmitButton from '../individualComponents/SubmitButton';
import {Link} from "react-router-dom";
//import '../style.css'
import LabelInput from '../individualComponents/LabelInput';


// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
// 
const CreateManagerForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");   
    const [password, setPassword] = useState("");

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }
    
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    
    const handlePwChange = (event) => {
        setPassword(event.target.value);
    }
        
    const handleSubmit = (e) => {
        e.preventDefault();

        
        let url = "https://localhost:7181/api/Managers"
        let manager = {
            "firstName" : firstName,
            "lastName" : lastName,
            "email" : email,           
            "password": password          
            
        }

        console.log(manager);
        fetch(url, {
                method: "POST",
                body: JSON.stringify(manager),
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem("loginToken"),
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                })
            })
            .then(response => {
                if(!response.ok){
                    alert("Couldn't create manager");
                }
                else{
                    return response.json();
                }
            })
            .then(
                (result) => {
                    console.log("result", result);

                    if(result !== undefined){
                        if ( result === "Email Exists")
                        {
                            alert("Bruger med denne email findes allerede");
                        }
                        else if (result === "Invalid Email Format")
                        {
                            alert("Forkert email format");
                        }
                        else {
                            console.log("manager creation succesful");
                            alert("Manager succesfully created");
                            //window.location.replace("/login");
                        }
                    }
                },
                (error) => {
                    alert("Error: " + error)
                }
            )
        }
        
        return (
            <div className='loginForm'>
                <h1>Opret Manager</h1>
    
                <form onSubmit={handleSubmit}>
                    <LabelInput labelText="Fornavn" name="firstName" type="text" value={firstName} placeholderText="Fornavn" onChange={handleFirstNameChange}/>
                    <LabelInput labelText="Efternavn" name="lastName" type="text" value={lastName} placeholderText="Efternavn" onChange={handleLastNameChange}/>
                    <LabelInput labelText="E-mail" name="e-mail" type="text" value={email} placeholderText="E-mail" onChange={handleEmailChange}/>
                    <LabelInput labelText="Password" name="password" type="password" value={password} placeholderText="Password" onChange={handlePwChange}/>
                    
    
                    <div className='alignRight'>
                        <SubmitButton text="Opret"/>
                    </div>
                </form>
            </div>
    
        )
    }



export default CreateManagerForm;