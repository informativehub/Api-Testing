import React, { Component } from 'react';
import WhatsApp from './WhatsApp.jsx'
import GmailUsername from './GmailUsername.jsx'
import './index.css'
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Translate from './Translate.jsx';
import Crizzbizz from './cricbuzz/Crizzbizz.jsx';
import Schedule from './cricbuzz/Schedule.jsx';
import Results from './cricbuzz/Results.jsx';
import Players from './cricbuzz/Players.jsx';
import Download from './SocialDownload/Download.jsx';
import Seo from './Seoranking/Seo.jsx';

class Root extends Component {
  render() {
      return(
              <Router>
                <div>
                  <Routes>
	                  <Route path="/" element={<Home />} />
                    <Route path="/whatsapp" element={<WhatsApp />} />
                    <Route path="/gmail" element={<GmailUsername />} />
                    <Route path="/translate" element={<Translate />} />
                    <Route path="/crizbizz" element={<Crizzbizz />} />
                    <Route path="/schedule/:teamId" element={<Schedule />} />
                    <Route path="/results/:teamId" element={<Results />} />
                    <Route path="/players/:teamId" element={<Players />} />
                    <Route path="/download" element={<Download />} />
                    <Route path="/seo" element={<Seo />} />
                   </Routes>
	              </div>
              </Router>
        )
    }
}

export default Root;
createRoot(document.getElementById('root')).render(<Root />)
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <WhatsApp />
//     <GmailUsername />
//   </React.StrictMode>,
// )
