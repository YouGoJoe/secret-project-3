import React, { useState } from 'react'

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
        <div>
            <form>
                <input name="email" value={userInput.email} onChange={handleChange} type="text" placeholder="email" />
                <input name="password" value={userInput.password} onChange={handleChange} type="password" placeholder="password" />
                <input name="confirmPassword" value={userInput.confirmPassword} onChange={handleChange} type="password" placeholder="confirm password" />
                <input type="submit" value="Sign up" />
            </form>
        </div>
    )
}
