import React, { useRef, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup,currentUser}=useAuth();
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    async function submitHandle(e){
        e.preventDefault();
        if(passwordRef.current.value!==passwordConfirmRef.current.value){
            return setError('Passwords do not match');

        }
        try{
             setError('');
            setLoading(true);
            await signup(emailRef.current.value,passwordRef.current.value);
            navigate("/");
        }catch{
             setError('Failed to create an account');
        }
        setLoading(false);
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={submitHandle}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" required ref={emailRef} />

                        </Form.Group>
                        <Form.Group id="password">

                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" required ref={passwordRef} />

                        </Form.Group>
                        <Form.Group id="password-confirm">

                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" required ref={passwordConfirmRef} />

                        </Form.Group>
                        <Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>

                        </Form>
                        </Card.Body>
                        </Card>
                        <div className="w-100 text-center mt-2">
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>  
                  </>
    );
}