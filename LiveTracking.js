import React, { useState, useEffect, useRef } from "react";
import { extendTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Button, Box } from "@mui/material";
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import HailIcon from '@mui/icons-material/Hail';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RailwayAlertIcon from '@mui/icons-material/RailwayAlert';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Replay10Icon from '@mui/icons-material/Replay10';
import ProgressBar from "./ProgressBar";

const LiveTracking = ({ window }) => {
    const [startRender, setStartRender] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [disable, setDisable] = useState(false);
    const navigation = useRef([]);
    const demoWindow = window ? window() : undefined;

    function initControlArray() {
        const nav_array = [
            { kind: "header", title: "Main items" },
            { segment: "driverhome", title: "DriverHome", icon: <DirectionsBusIcon />, },
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

    useEffect(() => {

        const timeout = setTimeout(() => {
            initControlArray();
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    function handleOnClick() {
        setIsLoading(true);
        setDisable(true);

        setTimeout(() => {
            setIsLoading(false);
            setDisable(false);
        }, 2000);
    }
    const progressBarContainerStyle = {
        width: "100%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.8)",
    };

    const buttonStyle = {
        width: "22%",
        padding: "10px",
        color: "#1565c0",
        borderRadius: "8px",
        '&:hover': {
            backgroundColor: "#1565c0",
            color: "white"
        },
        marginLeft: "300px"
    };
    const demoTheme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: "class",
        breakpoints: {
            values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
        },
    });

    return (
        <>
            {isLoading && (
                <Box sx={progressBarContainerStyle}>
                    <ProgressBar />
                </Box>
            )}

            {!isLoading && startRender && (
                <AppProvider navigation={navigation.current} theme={demoTheme} window={demoWindow}>
                    <DashboardLayout sx={{ "& .ToolpadBranding-root": { display: "none" } }}>
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-74.25987571760744!3d40.69767006358627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b60165%3A0x8b621f8a7a7d28a4!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1633452834502!5m2!1sen!2s"
                            style={{ width: "80%", height: "500px", border: 10, marginLeft: "0px" }}
                            allowFullScreen
                            loading="lazy"
                        />
                        <br />
                        <Button
                            variant="outlined"
                            onClick={handleOnClick}
                            startIcon={<Replay10Icon />}
                            disabled={disable}
                            sx={buttonStyle}
                        >
                            {disable ? "Wait..." : "Refresh"}
                        </Button>
                    </DashboardLayout>
                </AppProvider>
            )}
        </>
    );
};




export default LiveTracking;
