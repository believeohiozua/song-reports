import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';
import axios from 'axios';


function SongDetail(props) {
    const [newprogress, setProgress] = useState({ get_usage: 0, get_percentage: 0, get_video_length: 0 });
    const [songDetail, setsongDetail] = useState()
    const [usageField, setusageField] = useState({
        udid: '',
        duration: '',
        percentage: '',
        date: '',
    })
    const handleProgress = progress => {
        var durationToSet = Math.ceil(((progress.playedSeconds + progress.played) / progress.loadedSeconds) * 100)
        var usageData = {
            get_usage: progress.playedSeconds + progress.played,
            get_percentage: durationToSet,
            get_video_length: progress.loadedSeconds
        }
        setProgress(usageData)
    }




    const sendUsage = () => {
        (async () => {
            await navigator.mediaDevices.enumerateDevices({ audio: false, video: false });
            let devices = await navigator.mediaDevices.enumerateDevices();
            var UsageDataToSend = {
                id: props.match.params.id,
                udid: devices[4].deviceId,
                video_length: newprogress.get_video_length,
                usage: newprogress.get_usage,
                percentage_usage: newprogress.get_percentage,
                date: Date.now(),
            }
            setusageField(UsageDataToSend)
        })();
        axios.post("/usage/add", usageField)
            .then(response => console.log(response.data))
            .catch(response => console.log(response.data));
    }
    const handleEnded = () => {
        sendUsage()
        console.log('onEnded')
        // this.setState({ playing: this.state.loop })
    }
    const fetchSongDetail = () => {
        axios.get(`/song/${props.match.params.id}`)
            .then(response => setsongDetail(response.data))
            .catch(response => console.log(response.data));
    }
    const deleteSongDetail = () => {
        if (window.confirm("Are you sure you want to delete this song?")) {
            axios.delete(`/song/${props.match.params.id}`)
                .then(response => setsongDetail(response.data))
                .catch(response => console.log(response.data));
            window.location = '/';
        }
    }




    React.useEffect(() => fetchSongDetail(), [])
    console.log({ ...usageField })

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
                                onEnded={handleEnded}
                            />
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
