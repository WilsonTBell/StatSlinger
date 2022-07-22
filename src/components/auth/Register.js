import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [shooter, setShooter] = useState({
        email: "",
        fullName: "",
        alias: "",
        category: "",
        isAdmin: false
    })
    let navigate = useNavigate()

    const registerNewShooter = () => {
        return fetch("http://localhost:8088/shooters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(shooter)
        })
            .then(res => res.json())
            .then(createdShooter => {
                if (createdShooter.hasOwnProperty("id")) {
                    localStorage.setItem("stat_slinger", JSON.stringify({
                        id: createdShooter.id,
                        admin: createdShooter.isAdmin
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/shooters?email=${shooter.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewShooter()
                }
            })
    }

    const updateShooter = (evt) => {
        const copy = {...shooter}
        copy[evt.target.id] = evt.target.value
        setShooter(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for StatSlinger</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateShooter}
                           type="text" id="fullName" className="form-control"
                           placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="fullName"> Alias </label>
                    <input onChange={updateShooter}
                           type="text" id="alias" className="form-control"
                           placeholder="Enter your Cowboy Action Alias" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateShooter}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}