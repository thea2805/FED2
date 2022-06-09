import './style.css'
import Job from './Job';
import { useState, useEffect } from "react";
import {Link} from "react-router-dom"

const JobContainer = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [jobs, setJobs] = useState([]);

    let token = localStorage.getItem("loginToken");
    
    let url = "https://localhost:7181/api/Jobs"
    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json"
            })

        })
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                console.log("loaded")
                console.log(result);
                setJobs(result);
                
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
                console.log("error")
            }
        )
    }, [])

    //console.log(jobs)
    
    if (error) {
        return <div> Error: {error.message}</div>
    } else if (!isLoaded){
        return <div>Loading...</div>
    } else {
        return(
            <div className="">   
                    {jobs.map((job) => (
                        <li><Job details = {job}/></li>
                    ))}
               
            </div>
        );
    }
}

export default JobContainer;

{/* <Link key={job.id} to={`/job/${job.jobId}`}>
                            
                        </Link> */}