import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../Pages/ProgressBar';

const Login = () => {
    const [inputValue, setInputValue] = useState({
        username: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        username: false,
        password: false
    });

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Show progress bar for 1.5 seconds when page loads
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
    }, []);

    function handleOnClick(e) {
        const { id } = e.target;
        

        setIsLoading(true);

        setTimeout(() => {
            if (id === "signup") {
                navigate("/signup");
                return;
            }

            e.preventDefault();
            const { username, password } = inputValue;

            if (username.trim() === "" || password.trim() === "") {
                setErrors({
                    username: username.trim() === "",
                    password: password.trim() === ""
                });
                setIsLoading(false);
                return;
            } else {
                navigate("/dashboard");
                setIsLoading(false);
            }
        }, 1000);
    }

    function handleOnChange(e) {
        const { name, value } = e.target;
        setInputValue((currValue) => ({
            ...currValue,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false
        }));
    }

    return (
        <>
            {isLoading && <ProgressBar />} 

            {!isLoading && (
                <Box sx={{
                    width: "100%",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
                }}>
                    <Paper elevation={6} sx={{
                        padding: "30px",
                        width: "350px",
                        borderRadius: "15px",
                        background: "#ffffff",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        textAlign: "center"
                    }}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "20px" }}>Login</Typography>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    name="username"
                                    variant="outlined"
                                    value={inputValue.username}
                                    onChange={handleOnChange}
                                    fullWidth
                                    error={errors.username}
                                    helperText={errors.username ? "Username is required" : ""}
                                    sx={{ '& .MuiInputBase-input': { textAlign: "center" } }}
                                />
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    variant="outlined"
                                    name="password"
                                    value={inputValue.password}
                                    onChange={handleOnChange}
                                    type="password"
                                    fullWidth
                                    error={errors.password}
                                    helperText={errors.password ? "Password is required" : ""}
                                    sx={{ '& .MuiInputBase-input': { textAlign: "center" } }}
                                />
                            </Grid>
                        </Grid>

                        <br />

                        <Button
                            variant="contained"
                            id="login"
                            onClick={handleOnClick}
                            sx={{
                                backgroundColor: "#1976d2",
                                color: "#fff",
                                padding: "10px",
                                width: "50%",
                                borderRadius: "8px",
                                '&:hover': { backgroundColor: "#1565c0" }
                            }}
                        >
                            Login
                        </Button>
                        <br />
                        <br />
                        <Button variant="outlined"
                            onClick={handleOnClick}
                            id='signup'
                            sx={{
                                width: "50%",
                                padding: "10px",
                                color: "#1565c0",
                                borderRadius: "8px",
                                '&:hover': {
                                    backgroundColor: "#1565c0",
                                    color: "white"
                                },
                            }}>Sign up</Button>
                    </Paper>
                </Box>
            )}
        </>
    );
}

export default Login;
