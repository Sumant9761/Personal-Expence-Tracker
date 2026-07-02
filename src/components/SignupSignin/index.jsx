import React, { useState } from 'react'
import './style.css'
import Input from '../Input'
import Button from '../Button'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, getDoc } from "firebase/firestore"; 


const SignupSigninComponent = () => {
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[confirmPassword, setConfirmPassword] = useState("");
    const[loginForm, setLoginForm] = useState(false);
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function signupWithEmail(){
      setLoading(true);
      //Authenticate the user, or basically create a new account using email & password.
      if(name !== "" && email !== "" && password !== "" && confirmPassword !== ""){
        if(password === confirmPassword){
          createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
          // Signed up 
            const user = userCredential.user;
            toast.success("User created!");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            createDoc(user);
            navigate("/dashboard");
            // Create a doc with user id as the following id
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
          });
        }else{
          toast.error("Password and Confirm Password don't match!");
          setLoading(false);
        }
        
      }else{
        toast.error("All fields are mandatory!")
        setLoading(false);
      }
    }

    function loginUsingEmail(){
      setLoading(true);
      if(email !== "" && password !== "" ){
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("User Logged In!");
          setLoading(false);
          navigate("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
        });
      }else{
        toast.error("All fields are mandatory!");
        setLoading(false);
      }
      
    }

    async function createDoc(user){
      setLoading(true);
      // Make sure that the doc with uid doesn't exist 
      //create a doc
      if(!user) return;

      const useRef = doc(db, "users", user.uid);
      const userData = await getDoc(useRef);

      if(!userData.exists()){
        try{
          await setDoc(useRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
          });
          toast.success("User doc created!");
          setLoading(false);
        }catch (e){
          toast.error(e.message);
          setLoading(false);
        }
      }else{
        toast.error("Doc already exists!");
        setLoading(false);
      }
    }


  return (
    <>
    {loginForm ? (
      <div className='signup-wrapper'>
          <h2 className='title'>
              Login on <span style={{ color: 'var(--theme)' }}>Financely.</span>
          </h2>
          <form>
              <Input 
                type="email"
                label={"Email"} 
                state={email} 
                setState={setEmail} 
                placeholder={"JohnDoe@gmail.com"} 
              />
              <Input 
                type="password"
                label={"Password"} 
                state={password} 
                setState={setPassword} 
                placeholder={"Example@123"} 
              />  
              <Button 
                disabled={loading}
                text={loading ? "Loading..." : "Login Using Email and Password"} 
                onClick={loginUsingEmail} 
              />
              <p className='p-login'>or</p>
              <Button 
                text={loading ? "Loading..." :"Login Using Google"} 
                blue={true} 
              />
              <p 
                className='p-login' 
                onClick={() => setLoginForm(!loginForm)}
                style={{ cursor: 'pointer' }}
              >
                or Don't Have An Account ? Click Here
              </p>
          </form>
      </div>
      ) : (
        <div className='signup-wrapper'>
          <h2 className='title'>
              Sign Up on <span style={{ color: 'var(--theme)' }}>Financely.</span>
          </h2>
          <form>
              <Input 
                type="text"
                label={"Full Name"} 
                state={name} 
                setState={setName} 
                placeholder={"John Doe"} 
              />
              <Input 
                type="email"
                label={"Email"} 
                state={email} 
                setState={setEmail} 
                placeholder={"JohnDoe@gmail.com"} 
              />
              <Input 
                type="password"
                label={"Password"} 
                state={password} 
                setState={setPassword} 
                placeholder={"Example@123"} 
              />  
              <Input 
                type="password"
                label={"Confirm Password"} 
                state={confirmPassword} 
                setState={setConfirmPassword} 
                placeholder={"Example@123"} 
              />  
              <Button 
                disabled={loading}
                text={loading ? "Loading..." : "Signup Using Email and Password"} 
                onClick={signupWithEmail} 
              />
              <p className='p-login'>or</p>
              <Button 
                text={loading ? "Loading..." :"Signup Using Google"} 
                blue={true} 
              />
              <p 
                className='p-login' 
                onClick={() => setLoginForm(!loginForm)}
                style={{ cursor: 'pointer' }}
              >
                or Have An Account Already ? Click Here
              </p>
          </form>
        </div>
      )}
    </>
  )
}

export default SignupSigninComponent