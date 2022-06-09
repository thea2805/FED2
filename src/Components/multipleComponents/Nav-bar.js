import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode"


const NavBar = () => {
    
    let token = localStorage.getItem("loginToken");
    console.log(token);
   
    if(token)
    {   
        let payload = jwtDecode(token);
        console.log(payload);
        let email = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        let role = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        console.log(email);
        console.log(role);

        return(
            <div className="nav-wrapper">
                <div className="navigation-bar">
                        <h1>Hej {email}</h1>
    
                        <div className="navbar-big">
                            
                        {/* If logged in as model*/}
                        {role === "Model" && 
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/">Log Ud</Link>
                                    </li>
                                </ul>
                            </nav>
                        }
    
                        {/* If logged in as manager*/}
                        {role === "Manager" && 
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/mypage/createManager">Opret Manager</Link>
                                    </li>
                                    <li>
                                        <Link to="/mypage/createJob">Opret Job</Link>
                                    </li>
                                    <li>
                                        <Link to="/mypage/createModel">Opret Model</Link>
                                    </li>
                                    <li>
                                        <Link to="/">Log Ud</Link>
                                    </li>
                                </ul>
                            </nav>
                        }
                    </div>
                </div>
                
            </div>
                       
        )
        
    }
    else
    {
        return(
            <h1>Du er ikke logget ind! Log ind først.</h1>
        )
    }


   
}

export default NavBar