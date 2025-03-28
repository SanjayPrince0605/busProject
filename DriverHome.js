import React, { useEffect, useState, useRef } from 'react';
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HailIcon from "@mui/icons-material/Hail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Typography, Paper, Button } from '@mui/material';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import BusAlertIcon from '@mui/icons-material/BusAlert';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ProgressBar from '../Pages/ProgressBar';
import { useSelector } from 'react-redux';

const DriverHome = ({ window }) => {
    const [startRender, setStartRender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [routeValue, setRouteValue] = useState([]);
    const navigation = useRef([]);
    const demoWindow = window ? window() : undefined;
    const users = useSelector((state) => state.usersInfo.users);
    function initControlArray() {
        const nav_array = [
            { kind: "header", title: "Main items" },
            { segment: "driverhome", title: "DriverHome", icon: <DirectionsBusIcon /> },
            { segment: "studenthome", title: "StudentHome", icon: <HailIcon /> },
            { segment: "busmanage", title: "Bus Management", icon: <SupervisorAccountIcon /> },
            { segment: "livetracking", title: "Live Tracking", icon: <LocationOnIcon /> },
            { segment: "traffic", title: "Traffic", icon: <RailwayAlertIcon /> },
            { segment: "signup", title: "Signout", icon: <LogoutIcon /> },
            { segment: "login", title: "Login", icon: <LoginIcon /> },
        ];

        navigation.current = nav_array;
        setStartRender(true);
    }

    function randomGenerateKey() {
        const busRoute = ["Chennai - Coimbatore", "Bangalore - Hyderabad", "Mumbai - Pune", "Delhi - Agra", "Chennai - Trichy"];
        return { busRoutes: busRoute[Math.floor(Math.random() * busRoute.length)] };
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
        width: "75%",
        height: "85%",
        marginLeft: "150px",
        marginTop: "50px",
        borderRadius: "15px",
        background: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
    };

    const headerTextStyle = {
        fontWeight: "bold",
        margin: "auto",
        paddingTop: "10px"
    };

    const pickUpContainerStyle = {
        width: "70%",
        height: "55%",
        marginLeft: "150px",
        bgcolor: "#e0f7fa",
        marginTop: "30px"
    };

    const mapStyle = {
        width: "90%",
        height: "260px",
        border: 10,
        margin: "auto"
    };

    const buttonStyle = {
        width: "45%",
        marginLeft: "20px",
        borderRadius: "10px",
        '&:hover': {
            backgroundColor: "#1565c0",
            color: "white"
        },
    };

    const sosButtonStyle = {
        width: "40%",
        marginLeft: "50px",
        borderRadius: "10px",
        color: "#616161",
        '&:hover': {
            backgroundColor: "#81c784",
            color: "white"
        },
    };
    useEffect(() => {

        const timeout = setTimeout(() => {
            initControlArray();
            setRouteValue([randomGenerateKey()]);
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            {isLoading && (
                <Box sx={progressBarContainerStyle}>
                    <ProgressBar />
                </Box>
            )}

            {!isLoading && startRender && (
                <Box sx={mainContainerStyle}>
                    <AppProvider navigation={navigation.current} window={demoWindow}>
                        <DashboardLayout sx={{ "& .ToolpadBranding-root": { display: "none" } }}>
                            <Paper elevation={6} sx={paperStyle}>
                                <Typography variant="h5" sx={headerTextStyle}>Driver Home</Typography>
                                <br />
                                <Button variant="outlined" startIcon={<BusAlertIcon />} sx={buttonStyle}>
                                    Start Trip
                                </Button>

                                {/* Pick-up Point Section */}
                                <Paper sx={pickUpContainerStyle}>
                                    <Typography variant='h6' fontWeight="bold" sx={{ color: "black", paddingTop: "2px" }}>
                                        Pick-up Point
                                    </Typography>
                                    <iframe
                                        title="Google Map"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-74.25987571760744!3d40.69767006358627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b60165%3A0x8b621f8a7a7d28a4!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1633452834502!5m2!1sen!2s"
                                        style={mapStyle}
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                </Paper>

                                <br />
                                {routeValue.map((item, index) => (
                                    <Typography key={index}>Stop 1 : {item.busRoutes}</Typography>
                                ))}
                                <br />

                                <Button variant="outlined" startIcon={<LocalHospitalIcon />} sx={sosButtonStyle}>
                                    SOS Emergency Alert
                                </Button>
                            </Paper>
                        </DashboardLayout>
                    </AppProvider>
                </Box>
            )}
        </>
    );
};



export default DriverHome;
