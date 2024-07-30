import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios';

const WhatsApp = () => {
   
    const [phoneNumber, setPhoneNumber] = useState('');
    const [responseText, setResponseText] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        const options = {
            method: 'POST',
            url: 'https://whatsapp-number-validator3.p.rapidapi.com/WhatsappNumberHasItWithToken',
            headers: {
                'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
                'x-rapidapi-host': 'whatsapp-number-validator3.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                phone_number: phoneNumber
            }
        };

        try {
            const response = await axios.request(options);
            // Extract the "status" value from response.data
            const { status } = response.data;
            // Update responseText with just the "status" value
            setResponseText(status);
            setError('');
            setPhoneNumber('');
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setResponseText('');
        }
    };



  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        margin: "auto",
      }}
    >
      <h2>Whatsapp Number Validator</h2>
      <form onSubmit={handleSubmit}>
        <PhoneInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={setPhoneNumber}
          className="inputnumberwithflag"
        />
        <Button
          sx={{
            width: 500,
            maxWidth: "100%",
            marginTop: "30px",
            height: "60px",
          }}
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
        >
          Send
        </Button>
      </form>
      {isLoading && <p>Loading...</p>} {/* Show loading indicator */}
      {error && <p>Error: {error}</p>}
      {responseText && (
        <div>
          <h2>Validation Status:</h2>
          <p>{responseText}</p>
        </div>
      )}
    </Box>
  );
}

export default WhatsApp;