import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import axios from 'axios';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Translate() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [translatedTextFrom, setTranslatedTextFrom] = useState('auto');
    const [translatedTextTo, setTranslatedTextTo] = useState('');
    const [InputChange, setInputChange] = useState('');

    const languages = {
      "Afrikaans": "af",
      "Albanian": "sq",
      "Amharic": "am",
      "Arabic": "ar",
      "Armenian": "hy",
      "Azerbaijani": "az",
      "Basque": "eu",
      "Belarusian": "be",
      "Bengali": "bn",
      "Bosnian": "bs",
      "Bulgarian": "bg",
      "Catalan": "ca",
      "Cebuano": "ceb",
      "Chinese (Simplified)": "zh-CN",
      "Chinese (Traditional)": "zh-TW",
      "Corsican": "co",
      "Croatian": "hr",
      "Czech": "cs",
      "Danish": "da",
      "Dutch": "nl",
      "English": "en",
      "Esperanto": "eo",
      "Estonian": "et",
      "Finnish": "fi",
      "French": "fr",
      "Frisian": "fy",
      "Galician": "gl",
      "Georgian": "ka",
      "German": "de",
      "Greek": "el",
      "Gujarati": "gu",
      "Haitian Creole": "ht",
      "Hausa": "ha",
      "Hawaiian": "haw",
      "Hebrew": "he",
      "Hindi": "hi",
      "Hmong": "hmn",
      "Hungarian": "hu",
      "Icelandic": "is",
      "Igbo": "ig",
      "Indonesian": "id",
      "Irish": "ga",
      "Italian": "it",
      "Japanese": "ja",
      "Javanese": "jv",
      "Kannada": "kn",
      "Kazakh": "kk",
      "Khmer": "km",
      "Kinyarwanda": "rw",
      "Korean": "ko",
      "Kurdish": "ku",
      "Kyrgyz": "ky",
      "Lao": "lo",
      "Latin": "la",
      "Latvian": "lv",
      "Lithuanian": "lt",
      "Luxembourgish": "lb",
      "Macedonian": "mk",
      "Malagasy": "mg",
      "Malay": "ms",
      "Malayalam": "ml",
      "Maltese": "mt",
      "Maori": "mi",
      "Marathi": "mr",
      "Mongolian": "mn",
      "Myanmar (Burmese)": "my",
      "Nepali": "ne",
      "Norwegian": "no",
      "Nyanja (Chichewa)": "ny",
      "Odia (Oriya)": "or",
      "Pashto": "ps",
      "Persian": "fa",
      "Polish": "pl",
      "Portuguese": "pt",
      "Punjabi": "pa",
      "Romanian": "ro",
      "Russian": "ru",
      "Samoan": "sm",
      "Scots Gaelic": "gd",
      "Serbian": "sr",
      "Sesotho": "st",
      "Shona": "sn",
      "Sindhi": "sd",
      "Sinhala (Sinhalese)": "si",
      "Slovak": "sk",
      "Slovenian": "sl",
      "Somali": "so",
      "Spanish": "es",
      "Sundanese": "su",
      "Swahili": "sw",
      "Swedish": "sv",
      "Tagalog (Filipino)": "tl",
      "Tajik": "tg",
      "Tamil": "ta",
      "Tatar": "tt",
      "Telugu": "te",
      "Thai": "th",
      "Turkish": "tr",
      "Turkmen": "tk",
      "Ukrainian": "uk",
      "Urdu": "ur",
      "Uyghur": "ug",
      "Uzbek": "uz",
      "Vietnamese": "vi",
      "Welsh": "cy",
      "Xhosa": "xh",
      "Yiddish": "yi",
      "Yoruba": "yo",
      "Zulu": "zu"
    };
    

    const handleInputChange = async (event) => {
      const text = event.target.value;
      setText(text);
  
      // Make API call only if input text length is greater than 0
      if (text.length > 0) {
        try {
          const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/language_detect',
            headers: {
              'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
              'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            data: {
              text: text,
              language: translatedTextFrom
            }
          };
  
          const response = await axios.request(options);
          console.log(response.data);
          const detection  = response.data.language_detection.language;
          setInputChange(detection);
        } catch (error) {
          console.error(error);
          // Handle errors from the API request
        }
      }
    };


    const fromhandleChange = (event) => {
      setTranslatedTextFrom(event.target.value);
    };

    const tohandleChange = (event) => {
      setTranslatedTextTo(event.target.value);
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();

        const options = {
            method: 'POST',
            url: 'https://translate-plus.p.rapidapi.com/translate',
            headers: {
                'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
                'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                text: text,
                source: translatedTextFrom,
                target: translatedTextTo,
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data.translations.translation);
            const translations  = response.data.translations.translation;
            setTranslatedText(translations);
        } catch (error) {
            console.error(error);
        }
    };



  return (
    <Box height={700} width={700} margin="auto" sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Item>
              <InputLabel id="Fromtext">From</InputLabel>
              <Select
                labelId="Fromtext"
                id="Fromtext"
                value={translatedTextFrom}
                label="From"
                sx={{
                  width: 100,
                  maxWidth: "100%",
                  marginTop: "0px",
                  height: "60px",
                }}
                onChange={fromhandleChange}
                defaultOpen={InputChange}
              >
                <MenuItem default value={InputChange}>
                  <em>{InputChange}</em>
                </MenuItem>
                {Object.entries(languages).map(([fullName, shortName]) => (
                <MenuItem key={shortName} value={shortName}>{fullName}</MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                label="From"
                id="From"
                value={text}
                onChange={handleInputChange}
              />
            </Item>
          </Grid>
          <Grid item xs={2}>
            <Item>
              <Button
                sx={{
                  width: 100,
                  maxWidth: "100%",
                  marginTop: "0px",
                  height: "60px",
                }}
                variant="contained"
                endIcon={<SendIcon />}
                type="submit"
              >
                Send
              </Button>
            </Item>
          </Grid>
          <Grid item xs={5}>
            <Item>
            <InputLabel id="Totext">To</InputLabel>
              <Select
                labelId="Totext"
                id="Totext"
                value={translatedTextTo}
                label="To"
                sx={{
                  width: 100,
                  maxWidth: "100%",
                  marginTop: "0px",
                  height: "60px",
                }}
                onChange={tohandleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {Object.entries(languages).map(([fullName, shortName]) => (
                <MenuItem key={shortName} value={shortName}>{fullName}</MenuItem>
                ))}
              </Select>
              <TextField fullWidth label="To" id="To" value={translatedText} />
            </Item>
          </Grid>
        </Grid>
      </form>
      <div>
        <h2>Status:</h2>
        {InputChange && (
        <p>You selected: {InputChange}</p>
         )}
        <p>{translatedText}</p>
      </div>
    </Box>
  );
}