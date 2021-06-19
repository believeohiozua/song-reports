import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from "react-chartjs-2";


function Report(props) {
    const [songReport, setsongReport] = useState()
    // const [deleteReport, setdeleteReport] = useState()
    const fetchSongReport = () => {
        axios.get(`/api/v1/song/${props.match.params.id}`)
            .then(response => setsongReport(response.data))
            .catch(response => console.log(response.data));
    }
    var label = []
    var get_usage = []
    var get_video_length = []
    var get_tile = ''
    if (songReport && songReport.report) {
        get_tile = songReport.title;
        for (const rep in songReport.report) {
            console.log(rep, songReport.report[rep]);
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
    React.useEffect(() => fetchSongReport(), [])
    return (
        <div className="container mt-5 pt-5">
            {songReport ? <>
                <h1 className="h4">{songReport.title} <span className="">Usage Report</span></h1>
                <hr />
                <div className="row">
                    <div className="col-md-8" id="table-body-sec">
                        <Table responsive="xl">
                            <thead className="text-center">
                                <tr>
                                    <th>S/N</th>
                                    <th>UDID</th>
                                    <th>Video Length</th>
                                    <th>Usage</th>
                                    <th>Percentage(%)</th>
                                    <th>Date</th>
                                    <th>Action</th>

                                </tr>
                            </thead>
                            <tbody>
                                {/* <div id="table-body-sec" className="col-md-12"> */}
                                {songReport.report && songReport.report.length > 0 ? songReport.report.map((report, i) => {
                                    // console.log(songReport.report)
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{report.udid.slice(0, 10)}...</td>
                                            <td>{report.video_length}</td>
                                            <td>{report.usage}</td>
                                            <td>{report.percentage_usage}</td>
                                            <td>{report.date}</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => deleteReport(report._id, report.get_usage_id)}
                                                >
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className="py-5">
                                            <p>No Avalible Report for this song</p>
                                            <Link
                                                className="btn btn-outline-success"
                                                to={{
                                                    pathname: `/song/${songReport._id}`,
                                                    state: { id: songReport._id }
                                                }}
                                            >Add Usage Report <i className="fa fa-arrow-right"></i></Link>
                                        </td>
                                    </tr>
                                }

                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-4">
                        <div
                            className=''
                            style={{
                                width: '400px',
                                height: '300px'
                            }}
                        >
                            {/* <Chart data={data} axes={axes} /> */}
                            <div className="App">
                                {/* {songReport.report && songReport.report.length > 0 ? songReport.report.map((report, i) => {
                                    console.log(songReport.report)
                                    return (<></>)
                                })
                                    :
                                    <></>
                                } */}
                                <Line data={fetchReportData} />
                            </div>
                        </div>
                        <div className="d-grid my-3">
                            <Link
                                className="btn btn-outline-success"
                                to={{
                                    pathname: `/song/${songReport._id}`,
                                    state: { id: songReport._id }
                                }}
                            > Play <i className="fa fa-play" aria-hidden="true"></i>
                            </Link>
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
