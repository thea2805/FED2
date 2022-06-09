import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"


import './App.css';
import CreateModelForm from "./Components/multipleComponents/CreateModel";
import Job from "./Components/multipleComponents/Job";
import JobContainer from "./Components/multipleComponents/JobContainer";
import Login from "./Components/multipleComponents/Login";
import NavBar from "./Components/multipleComponents/Nav-bar";
import CreateManagerForm from "./Components/multipleComponents/CreateManager";
import CreateJobForm from "./Components/multipleComponents/CreateJob";

function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/mypage" element={<JobContainer/>}></Route>
        <Route path="/mypage/createModel" element={<CreateModelForm/>} ></Route>
        <Route path="/mypage/createManager" element={<CreateManagerForm/>} ></Route>
        <Route path="/mypage/createJob" element={<CreateJobForm/>} ></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
