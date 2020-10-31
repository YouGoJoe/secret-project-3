import React, { useState } from 'react'
import { Form, Button } from "react-bootstrap"

export default function RegisterPage() {

    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    name="email" 
                    value={userInput.email} 
                    onChange={handleChange}
                    type="email" 
                    placeholder="Enter email"
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    name="password" 
                    value={userInput.password} 
                    onChange={handleChange}
                    type="password" 
                    placeholder="Password" 
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    name="confirmPassword" 
                    value={userInput.confirmPassword} 
                    onChange={handleChange}
                    type="password" 
                    placeholder="Password" 
                />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
