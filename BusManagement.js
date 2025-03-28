import React, { useEffect, useState, useRef } from 'react';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Box, Paper, Button, Typography } from '@mui/material';
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HailIcon from "@mui/icons-material/Hail";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';
const BusManagement = ({ window }) => {
    const [startRender, setStartRender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
    const progressBarContainerStyle = {
        width: "100%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.8)", // Light overlay effect
    };

    const mainContainerStyle = {
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    };

    const contentContainerStyle = {
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)"
    };

    const paperStyle = {
        width: "480px",
        height: "95%",
        margin: "auto",
        borderRadius: "15px",
        background: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center"
    };

    const buttonStyle = {
        width: "70%",
        marginLeft: "20px",
        '&:hover': {
            backgroundColor: "#1565c0",
            color: "white"
        },
    };

    useEffect(() => {

        const timeout = setTimeout(() => {
            initControlArray();
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    function handleEvent() {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }

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
                            <Box sx={contentContainerStyle}>
                                <Paper elevation={6} sx={paperStyle}>
                                    <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                                        Bus Management
                                    </Typography>
                                    <br />
                                    <Button variant="outlined" startIcon={<AddIcon />} sx={buttonStyle} onClick={handleEvent}>
                                        Add Bus
                                    </Button>
                                    <br /><br />
                                    <Button variant="outlined" startIcon={<EditIcon />} sx={buttonStyle} onClick={handleEvent}>
                                        Edit Bus
                                    </Button>
                                    <br /><br />
                                    <Button variant="outlined" startIcon={<AutoDeleteIcon />} sx={buttonStyle} onClick={handleEvent}>
                                        Delete Bus
                                    </Button>
                                    <br /><br />
                                    <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                                        Driver Management
                                    </Typography>
                                    <br />
                                    <Button variant="outlined" startIcon={<GroupAddIcon />} sx={buttonStyle} onClick={handleEvent}>
                                        Assign Driver
                                    </Button>
                                    <br /><br />
                                    <Button variant="outlined" startIcon={<PersonRemoveAlt1Icon />} sx={buttonStyle} onClick={handleEvent}>
                                        Remove Driver
                                    </Button>
                                    <br /><br />
                                    <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "10px" }}>
                                        Reports
                                    </Typography>
                                    <br />
                                    <Button variant="outlined" startIcon={<LibraryBooksIcon />} sx={buttonStyle} onClick={handleEvent}>
                                        View Trip Logs
                                    </Button>
                                    <br /><br />
                                    <Button variant="outlined" startIcon={<ContactMailIcon />} sx={buttonStyle} onClick={handleEvent}>
                                        Student Usage Stats
                                    </Button>
                                </Paper>
                            </Box>
                        </DashboardLayout>
                    </AppProvider>
                </Box>
            )}
        </>
    );
};




export default BusManagement;
