"use client";
import "@/app/styles/login.css";
import { useState } from "react";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? "/api/auth/login" : "/api/auth/register";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username: isLogin ? undefined : username }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                window.location.pathname = "/home";
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setErrorMessage("Error: " + error.message);
            console.error("Error:", error);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage(""); // Clear error message when switching forms
        setName(""); // Clear username field when switching to login
    };

    return (
        <div className="authContainer">
            {isLogin ? (
                <>
                    <h2 className="loginTitle">Login</h2>
                    <form onSubmit={handleSubmit} className="authForm">
                        <div className="inputBox">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btnSubmit">LOG IN</button>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <p>
                            Don't have an account?{" "}
                            <button type="button" className="textBtn" onClick={toggleForm}>
                                Sign up
                            </button>
                        </p>
                    </form>
                </>
            ) : (
                <>
                    <h2 className="registerTitle">Registration</h2>
                    <form onSubmit={handleSubmit} className="authForm">
                        <div className="inputBox">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="inputBox">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>
                        <button type="submit" className="btnSubmit">SIGN UP</button>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <p>
                            Already have an account?{" "}
                            <button type="button" className="textBtn" onClick={toggleForm}>
                                Log in
                            </button>
                        </p>
                    </form>
                </>
            )}
        </div>
    );
}
