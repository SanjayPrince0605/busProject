import React, { useState, useEffect } from 'react';
import { Box, Paper, TextField, Typography, Button, Grid, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../Pages/ProgressBar';
import { useDispatch } from 'react-redux';
import { setUsers } from '../Slices/UserSlice';


const SignUp = () => {
    const [signUpValue, setSignupValue] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        setpassword: "",
        selectbox: ""
    });

    const [error, setErrors] = useState({
        name: false,
        email: false,
        phoneNumber: false,
        setpassword: false,
        selectbox: false
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

        const timeout = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    function handleOnChange(e) {
        const { name, value } = e.target;
        setSignupValue((curValue) => ({
            ...curValue,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: false
        }));
    }



    const progressBarContainerStyle = {
        width: "100%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.8)",
    };

    const mainContainerStyle = {
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    };

    const paperStyle = {
        padding: "30px",
        width: "350px",
        borderRadius: "15px",
        background: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
    };

    const buttonStyle = {
        width: "50%",
        padding: "10px",
        '&:hover': {
            backgroundColor: "#1565c0",
            color: "white"
        },
    };

    function handleOnClick(event) {
        dispatch(setUsers(signUpValue));
        event.preventDefault();
        // setIsLoading(true);
        // navigate("/traffic");


        const { name, email, phoneNumber, setpassword, selectbox } = signUpValue;

        if (!name.trim() || !email.trim() || !phoneNumber.trim() || !setpassword.trim() || !selectbox) {
            setErrors({
                name: !name.trim(),
                email: !email.trim(),
                phoneNumber: !phoneNumber.trim(),
                setpassword: !setpassword.trim(),
                selectbox: !selectbox
            });

            setIsLoading(false);
            return;
        }


        setTimeout(() => {
            navigate("/traffic");
        }, 1500);
    }

    return (
        <>
            {isLoading && (
                <Box sx={progressBarContainerStyle}>
                    <ProgressBar />
                </Box>
            )}

            {!isLoading && (
                <Box sx={mainContainerStyle}>
                    <Paper elevation={6} sx={paperStyle}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", paddingTop: "20px", marginBottom: "20px" }}>
                            Sign Up
                        </Typography>

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Username"
                                    name="name"
                                    value={signUpValue.name}
                                    onChange={handleOnChange}
                                    error={error.name}
                                    helperText={error.name ? "Username is required" : ""}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={signUpValue.email}
                                    onChange={handleOnChange}
                                    error={error.email}
                                    helperText={error.email ? "Email is required" : ""}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Phone"
                                    type="number"
                                    name="phoneNumber"
                                    value={signUpValue.phoneNumber}
                                    onChange={handleOnChange}
                                    error={error.phoneNumber}
                                    helperText={error.phoneNumber ? "Phone number is required" : ""}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Password"
                                    type="password"
                                    name="setpassword"
                                    value={signUpValue.setpassword}
                                    onChange={handleOnChange}
                                    error={error.setpassword}
                                    helperText={error.setpassword ? "Password is required" : ""}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12}>
                                <FormControl fullWidth error={error.selectbox}>
                                    <InputLabel>Select Role</InputLabel>
                                    <Select
                                        name="selectbox"
                                        value={signUpValue.selectbox}
                                        onChange={handleOnChange}
                                    >
                                        <MenuItem value="Student">Student</MenuItem>
                                        <MenuItem value="Driver">Driver</MenuItem>
                                        <MenuItem value="Admin">Admin</MenuItem>
                                    </Select>
                                    {error.selectbox && <Typography color="error" variant="caption">Please select a role</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <br />
                        <Button
                            variant="outlined"
                            startIcon={<CheckCircleOutlineRoundedIcon />}
                            onClick={handleOnClick}
                            sx={buttonStyle}
                        >
                            Submit
                        </Button>

                        <br />
                        <br />
                    </Paper>
                </Box>
            )}
        </>
    );
};


export default SignUp;
