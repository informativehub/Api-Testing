import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Download = () => {
    const [urls, seturl] = useState('');
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); 

        const options = {
            method: 'POST',
            url: 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autolink',
            headers: {
                'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
                'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                url: urls
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            const videoinfo = response.data;
            setResponseText(videoinfo);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
        <form onSubmit={handleSubmit}>
          <TextField fullWidth 
          label="fullWidth" 
          id="fullWidth" 
          value={urls}
          onChange={(e) => seturl(e.target.value)}/>
          <Button
          sx={{
            width: 500,
            maxWidth: "100%",
            marginTop: "30px",
            height: "60px",
          }}
          variant="contained"
          type="submit"
        >
          Send
        </Button>
        </form>
        {isLoading && <p>Loading...</p>} {/* Show loading indicator */}
        {responseText && (
        <div>
          <h2>Video Status:</h2>
          <p><strong>Title:</strong> {responseText.title}</p>
          <p><strong>Source:</strong> {responseText.source}</p>
          <p><strong>Author:</strong> {responseText.author}</p>
          <p><strong>thumbnail:</strong><br /> <img style={{ maxWidth: '40%', marginBottom: '10px' }} alt={responseText.source} src={responseText.thumbnail} /></p>
          <h2>Media:</h2>
                    {responseText.medias.map((media, index) => (
                        <div key={index}>
                            {media.type === 'video' && (
                                <video controls style={{ maxWidth: '40%', marginBottom: '10px' }}>
                                    <source src={media.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            {media.type === 'audio' && (
                                <audio controls style={{ width: '40%', marginBottom: '10px' }}>
                                    <source src={media.url} type="audio/mp3" />
                                    Your browser does not support the audio tag.
                                </audio>
                            )}
                        </div>
                    ))}
        </div>
         )}
        </Box>
      );
}

export default Download;