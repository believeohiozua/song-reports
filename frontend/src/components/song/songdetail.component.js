import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import axios from 'axios';


function SongDetail(props) {
    const [newprogress, setProgress] = useState({ get_usage: 0, get_percentage: 0, get_video_length: 0 });
    const [songDetail, setsongDetail] = useState()
    const [volume, setVolume] = useState(0.5)
    const [play, setplay] = useState(false)

    const handleProgress = progress => {
        var durationToSet = Math.ceil(((progress.playedSeconds) / progress.loadedSeconds) * 100)
        var usageData = {
            get_usage: progress.playedSeconds + progress.played,
            get_percentage: durationToSet,
            get_video_length: progress.loadedSeconds
        }
        setProgress(usageData);
    }

    const sendUsage = () => {
        (async () => {
            await navigator.mediaDevices.enumerateDevices({ audio: false, video: false });
            let devices = await navigator.mediaDevices.enumerateDevices();
            var get_udid;
            if (devices[4].deviceI) {
                get_udid = devices[4].deviceId
            } else if (devices[3].deviceId) {
                get_udid = devices[4].deviceId
            } else {
                get_udid = uuidv4();
            }
            var UsageDataToSend = {
                song_id: props.match.params.id,
                udid: get_udid,
                video_length: newprogress.get_video_length,
                usage: newprogress.get_usage,
                percentage_usage: newprogress.get_percentage,
                date: Date.now(),
            }
            axios.post("/api/v1/usage/add/", UsageDataToSend)
                .then(response => console.log(response.data))
                .catch(response => console.log(response.data));
        })()
    };

    const fetchSongDetail = () => {
        axios.get(`/api/v1/song/${props.match.params.id}`)
            .then(response => setsongDetail(response.data))
            .catch(response => console.log(response.data));
    }
    const deleteSongDetail = () => {
        if (window.confirm("Are you sure you want to delete this song?")) {
            axios.delete(`/api/v1/song/${props.match.params.id}`)
                .then(response => setsongDetail(response.data))
                .catch(response => console.log(response.data));
            window.location = '/';
        }
    };


    window.onbeforeunload = (event) => {
        const e = event || window.event;
        e.preventDefault();
        if (e) {
            if (newprogress.get_usage > 0) {
                sendUsage();
            }
        }
    };
    const volumeChange = (e) => {
        e.preventDefault();
        var vol = document.getElementById('volumeChange').value;
        setVolume(vol * 0.1)
    }
    const pauseSong = () => {
        setplay(false)
    }
    const playSong = () => {
        setplay(true)
    }

    const stopPlay = () => {
        setplay(true)
    }
    React.useEffect(() => fetchSongDetail(), []);

    return (
        <div className="container pt-5 mt-5">

            {songDetail ? <>
                <h1>{songDetail.title}</h1>
                <div className="row">
                    <div className="col-md-10 mx-auto">

                        <div className='player-wrapper'>
                            <ReactPlayer
                                className='react-player'
                                url={songDetail.song}
                                width='100%'
                                height='30rem'
                                onProgress={handleProgress}
                                onEnded={sendUsage}
                                volume={volume}
                                playing={play}
                            />
                        </div>
                        <div className="row border-bottom rounded-pill my-auto">
                            <form className='col-3'>
                                <div className="form-group m-1">
                                    <label htmlFor="volumeChange"><i className="fa fa-volume-off" aria-hidden="true"></i>&ensp;</label>
                                    <input type="range" className="form-control-range" id="volumeChange" onChange={volumeChange} />
                                    <label htmlFor="volumeChange">&ensp;<i className="fa fa-volume-down" aria-hidden="true"></i> </label>
                                </div>
                            </form>
                            <div className="col-3">
                                <div className="m-1">
                                    <button className="btn btn-outline-white btn-sm rounded-circle border"
                                        onClick={playSong}>
                                        <i className="fa fa-play text-success"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="m-1">
                                    <button className="btn btn-outline-white btn-sm rounded-circle border"
                                        onClick={pauseSong}>
                                        <i className="fa fa-pause text-warning"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="m-1">
                                    <button className="btn btn-outline-white btn-sm rounded-circle border"
                                        onClick={pauseSong}>
                                        <i className="fa fa-stop text-danger"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <ProgressBar>
                            <ProgressBar striped variant={
                                newprogress.get_percentage < 33.33 ? 'warning' : `${newprogress.get_percentage < 66.66 ? 'info' : 'success'}`
                            } now={newprogress.get_percentage} label={`${newprogress.get_percentage}%`} />
                        </ProgressBar>
                        <hr />
                        <div>
                            <h4>{songDetail.artist}</h4>
                            {songDetail.description}
                        </div>
                    </div>
                    <div className="col-md-2 mx-auto">
                        <div className='d-grid gap-2'>
                            <Link className="btn btn-outline-info"
                                to={{
                                    pathname: `/report/${songDetail._id}`,
                                    state: { id: songDetail._id }
                                }}
                            >
                                View Usage Report
                    </Link>
                        </div>
                    &ensp;
                    <div className='d-grid gap-2'>
                            <Link className="btn btn-outline-success"
                                to={{
                                    pathname: `/update/${songDetail._id}`,
                                    state: { id: songDetail._id }
                                }}>
                                Update Song
                    </Link>
                        </div>
                   &ensp;
                   <div className='d-grid gap-2'>
                            <button className="btn btn-outline-danger" onClick={deleteSongDetail}>
                                Delete Song
                    </button>
                        </div>
                    </div>
                </div>
            </> :
                <>
                    <div className="container">
                        <div className="row div col-md-6 mx-auto">
                            <span className="text-center spinner-border small mx-auto"></span>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default SongDetail;
