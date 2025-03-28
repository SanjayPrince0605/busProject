import React, { useState, useRef, useEffect } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HailIcon from "@mui/icons-material/Hail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RailwayAlertIcon from "@mui/icons-material/RailwayAlert";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ProgressBar from '../Pages/ProgressBar';
import { useSelector } from "react-redux";
const StudentHome = ({ window }) => {
  const [startInit, setStartInit] = useState(true);
  const [startRender, setStartRender] = useState(false);
  const [busValue, setBusValue] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const users = useSelector((state) => state.usersInfo.users);
  const demoWindow = window ? window() : undefined;
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
    setStartInit(false);
    setStartRender(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)

  }

  function generateRandomBus() {
    const busNames = ["City Express", "Metro Rider", "Green Line", "Fast Track", "Sky Bus", "Coastal Cruiser"];
    const busNumbers = ["TN 01 AB 1234", "KA 05 XY 5678", "MH 12 PQ 9101", "DL 03 RS 4567", "AP 09 GH 3210"];
    const busRoutes = ["Chennai - Coimbatore", "Bangalore - Hyderabad", "Mumbai - Pune", "Delhi - Agra", "Chennai - Trichy"];

    return {
      busName: busNames[Math.floor(Math.random() * busNames.length)],
      busNumber: busNumbers[Math.floor(Math.random() * busNumbers.length)],
      route: busRoutes[Math.floor(Math.random() * busRoutes.length)],
    };
  }

  useEffect(() => {
    if (startInit) {
      initControlArray();
      setBusValue([generateRandomBus(), generateRandomBus(), generateRandomBus()]);
    }
  }, [startInit]);

  return (
    <>
      {isLoading && <ProgressBar />}

      {!isLoading && startRender && (
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
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-74.25987571760744!3d40.69767006358627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18b60165%3A0x8b621f8a7a7d28a4!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1633452834502!5m2!1sen!2s"
                style={{ width: "70%", height: "300px", border: "1px solid black", marginLeft: "200px", marginTop: "10px" }}
                allowFullScreen
                loading="lazy"
              />
              <br />
              <TableContainer component={Paper} sx={{ width: "70%", marginLeft: "200px", border: "1px solid black" }}>
                <Table sx={{ minWidth: 700 }} aria-label="bus table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Bus Name</TableCell>
                      <TableCell align="right">Bus Number</TableCell>
                      <TableCell align="right">Bus Route</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {busValue.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.busName}</TableCell>
                        <TableCell align="right">{item.busNumber}</TableCell>
                        <TableCell align="right">{item.route}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <br />
              <Button
                sx={{
                  width: "20%",
                  marginLeft: "520px"
                }}
                variant="contained"
                onClick={() => setOpenDialog(true)}
              >
                Show Alert
              </Button>

              <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle >{"Notification: Bus Delayed by 5 minutes"} </DialogTitle>
                <DialogTitle sx={{ color: "red" }}>{"Route Changed due to Roadwork"} </DialogTitle>
                <DialogActions>
                  <Button onClick={() => setOpenDialog(false)} autoFocus>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>

            </DashboardLayout>
          </AppProvider>
        </Box>
      )}
    </>
  );
};

export default StudentHome;
