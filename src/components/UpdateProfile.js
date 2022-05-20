import { useRef, useState } from "react";
import { Button, Card, Form,Alert } from "react-bootstrap";
import { useNavigate ,Link} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function UpdateProfile()
{
    const emailRef=useRef();
    const passwordRef=useRef();
    const passwordConfirmRef=useRef();
    const [error,setError]=useState('');
    const {currentUser,updateEmail,updatePassword}=useAuth();
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value!==passwordConfirmRef.current.value)
        return setError('Passwords do not match');
        
        const promises=[];
        setLoading(true);
        setError('');

        if(emailRef.current.value!==currentUser.email)
        {
            promises.push(updateEmail(emailRef.current.value));
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value));
        }
        Promise.all(promises).then(()=>{
            navigate("/");
        }).catch(()=>{
            setError('Failed to update account');
        }).finally(()=>{
            setLoading(false);
        });
    }
    return(
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {error&&<Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Form.Group id="password-confirm">
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Button disabled={loading} type="submit" className="w-100">Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/">Cancel</Link>
        </div>
        </>
    );
}
export default UpdateProfile;