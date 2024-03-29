import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../images/google.png";
import Spinner from "./Spinner";


var data_context = React.createContext();

export default function Signup(props) {

  const Navigate = useNavigate();
  const host = process.env.REACT_APP_BASEURL
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cpassword: "",
  });
  var [data, setData] = useState({ first_name: null, last_name: null, email: null });
  var [personal, setPersonal] = useState({ birthday: null, gender: null });
  const handleOnChange = (e) => {
    // if(data.email!=null){setCredentials({...credentials,email:data.email})}
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (credentials.password.length < 8) {
      console.log(credentials.password);
      console.log(credentials.password.length);
      document.getElementById("alert").style.opacity = 1;
      document.getElementById("alert").innerHTML = "Minimum 8 character required";
      return;
    }
    if (!credentials.email || !credentials.password || !credentials.cpassword) {
      document.getElementById("alert").style.opacity = 1;
      document.getElementById("alert").innerHTML = "Fill required fields";
      return;
    }
    if (credentials.password !== credentials.cpassword) {
      document.getElementById("alert").style.opacity = 1;
      document.getElementById("alert").innerHTML = "Password does not match";
      return;
    }
    props.setspinner(true)
    const response = await fetch(`${host}/auth/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (response.status === 409) {
      document.getElementById("alert").style.opacity = 1;
      document.getElementById("alert").innerHTML = "User already exist";
      return;
    }
    if (json.success) {
      localStorage.setItem("token", json.token) 
      var name=document.getElementsByClassName("outer_signup");
      Array.prototype.forEach.call(name,(element) => {
        element.style.transform="translateX(-100vw)";
        element.style.transition="1s";
      });
      props.setspinner(false)
    }
  };

  const changeMode = () => {
    if (localStorage.getItem("mode")) {
      console.log(localStorage.getItem("mode"))
      if (localStorage.getItem("mode") === "light") {
        console.log("hello")
        localStorage.setItem("mode", "dark")
        window.location.reload()
        return
      }
      else {
        localStorage.setItem("mode", "light")
        window.location.reload()
        return
      }
    }
    localStorage.setItem("mode", "light")
  }


  // useEffect(()=>{
  //   //if user is logged in then redirect to home page
  //   if(localStorage.getItem("token")){
  //     Navigate("/home")
  //   }
  // },[])

  const handleCal = async () => {
    var auth_obj = window.gapi.auth2.getAuthInstance();
    console.log(auth_obj);

    await auth_obj
      .signIn()
      .then(async (e) => {
        console.log(e);

        setData({
          first_name: e.tv.PZ,
          last_name: e.tv.eY,
          email: e.tv.fw
        })
        console.log("data =");
        console.log(data);
      })
    const state = await window.gapi.auth2.getAuthInstance().isSignedIn.Oa;
    if (state) {
      Navigate("/home");
    }
  }
  const handlePasswordShow=(e)=>{
    e.preventDefault()
    if( e.target.parentElement.parentElement.firstChild.type === "text"){
      e.target.parentElement.parentElement.firstChild.type = "password"
      
      return
    }
    e.target.parentElement.parentElement.firstChild.type = "text"
   
  }

  return (
    <>
      {/* {props.handleCall(data, personal)} */}
      <div className="outer_signup" id="outer_signup" style={{ overflow: "hidden" }}>
        <div className="col1"></div>
        <div className="col2">
          <div className="upper">
            <h2>Become a Mingo Member</h2>
            <button className="google_btn">
              <div className="google_logo">
                <img src={google} alt="google" />
              </div>
              <div>Signup With Google</div>
            </button>
            <p className="or">OR</p>
          </div>
          <div className="middle">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleOnChange}
                value={credentials.email}
                placeholder="Enter Your Email"
                disabled={data.email != null && true}
              />

              <div className="passwordDiv">

                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleOnChange}
                  placeholder="Password"
                />
                {document.getElementById("password") && document.getElementById("password").value.length>0 && <button onClick={handlePasswordShow}>
                  <i class="bi bi-eye"></i>
                </button>}
              </div>
              <div className="passwordDiv" >

                <input
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                />
                {document.getElementById("cpassword") && document.getElementById("cpassword").value.length>0 && <button onClick={handlePasswordShow}>
                  <i class="bi bi-eye"></i>
                </button>}
              </div>
              <p className="alert" id="alert">
                demo
              </p>
              <button className="btn" type="submit">
                {props.spinner?<Spinner />:"Next"}
              </button>
            </form>
            <h5 className="last_child">
              Already Member? <a href="/login">Find Your Match</a>
            </h5>
            <div className="modes">
              <button className="btn" onClick={changeMode}>dark mode</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { data_context };
