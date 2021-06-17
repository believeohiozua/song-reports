import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TopNav from "./components/base/topnav.component";
import Footer from "./components/base/footer.component";
import HomePage from "./components/song/homepage.component";
import CreateSong from "./components/song/createsong.component";
import SongList from "./components/song/songlist.component";
import SongDetail from "./components/song/songdetail.component";
import Report from "./components/song/report.component";


function App() {
  return (
    <Router>
      <TopNav />
      <Route path="/" exact component={HomePage} />
      <Route path="/add-song" exact component={CreateSong} />
      <Route path="/update/:id" exact component={CreateSong} />
      <Route path="/songs" exact component={SongList} />
      <Route path="/song/:id" exact component={SongDetail} />
      <Route path="/report/:id" exact component={Report} />
      <Route path="/report" exact component={Report} />
      <Route path="/detail" exact component={SongDetail} />
      <Footer />
    </Router>
  )
}

export default App;
