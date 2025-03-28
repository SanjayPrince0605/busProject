import React, { useEffect, useState, useRef } from "react";
import { Container, Grid, Card, CardContent, Typography, Stepper, Step, StepLabel, Box } from "@mui/material";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HailIcon from "@mui/icons-material/Hail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import ProgressBar from '../Pages/ProgressBar';
import { useSelector } from "react-redux";


const Traffic = ({ window }) => {
    const [startRender, setStartRender] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const users = useSelector((state) => state.usersInfo.users);
    const demoWindow = window ? window() : undefined;
    const busTrackingSteps = ["Bus Started", "Reached Stop 1", "Reached Stop 2", "Near Destination", "Arrived"];
    const currentStep = 2;
    const navigation = useRef([]);



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
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    };

    useEffect(() => {

        const timeout = setTimeout(() => {
            initControlArray();
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
                            <Container>
                                <Grid container spacing={3} sx={{ marginTop: 3 }}>
                                    {/* Header Section */}
                                    <Grid item xs={12}>
                                        <Typography variant="h4" align="center" gutterBottom>
                                            Traffic Details
                                        </Typography>
                                    </Grid>

                                    {/* Tracking Details Panel */}
                                    <Grid item xs={12} md={4}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6">Tracking Details</Typography>
                                                <Box mt={2}>
                                                    {users.map((item, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <Typography variant="body1">Name :   {item.name} </Typography>
                                                                <Typography variant="body1">Email Address : {item.email} </Typography>
                                                                <Typography variant="body1">Phone Number : {item.phoneNumber}</Typography>
                                                                <Typography variant="body1">User : {item.selectbox} </Typography>
                                                            </div>
                                                        )
                                                    })
                                                    }

                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                    {/* Tracking Progress */}
                                    <Grid item xs={12} md={8}>
                                        <Card>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    Bus Journey Progress
                                                </Typography>
                                                <Stepper activeStep={currentStep} alternativeLabel>
                                                    {busTrackingSteps.map((label, index) => (
                                                        <Step key={index}>
                                                            <StepLabel>{label}</StepLabel>
                                                        </Step>
                                                    ))}
                                                </Stepper>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Container>
                        </DashboardLayout>
                    </AppProvider>
                </Box>
            )}
        </>
    );
};



export default Traffic;
