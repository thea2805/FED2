import './style.css'
import LabelInput from '../individualComponents/LabelInput';
import SubmitButton from '../individualComponents/SubmitButton';
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode"

const Job = (details) => {

    let token = localStorage.getItem("loginToken");
    let modelId = 0;

    const [amount, setAmount] = useState(0);
    const [text, setText] = useState("");

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const handleTextChange = (event) => {
        setText(event.target.value);
    }

    const handleSubmitExpense = (e) => {
        e.preventDefault();

        let date = new Date();
        let today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let dateTime = today+' '+time;

        //Cannot get the dateTime to work properly... wrong format?
        
        let url = "https://localhost:7181/api/Expenses"
        let expense = {
            "modelId" : modelId,
            "jobId" : details.details.jobId,
            "date" : "2022-05-20T21:24:59.819Z",
            "text" : text,
            "amount" : parseInt(amount)             
        }

        console.log(expense);

        fetch(url, {
            method: "POST",
            body: JSON.stringify(expense),
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem("loginToken"),
                "Content-Type": "application/json",
                "Accept": "application/json"
            })
        })
        .then(response => {
            if(!response.ok){
                alert("Couldn't create expense");
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
                        console.log("expense creation succesful");
                        alert("expense succesfully created");
                        //window.location.replace("/login");
                    }
                }
            },
            (error) => {
                alert("Error: " + error)
            }
        )

    //console.log(details.details.models)
    }

    if(token)
    {
        let payload = jwtDecode(token);
        let email = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        let role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        modelId = parseInt(payload["ModelId"]);

        if(role === "Model")
        {
            return (
                <div className='manager'>
                    <div>
                        <h3>Kunde: {details.details.customer}</h3> 
                        <h3>Lokation: {details.details.location}</h3> 
                        <h3>Start Dato: {details.details.startDate}</h3>
                        <h3>Antal Dage: {details.details.days}</h3> 
                        <h3>Kommentarer: {details.details.comments}</h3> 
                    </div>
        
                    <div>
                    <h1>Tilføj Udgift</h1>
            
                        <form onSubmit={handleSubmitExpense}>
                            <LabelInput labelText="Udgift" name="amount" type="number" value={amount} placeholderText="Udgift" onChange={handleAmountChange}/>
                            <LabelInput labelText="Kommentar" name="text" type="text" value={text} placeholderText="Kommentar" onChange={handleTextChange}/>
                            <div className='alignRight'>
                                <SubmitButton text="Opret"/>
                            </div>
                        </form>
                    </div>
        
                </div>
                    
            )
        }
        
        if(role === "Manager")
        {
            let modelArray = details.details.models;
            console.log(details.details.models[1]);
            //console.log("array"+modelArray[0]);

            const array = details.details.models.map(item => (
                <option key={item} value={item}>{item}</option>
                ));



            return (
                <div className='manager'>
                    <div>
                        <h3>Kunde: {details.details.customer}</h3> 
                        <h3>Lokation: {details.details.location}</h3> 
                        <h3>Start Dato: {details.details.startDate}</h3>
                        <h3>Antal Dage: {details.details.days}</h3> 
                        <h3>Kommentarer: {details.details.comments}</h3> 
                    </div>

                    {/* <div>
                    {details.details.models.map((item) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                    </div> */}
        
                    <div>
                    <h1>Tilføj Model</h1>
            
                    
                    </div>
        
                </div>
                    
            )
        }

    }
    else
        {
            return(
                <h1>Du er ikke logget ind! Log ind først.</h1>
            )
        }
}


export default Job;