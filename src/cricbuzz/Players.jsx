import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Players = () => {
  const { teamId } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playersUrl = `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/players`;
      const imagesUrl = 'https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c';

      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        // Fetch players data
        const responsePlayers = await axios.get(playersUrl, options);
        const playersData = responsePlayers.data.player;

        // Fetch images for each player with retry strategy
        const playersWithImages = await Promise.all(
          playersData.map(async (player) => {
            const imageUrl = `${imagesUrl}${player.imageId}/i.jpg`;

            let attempts = 0;
            let maxAttempts = 3;
            let delay = 1000; // 1 second initial delay

            while (true) {
              try {
                const responseImage = await axios.get(imageUrl, options);
                const imageData = responseImage.data;
                return { ...player, imageUrl: imageUrl };
              } catch (error) {
                if (error.response && error.response.status === 429 && attempts < maxAttempts) {
                  attempts++;
                  await new Promise((resolve) => setTimeout(resolve, delay));
                  delay *= 2; // exponential backoff
                } else {
                  console.error('Error fetching image:', error);
                  // Handle error or continue to next player
                  return { ...player, imageUrl: '/path/to/default/image.jpg' }; // fallback image
                }
              }
            }
          })
        );

        setPlayers(playersWithImages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (teamId) {
      fetchPlayers();
    }
  }, [teamId]);

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {players.map((player, index) => (
        <ListItem key={index} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={player.name} src={player.imageUrl} />
          </ListItemAvatar>
          <ListItemText
            primary={player.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  Batting Style - {player.battingStyle}, Bowling Style - {player.bowlingStyle}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Players;
