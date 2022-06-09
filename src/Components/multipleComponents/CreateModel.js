import { useState } from 'react';
import SubmitButton from '../individualComponents/SubmitButton';
import {Link} from "react-router-dom";
//import '../style.css'
import LabelInput from '../individualComponents/LabelInput';


// https://www.freecodecamp.org/news/beginner-react-project-build-basic-forms-using-react-hooks/
// 
const CreateModelForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [addresLine1, setAddresLine1] = useState("");
    const [addresLine2, setAddresLine2] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [height, setHeight] = useState(0);
    const [shoeSize, setShoeSize] = useState(0);
    const [hairColor, setHairColor] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [comments, setComments] = useState("");       
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

    const handlePhoneNoChange = (event) => {
        setPhoneNo(event.target.value);
    }
    
    const handleAddresLine1Change = (event) => {
        setAddresLine1(event.target.value);
    }

    const handleAddresLine2Change = (event) => {
        setAddresLine2(event.target.value);
    }

    const handleZipChange = (event) => {
        setZip(event.target.value);
    }

    const handleCityChange = (event) => {
        setCity(event.target.value);
    }

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    }

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    }

    const handleNationalityipChange = (event) => {
        setNationality(event.target.value);
    }

    const handleHeightChange = (event) => {
        setHeight(event.target.value);
    }

    const handleShoeSizeChange = (event) => {
        setShoeSize(event.target.value);
    }
    
    const handleHairColorChange = (event) => {
        setHairColor(event.target.value);
    }

    const handleEyeColorChange = (event) => {
        setEyeColor(event.target.value);
    }

    const handleCommentsChange = (event) => {
        setComments(event.target.value);
    }
    
    const handlePwChange = (event) => {
        setPassword(event.target.value);
    }
    

    
    const handleSubmit = (e) => {
        e.preventDefault();

        
        let url = "https://localhost:7181/api/Models"
        let model = {
            "firstName" : firstName,
            "lastName" : lastName,
            "email" : email,
            "phoneNo" : phoneNo,
            "addresLine1" : addresLine1,
            "addresLine2" : addresLine2,
            "zip" : zip,
            "city" : city,
            "country" : country,
            "birthDate" : birthDate,
            "nationality" : nationality,
            "height" : height,
            "shoeSize": 0,
            "hairColor": hairColor,
            "eyeColor": eyeColor,
            "comments": comments,            
            "password": password          
            
        }

        console.log(model);
        fetch(url, {
                method: "POST",
                body: JSON.stringify(model),
                headers: new Headers({
                    'Authorization': 'Bearer ' + localStorage.getItem("loginToken"),
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                })
            })
            .then(response => {
                if(!response.ok){
                    alert("Couldn't create model");
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
                            console.log("model creation succesful");
                            alert("Model succesfully created");
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
                <h1>Opret Model</h1>
    
                <form onSubmit={handleSubmit}>
                    <LabelInput labelText="Fornavn" name="firstName" type="text" value={firstName} placeholderText="Fornavn" onChange={handleFirstNameChange}/>
                    <LabelInput labelText="Efternavn" name="lastName" type="text" value={lastName} placeholderText="Efternavn" onChange={handleLastNameChange}/>
                    <LabelInput labelText="E-mail" name="e-mail" type="text" value={email} placeholderText="E-mail" onChange={handleEmailChange}/>
                    <LabelInput labelText="Mobil Nr." name="phoneNo" type="text" value={phoneNo} placeholderText="Mobil Nr." onChange={handlePhoneNoChange}/>
                    <LabelInput labelText="Adresse linje 1" name="addresLine1" type="text" value={addresLine1} placeholderText="adresse" onChange={handleAddresLine1Change}/>
                    <LabelInput labelText="Adresse linje 2" name="addresLine2" type="text" value={addresLine2} placeholderText="adresse fortsat" onChange={handleAddresLine2Change}/>
                    <LabelInput labelText="Postnummer" name="zip" type="text" value={zip} placeholderText="postnummer" onChange={handleZipChange}/>
                    <LabelInput labelText="By" name="city" type="text" value={city} placeholderText="By" onChange={handleCityChange}/>
                    <LabelInput labelText="Land" name="country" type="text" value={country} placeholderText="Land" onChange={handleCountryChange}/>
                    <LabelInput labelText="Fødselsdag" name="birthDate" type="date" value={birthDate} placeholderText="YYYY-MM-DD" onChange={handleBirthDateChange}/>
                    <LabelInput labelText="Nationalitet" name="nationality" type="text" value={nationality} placeholderText="Nationalitet" onChange={handleNationalityipChange}/>
                    <LabelInput labelText="Højde" name="height" type="number" value={height} placeholderText="Højde" onChange={handleHeightChange}/>
                    <LabelInput labelText="Skostørrelse" name="shoeSize" type="number" value={shoeSize} placeholderText="Skostørrelse" onChange={handleShoeSizeChange}/>
                    <LabelInput labelText="Hårfarve" name="hairColor" type="text" value={hairColor} placeholderText="Hårfarve" onChange={handleHairColorChange}/>
                    <LabelInput labelText="Øjenfarve" name="eyeColor" type="text" value={eyeColor} placeholderText="Øjenfarve" onChange={handleEyeColorChange}/>
                    <LabelInput labelText="Kommentarer" name="comments" type="text" value={comments} placeholderText="Kommentarer" onChange={handleCommentsChange}/>
                    <LabelInput labelText="Password" name="password" type="password" value={password} placeholderText="Password" onChange={handlePwChange}/>
                    
    
                    <div className='alignRight'>
                        <SubmitButton text="Opret"/>
                    </div>
                </form>
            </div>
    
        )
    }



export default CreateModelForm;