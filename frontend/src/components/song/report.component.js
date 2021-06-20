import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from "react-chartjs-2";
import FilterTable from './filtertable.component'


function Report(props) {
    const [songReport, setsongReport] = useState();
    const [artistInfo, setArtistInfo] = useState();

    const fetchArtistInfo = (artist_name) => {
        axios.get(`https://theaudiodb.com/api/v1/json/1/search.php?s=${artist_name.split(" ")[0]}`)
            .then(response => setArtistInfo(response.data))
            .catch(response => console.log(response.data));
    }
    const fetchSongReport = () => {
        axios.get(`/api/v1/song/${props.match.params.id}`)
            .then(response => { setsongReport(response.data); fetchArtistInfo(songReport.artist) })
            .catch(response => console.log(response.data));
    }
    const deleteSong = () => {
        if (window.confirm("Are you sure you want to delete this song?")) {
            axios.delete(`/api/v1/song/${props.match.params.id}`)
            window.location = '/';
        }
    };
    var label = []
    var get_usage = []
    var get_video_length = []
    if (songReport && songReport.report) {
        for (const rep in songReport.report) {
            label.push(songReport.report[rep].udid.slice(0, 5))
            get_usage.push(songReport.report[rep].usage)
            get_video_length.push(songReport.report[rep].percentage_usage)
        }
    }

    const fetchReportData = {
        labels: label,
        datasets: [
            {
                label: "Usage",
                data: get_usage,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Percentage Usage",
                data: get_video_length,
                fill: false,
                borderColor: "#742774"
            }
        ]
    };

    const deleteReport = (get_report_id, get_usage_id) => {
        if (window.confirm("Are you sure you want to delete this usage report?")) {
            var payload = {
                song_id: props.match.params.id,
                usage_id: get_usage_id,
                report_id: get_report_id
            }
            axios.post(`/api/v1/usage/delete/${get_usage_id}`, payload)
                .then(response => console.log(response.data))
                .catch(response => console.log(response.data));
            fetchSongReport();
        }
    };
    // eslint-disable-next-line
    React.useEffect(() => fetchSongReport(), [])
    return (
        <div className="container mt-5 pt-5">
            {songReport ? <>
                <h1 className="h4">{songReport.title} <span className="">Usage Report</span></h1>

                <div className="row">
                    <hr />
                    <div className="col-md-8" id="table-body-sec">
                        <FilterTable
                            songReport={songReport}
                            deleteReport={deleteReport}
                            fetchSongReport={fetchSongReport}
                        />

                    </div>
                    <div className="col-md-4">
                        <div
                            className=''
                            style={{
                                width: '400px',
                                height: '300px'
                            }}
                        >
                            <div className="">
                                <Line data={fetchReportData} />
                            </div>
                            <div className=" my-3">
                                <p><strong>
                                    About {songReport.artist}</strong></p>

                                <div style={{ height: "11em", overflowY: 'scroll' }}>
                                    {artistInfo && artistInfo.artists && artistInfo.artists.length > 0 ? artistInfo.artists.map((artist, i) => {
                                        return (
                                            <span key={i} className="text-left">
                                                <small>
                                                    {artist.strBiographyEN}
                                                </small>
                                            </span>)
                                    }) : <span className="text-center small mx-auto">
                                        No avalible record for <span className="text-success text-center">{songReport.artist}</span>
                                    </span>}
                                </div>

                            </div>
                            <div className="my-2 text-center">
                                <Link
                                    className="btn btn-outline-success rounded-circle"
                                    to={{
                                        pathname: `/song/${songReport._id}`,
                                        state: { id: songReport._id }
                                    }}
                                > <i className="fa fa-play" aria-hidden="true"></i>
                                </Link> &ensp;
                                <Link
                                    className="btn btn-outline-warning rounded-circle"
                                    to={{
                                        pathname: `/update/${songReport._id}`,
                                        state: { id: songReport._id }
                                    }}
                                > <i className="fa fa-edit text-warning" aria-hidden="true"></i>
                                </Link> &ensp;
                                <button
                                    className="btn btn-outline-danger rounded-circle"
                                    onClick={deleteSong}

                                > <i className="fa fa-trash text-danger" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </>
                :
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mx-auto text-center">
                                <span className="text-center spinner-border  text-primary small mx-auto"></span>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Report;
