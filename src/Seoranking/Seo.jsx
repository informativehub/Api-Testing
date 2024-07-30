import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Seo = () => {
    const [domain, setDomain] = useState('');
    const [keywords, setKeywords] = useState('');
    const [responseText, setResponseText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://seo-api2.p.rapidapi.com/keyword-rank-checker`, {
                headers: {
                    'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
                    'x-rapidapi-host': 'seo-api2.p.rapidapi.com'
                },
                params: {
                    domain,
                    keyword: keywords,
                    countryCode: 'ae',
                    language: 'en',
                    pages: '5'
                }
            });

            console.log(response.data);
            setResponseText(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
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
                <TextField
                    fullWidth
                    label="Domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Keywords"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                />
                <Button
                    sx={{
                        width: '100%',
                        marginTop: '30px',
                        height: '60px',
                    }}
                    variant="contained"
                    type="submit"
                >
                    Send
                </Button>
            </form>
            {isLoading && <p>Loading...</p>}
            {responseText && (
                <div>
                    <h2>Keyword Status:</h2>
                    <p>
                        <strong>Keywords:</strong> {responseText.keyword} {responseText.rank}
                    </p>
                </div>
            )}
        </Box>
    );
};

export default Seo;
