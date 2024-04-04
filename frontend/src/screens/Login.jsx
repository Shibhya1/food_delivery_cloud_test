import React, {useState} from 'react'
import {Link , useNavigate } from 'react-router-dom'

export default function Login() {
  
  const [credentials, setCredentials] = useState({ email: " ", password: ""});
  let navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  email: credentials.email, password: credentials.password })


        });
        const resJson = await response.json();
        if (!resJson.success) {
            alert("Enter valid Credentials");
        }
        if(resJson.success){
          localStorage.setItem("authToken", resJson.authToken);
          localStorage.setItem("userEmail", credentials.email);
          console.log(localStorage.getItem("authToken"));
          navigate("/");
        }
        console.log(resJson);
    }
    const onChange = (event) => {
      setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  
  return (
    <div>
       <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange}></input>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange}></input>
                    </div>
                    

                    <button type="submit" className=" m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>New user?</Link>
                </form>
            </div>
    </div>
  )
}
