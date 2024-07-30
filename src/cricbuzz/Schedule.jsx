import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Schedule = () => {
  const { teamId } = useParams();
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const options = {
        method: 'GET',
        url: `https://cricbuzz-cricket.p.rapidapi.com/teams/v1/${teamId}/schedule`,
        headers: {
          'x-rapidapi-key': '615fca00d6mshd3d0a31f9a9c030p129cc5jsn478405ade87a',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        console.log(response.data); // Log the entire response to inspect its structure

        // Check if teamMatchesData exists and is an array
        if (Array.isArray(response.data.teamMatchesData)) {
          let allMatches = [];
          // Iterate through each series and its matches
          response.data.teamMatchesData.forEach(series => {
            if (series.matchDetailsMap && Array.isArray(series.matchDetailsMap.match)) {
              series.matchDetailsMap.match.forEach(match => {
                if (match.matchInfo) {
                  allMatches.push(match.matchInfo);
                }
              });
            }
          });
          setSchedule(allMatches);
        } else {
          console.error('teamMatchesData is not an array or is empty:', response.data);
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

      fetchSchedule();
  }, [teamId]);

  return (
    <div>
      <h2>Schedule for Team</h2>
      {schedule.map((matchInfo) => (
        <div key={matchInfo.matchId}>
          <h4>{matchInfo.team1.teamName} vs {matchInfo.team2.teamName} {matchInfo.matchDesc}</h4>
          <p>{matchInfo.seriesName}</p>
          <p>{matchInfo.venueInfo.ground}, {matchInfo.venueInfo.city}</p>
          <p>{matchInfo.status}</p>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
