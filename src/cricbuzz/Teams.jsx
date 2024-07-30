import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TeamLists() {

  const [teams, setTeamName] = useState([]);

  const handleTeams = async (e) => {
    e.preventDefault();

    const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international',
        headers: {
            'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.request(options);
	    console.log(response.data);
        const allteamslist  = response.data.list;
        setTeamName(allteamslist);
    } catch (error) {
        console.error(error);
    }

  }; 



  // Call fetchData when the page finishes loading
window.addEventListener('load', handleTeams); 

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <>
      {teams.map(list => (
      <ListItem key={list.id} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={list.teamName} src={`https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${list.imageId}/i.jpg`}  />
        </ListItemAvatar>
        <ListItemText
          primary={list.teamName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Country Name -
              </Typography>
              {list.teamSName} {list.teamId}
              <Link to={`/schedule/${list.teamId}`}>Show Schedule</Link>
              <Link to={`/results/${list.teamId}`}>Show Results</Link>
              <Link to={`/players/${list.teamId}`}>Show Players</Link>
            </React.Fragment>
          }
        />
      </ListItem>
      ))}
      </>
    </List>
  );
}
