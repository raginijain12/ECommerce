import { useRef, useState } from "react";
import { Card, Form,Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";

function Login()
{
    const emailRef=useRef();
    const passwordRef=useRef();

    const {currentUser,login}=useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    async function handleLogin(e)
    {
        e.preventDefault();
        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value,passwordRef.current.value);
            navigate('/');

        }catch{
            setError('Login Failed');
        }
        setLoading(true);
    }
    return(
        <>
        <Card>
            <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error&&<Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleLogin}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef}/>
                    </Form.Group>
                    <Button disabled={loading} className='w-100' type='submit'>Login</Button>
                </Form>
                <div className="w-100 text-center mt-3">
               <Link to='/forgot-password'>Forgot Password</Link>
               </div> 
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Do not have account? <Link to='/signup'>Sign Up</Link>
        </div>
        </>
    );
}
export default Login;