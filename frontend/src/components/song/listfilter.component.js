import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function ListFilter(props) {
  const [allData, setAllData] = useState(props.songData);
  const [filteredData, setFilteredData] = useState(props.songData);

  const handleSearch = (event) => {
    let value = event.target.value;
    let result = [];
    result = allData.filter((data) => {
      console.log(result, data);
      return data.title.search(value) != -1 || data.artist.search(value) != -1;
    });
    setFilteredData(result);
  }
  const filterSongs = () => {
    axios.get('/api/v1/song/')
      .then(response => { setFilteredData(response.data); setAllData(response.data) })
      .catch(response => console.log(response.data));
  }
  const styles = {
    display: 'inline',
    width: '30%',
    height: 50,
    float: 'left',
    padding: 5,
    border: '0.5px solid black',
    marginBottom: 10,
    marginRight: 10
  }
  useEffect(() => filterSongs(), [])
  return (
    <div className="App">
      <div className="row">

        <div className="col-md-6 mx-auto text-center">
          <div className="input-group input-group-sm">
            <div className="input-group-prepend">
              <span className="input-group-text text-white bg-dark">filter by</span>
            </div>
            <input type="text"
              className="form-control form-control-sm"
              placeholder="Title or Artist"
              onChange={(event) => handleSearch(event)} />
          </div>
          <sup><em>keywords are case sensitive</em></sup>
        </div>
        <hr className="my-3" />
      </div>
      <div style={{ padding: 10 }} className="row">
        {filteredData && filteredData.length > 0 ? filteredData.map((song, i) => {
          return (

            <div className="col-md-3 mb-3" key={i}>
              <div className="border p-1 rounded shadow">
                <div className="d-flex justify-content-between position-absolute w-100">
                  <div className="label-sale">
                    <span className="text-white bg-primary small d-flex align-items-center px-2 py-1">
                      <Link
                        to={{
                          pathname: `/report/${song._id}`,
                          state: { id: song._id }
                        }}
                      >
                        <i className="text-white fa fa-line-chart" aria-hidden="true"></i>
                      </Link>
                    </span>
                  </div>
                </div>
                <a href="#">
                  <img src={song.photo}
                    className="card-img-top rounded"
                    alt="Product"
                    height='200'
                  />
                </a>

                <div className="card-body px-2 pb-2 pt-1" style={{ height: '14rem', overflowY: 'hidden' }}>
                  <div className="text-center">
                    <div>
                      <p className="text-dark"><strong>{song.title}</strong>
                        <br />
                        <small>{song.artist}</small>
                      </p>

                    </div>

                  </div>
                  <p className="text-warning align-items-center mb-2 text-center">
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                    <i className="fa fa-star" aria-hidden="true"></i>
                  </p>
                  <p className="mb-0">
                    <span>
                      {song.description}
                    </span>
                  </p>

                  <div className="d-flex mb-3 justify-content-between">

                  </div>

                </div>
                <div className="justify-content-between">
                  <div className="col px-0 d-grid gap-2 ">
                    <Link
                      className="btn btn-outline-primary btn-block"
                      to={{
                        pathname: `/song/${song._id}`,
                        state: { id: song._id }
                      }}
                    >
                      play <i className="fa fa-play" aria-hidden="true"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          )
        }) : <span className="text-center spinner-border small mx-auto"></span>}
      </div>
    </div>
  )
}

export default ListFilter;
