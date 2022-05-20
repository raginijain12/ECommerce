import { useRef, useState } from "react";
import { Alert, Card, Form,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ForgotPassword()
{
    const [error,setError]=useState('');
    const [message,setMessage]=useState('');
    const [loading,setLoading]=useState(false);
    const emailRef=useRef();
    const {resetPassword}=useAuth();
    
   async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for the reset link');
        }catch{
            setError("Failed to reset the password");
        }
        setLoading(false);
    }

    return(
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Forgot Password</h2>
                {error&&<Alert variant="danger">{error}</Alert>}
                {message&&<Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} required/>
                    </Form.Group> 
                    <Button type='submit' className='w-100' disabled={loading}>Reset Password</Button>
                </Form>
                <div className="text-center w-100 mt-2">
                    <Link to="/login">Log In</Link>
                </div>
                <div className="text-center w-100 mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Card.Body>
        </Card>
        </>
    );
}
export default ForgotPassword;