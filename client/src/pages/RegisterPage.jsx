import React, { useState, useContext } from 'react'
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import setAuthToken from '../utils/setAuthToken'
import {UserContext} from "../App"
import { useHistory } from "react-router-dom";
import {Redirect} from "react-router-dom"

export default function RegisterPage() {
    const history = useHistory();
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    const me = useContext(UserContext)

    const handleChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        let JWT = await axios.post("/auth/signup", {
            email: userInput.email,
            password: userInput.password,
            confirmPassword: userInput.confirmPassword
        })

        localStorage.setItem("token", JWT.data.token)

        setUserInput({
            email: "",
            password: "",
            confirmPassword: ""
        })

        setAuthToken(JWT.data.token)

        const user = await axios.get("/auth")

        me.setUser(user.data)

        history.push("/browse")
    }

    return (
        <Form onSubmit={handleSubmit}>
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

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}
