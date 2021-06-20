import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ListFilter from "./listfilter.component"

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
            </div>
            <div className="container my-2">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <ListFilter songData={songData} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SongList;
