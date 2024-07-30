import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

const GmailUsername = () => {
   
    const [userName, setUserName] = useState('');
    const [responseText, setResponseText] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        const options = {
            method: 'POST',
            url: 'https://gmail-username-availability-check.p.rapidapi.com/gusername',
            headers: {
                'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
                'x-rapidapi-host': 'gmail-username-availability-check.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
              username: userName
            }
        };

        try {
            const response = await axios.request(options);
            // Extract the "status" value from response.data
            const { message } = response.data;
            // Update responseText with just the "status" value
            setResponseText(message);
            setError('');
            setUserName('');
            setIsLoading(false);
        } catch (error) {
          console.error(error);
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
      <h2>Gmail Username Validator</h2>
      <form onSubmit={handleSubmit}>
        <TextField 
           fullWidth 
           label="Email Address" 
           value={userName}
           onChange={(e) => setUserName(e.target.value)}
           id="fullWidth" />
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

export default GmailUsername;