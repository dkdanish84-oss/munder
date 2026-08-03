import React, { useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function ChooseDate() {
  const navigate = useNavigate();

  const generateNext7Days = () => {
    const days = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);

      days.push(
        i === 0
          ? "Today"
          : i === 1
          ? "Tomorrow"
          : d.toLocaleDateString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short"
            })
      );
    }

    return days;
  };

  const dates = generateNext7Days();

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(
    "09:00 AM - 11:00 AM"
  );

  const slots = [
    "09:00 AM - 11:00 AM",
    "11:00 AM - 01:00 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM"
  ];

  const handleNext = () => {
    localStorage.setItem(
      "munder_slot",
      `${selectedDate}, ${selectedSlot}`
    );

    navigate("/payment");
  };

  return (
    <Box p={3} pb={12}>

      <Typography
        variant="caption"
        color="#0e4d28"
        fontWeight="bold"
      >
        Step 4 of 6 • Schedule Visit
      </Typography>

      <LinearProgress
        variant="determinate"
        value={66}
        sx={{
          mt:1,
          mb:3,
          height:8,
          borderRadius:5,
          "& .MuiLinearProgress-bar":{
            bgcolor:"#0e4d28"
          }
        }}
      />

      <Typography
        variant="subtitle2"
        fontWeight="bold"
      >
        Select Date
      </Typography>

      <Box
        display="flex"
        gap={1}
        overflow="auto"
        py={2}
      >
        {dates.map((day)=>(
          <Button
            key={day}
            variant={
              selectedDate===day
                ? "contained"
                : "outlined"
            }
            onClick={()=>
              setSelectedDate(day)
            }
            sx={{
              minWidth:110,
              bgcolor:
                selectedDate===day
                  ? "#0e4d28"
                  : "#fff",
              color:
                selectedDate===day
                  ? "#fff"
                  : "#0e4d28",
              borderColor:"#0e4d28"
            }}
          >
            {day}
          </Button>
        ))}
      </Box>

      <Typography
        variant="subtitle2"
        fontWeight="bold"
        mt={2}
      >
        Select Time Slot
      </Typography>

      <Box mt={2}>
        {slots.map((slot)=>(
          <Button
            key={slot}
            fullWidth
            variant={
              selectedSlot===slot
                ? "contained"
                : "outlined"
            }
            sx={{
              mb:1,
              justifyContent:"flex-start",
              bgcolor:
                selectedSlot===slot
                  ? "#0e4d28"
                  : "#fff",
              color:
                selectedSlot===slot
                  ? "#fff"
                  : "#0e4d28",
              borderColor:"#0e4d28"
            }}
            onClick={()=>
              setSelectedSlot(slot)
            }
          >
            🕒 {slot}
          </Button>
        ))}
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          mt:3,
          py:1.5,
          bgcolor:"#0e4d28"
        }}
        onClick={handleNext}
      >
        Next → Payment
      </Button>

    </Box>
  );
}


