import React, { useState } from "react";
import Select from "react-select";
import Spinner from "./Spinner";

export default function Age(props) {
  const host = process.env.REACT_APP_BASEURL
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!document.getElementById("dob").value || !selectedOptionGender.value || !selectedOptionOrientation.value) {
      console.log();
      document.getElementById("age_page_alert").style.opacity = 1;
      return;
    }

    props.setspinner(true)
    const response = await fetch(`${host}/details/userDetails`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: props.getUserID(localStorage.getItem("token")).user.id,
        birth_date: document.getElementById("dob").value,
        gender: selectedOptionGender.value,
        sexual_orientation: selectedOptionOrientation.value ,
      }),
    });
    if (response.ok) {
      var name=document.getElementsByClassName("outer_signup");
      Array.prototype.forEach.call(name,(element) => {
        element.style.transform="translateX(-300vw)";
        element.style.transition="1s";
      });
      props.setspinner(false)
      
      
    }
  };
  const handlebackwardSlide = (e) => {
    e.preventDefault();
    var name=document.getElementsByClassName("outer_signup");
    Array.prototype.forEach.call(name,(element) => {
      element.style.transform="translateX(-100vw)";
      element.style.transition="1s";
    });
  };



  const gender = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const sexual_Orientation = [
    { value: "Straight", label: "Straight" },
    { value: "Lesbian", label: "Lesbian" },
    { value: "Gay", label: "gay" },
    { value: "Other", label: "Other" },
  ]

  const [selectedOptionGender, setSelectedOptionGender] = useState(null);
  const [selectedOptionOrientation, setSelectedOptionOriantation] = useState(null);

  const handleGender =(selectedGender)=>{
    setSelectedOptionGender(selectedGender);
  }
  const handleOrientation =(selectedOrientation)=>{
    setSelectedOptionOriantation(selectedOrientation);
  }

  return (
    <>
      <div className="outer_signup" id="age">
        <div className="col1" id="blurer"></div>
        <div className="col2">
          <div className="upper">
            <h2>Enter Your Details</h2>
          </div>
          <div className="middle">
            <form action="">
              <h4>Enter your Birthday</h4>
              <input type="date" id="dob" placeholder="Enter Your age" />
              <h4>Select Gender</h4>
              <Select
                id="gender"
                className="gender"
                options={gender}
                onChange={handleGender}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: localStorage.getItem("mode") === 'light' ? 'white' : 'white',
                    border: 0,
                    boxShadow: localStorage.getItem("mode") === 'light' ? "none" : null,
                    background : 'transparent',
                  
                  }),
                }}
                
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: localStorage.getItem("mode") === 'light' ? "var(--light)" : "var(--light)",
                    primary: localStorage.getItem("mode") === 'light' ? "var(--light)" : "var(--light)",
                    neutral80: localStorage.getItem("mode") === 'light' ? 'black' : 'white',
                    
                  },
                })}
              />
              <h4>Sexual Orientation</h4>
              <Select
                id="sexual_orientation"
                className="gender"
                onChange={handleOrientation}
                options={sexual_Orientation}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: localStorage.getItem("mode") === 'light' ? 'white' : 'white',
                    border: 0,
                    boxShadow: localStorage.getItem("mode") === 'light' ? "none" : null,
                    background : 'transparent',
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: localStorage.getItem("mode") === 'light' ? "var(--light)" : "var(--light)",
                    primary: localStorage.getItem("mode") === 'light' ? "var(--light)" : "var(--light)",
                    neutral80: localStorage.getItem("mode") === 'light' ? 'black' : 'white',
                  },
                })}
              />
              <p className="alert" id="age_page_alert">
                Fill the required fields
              </p>
              <button className="btn" onClick={handleSubmit}>
                {props.spinner?<Spinner />:"Next"}
              </button>
              <button className="btn_back" onClick={handlebackwardSlide}>
                Back
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
