import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SongList(props) {
    const [songData, setSongData] = useState()

    const fetchSongs = () => {
        axios.get('/api/v1/song/')
            .then(response => setSongData(response.data))
            .catch(response => console.log(response.data));


    }
    React.useEffect(() => fetchSongs(), [])
    var initialSize = 6
    var initialpad = 5
    if (props.size) {
        initialSize = props.size
        initialpad = props.pad
    }
    return (
        <>
            <div className={`col-md-${initialSize} mx-auto mt-lg-${initialpad} pt-lg-${initialpad} p-3`} id='mt_5'>

                <div className='text-center mb-4'>
                    <h4>Browse Song</h4>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Nulla voluptates itaque excepturi doloremque! Repudiandae
                    similique necessitatibus adipisci iure maxime id,
                    accusantium ullam officiis, quam numquam consequatur dicta quas animi fugit.
                </div>
                <div className="row">

                    <div className="col-md-4">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text">songs</span>
                            </div>
                            <select name="" className="form-control form-control-sm">
                                <option value="">Jazz</option>
                                <option value="">R&B</option>
                                <option value="">HipHop</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-4  mt-2 mt-md-0">
                        <select className="form-control form-control-sm">
                            <option value="">Sort By</option>
                            <option value="">Artist</option>
                            <option value="">Usage</option>
                        </select>
                    </div>
                    <div className="col-md-4 text-right">
                        <a href="#" className="btn btn-primary grid-view btn-sm">
                            <i className="fa fa-th-large"></i>
                        </a>
                    &ensp;
                    <a href="#" className="btn btn-primary list-view btn-sm">
                            <i className="fa fa-bars"></i>
                        </a>
                    </div>


                </div>
            </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">

                            {songData && songData.length > 0 ? songData.map((song, i) => {
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
                            })
                                :
                                <span className="text-center spinner-border small mx-auto"></span>
                            }
                            {/* <div className="card col-md-4" style={{ width: '18rem' }}>
                                <img src="https://images.pexels.com/photos/5541683/pexels-photo-5541683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                            </div> */}
                            {/* <div className="col-md-4">
                                <div className="">
                                    <img src="https://images.pexels.com/photos/5541683/pexels-photo-5541683.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                                        alt=""
                                        height='300'
                                        width='320'
                                        className='mx-auto rounded'
                                    />
                                    <figcaption>Artist</figcaption>
                                    <span>usage (10)</span>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SongList;
