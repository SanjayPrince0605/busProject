import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProgressBar = () => {
    return (
        <Box sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.8)", // Light overlay effect
        }}>
            <CircularProgress 
                sx={{ 
                    color: "#1976d2",  // Primary blue color
                    width: "80px !important",  // Large size
                    height: "80px !important"
                }} 
            />
        </Box>
    );
};

export default ProgressBar;
