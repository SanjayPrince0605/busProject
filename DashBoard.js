import React, { useEffect, useState, useRef } from 'react';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from '@mui/material';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import HailIcon from "@mui/icons-material/Hail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import ProgressBar from './ProgressBar';
import { useSelector } from 'react-redux';

const DashBoard = ({ window }) => {
    const [startInit, setStartInit] = useState(true);
    const [startRender, setStartRender] = useState(false);
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
        setStartInit(false);
        setStartRender(true);
    }
    console.log(users);
    useEffect(() => {
        if (startInit == true) {
            initControlArray();
        }
    }, [startInit]);

    return (
        <>
            {!startRender && <ProgressBar />}

            {startRender && (
                <Box
                    sx={{
                        width: "100%",
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    }}
                >
                    <AppProvider navigation={navigation.current} window={demoWindow}>
                        <DashboardLayout sx={{ "& .ToolpadBranding-root": { display: "none" } }}>

                        </DashboardLayout>
                    </AppProvider>
                </Box>
            )}
        </>
    );
};

export default DashBoard;
