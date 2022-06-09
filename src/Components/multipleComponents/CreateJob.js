import { useState } from 'react';
import SubmitButton from '../individualComponents/SubmitButton';
import {Link} from "react-router-dom";
//import '../style.css'
import LabelInput from '../individualComponents/LabelInput';


// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
// 
const CreateJobForm = () => {
    const [customer, setCustomer] = useState("");
    const [startDate, setStartDate] = useState("");
    const [days, setDays] = useState(0);   
    const [location, setLocation] = useState("");
    const [comments, setComments] = useState("");

    const handleCustomerChange = (event) => {
        setCustomer(event.target.value);
    }
    
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    }

    const handleDaysChange = (event) => {
        setDays(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }
    
    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    }

    
        
    const handleSubmit = (e) => {
        e.preventDefault();

        
        let url = "https://localhost:7181/api/Jobs"
        let newJob = {
            "customer": customer,
            "startDate": startDate,
            "days": days,
            "location": location,
            "comments": comments
        };

        console.log(newJob);
        fetch(url, {
                method: "POST",
                body: JSON.stringify(newJob),
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem("loginToken"),
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                })
            })
            .then(response => {
                if(!response.ok){
                    alert("Couldn't create job");
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
                            console.log("job creation succesful");
                            alert("Job succesfully created");
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
                <h1>Opret Job</h1>
    
                <form onSubmit={handleSubmit}>
                    <LabelInput labelText="Kunde" name="customer" type="text" value={customer} placeholderText="Kunde" onChange={handleCustomerChange}/>
                    <LabelInput labelText="Start Dato" name="startDate" type="date" value={startDate} placeholderText="Start Dato" onChange={handleStartDateChange}/>
                    <LabelInput labelText="Antal Dage" name="days" type="number" value={days} placeholderText="Antal Dage" onChange={handleDaysChange}/>
                    <LabelInput labelText="Lokation" name="location" type="text" value={location} placeholderText="Lokation" onChange={handleLocationChange}/>
                    <LabelInput labelText="Kommentarer" name="comments" type="text" value={comments} placeholderText="Kommentarer" onChange={handleCommentsChange}/>
    
                    <div className='alignRight'>
                        <SubmitButton text="Opret"/>
                    </div>
                </form>
            </div>
    
        )
    }





export default CreateJobForm;