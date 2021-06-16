import React from 'react';
import ReactPlayer from 'react-player';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { Link } from 'react-router-dom';

function SongDetail() {
    // state = {
    //     time: 0

    // }
    const handleProgress = progress => {
        console.log('onProgress', progress)
    }
    const handleDuration = (duration) => {
        console.log('onDuration', duration)
    }

    return (
        <div className="container pt-5 mt-5">
            <h1>Title</h1>
            <div className="row">
                <div className="col-md-10 mx-auto">

                    <div className='player-wrapper'>
                        <ReactPlayer
                            className='react-player'
                            url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                            // style={{
                            //     width: '100%',
                            //     height: '100%'
                            // }}
                            width='100%'
                            height='30rem'
                            playing={true}
                            // controls={true}
                            pip={true}
                            onDuration={handleDuration}
                            onProgress={handleProgress}
                            playIcon={'https://images.pexels.com/photos/5331160/pexels-photo-5331160.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}
                        />
                    </div>
                    <hr />
                    <ProgressBar>
                        <ProgressBar striped variant="success" now={40} label={`usage ${40}%`} />
                    </ProgressBar>
                    <hr />
                    <div>
                        <h4>Artist</h4>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Aliquid numquam consectetur laboriosam maxime amet quibusdam adipisci,
                        voluptatem eligendi similique, dolores architecto vero!
                        Odio voluptas facilis laboriosam dolorem deserunt perspiciatis assumenda!
                    </div>
                </div>
                <div className="col-md-2 mx-auto">
                    <div className='d-grid gap-2'>
                        <Link to='/report' className="btn btn-outline-info">
                            View Usage Report
                    </Link>
                    </div>
                    &ensp;
                    <div className='d-grid gap-2'>
                        <button className="btn btn-outline-success">
                            Update Song
                    </button>
                    </div>
                   &ensp;
                   <div className='d-grid gap-2'>
                        <button className="btn btn-outline-danger">
                            Delete Song
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SongDetail;
