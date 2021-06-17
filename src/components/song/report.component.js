import React, { useState } from 'react';
import { Chart } from 'react-charts';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Line } from "react-chartjs-2";


function Report(props) {
    const [songReport, setsongReport] = useState()
    const fetchSongReport = () => {
        axios.get(`http://127.0.0.1:5000/song/${props.match.params.id}`)
            .then(response => setsongReport(response.data))
            .catch(response => console.log(response.data));
    }
    var label = []
    var get_data = []
    var get_tile = ''
    if (songReport && songReport.report) {
        get_tile = songReport.title;
        for (const rep in songReport.report) {
            console.log(rep, songReport.report[rep]);
            label.push(songReport.report[rep].udid.slice(0,5))
            get_data.push(songReport.report[rep].usage)
        }
    }
    const fetchReportData = {
        labels: label,
        datasets: [
            {
                label: get_tile,
                data: get_data,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    };

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "First dataset",
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }
            // ,
            // {
            //     label: "Second dataset",
            //     data: [33, 25, 35, 51, 54, 76],
            //     fill: false,
            //     borderColor: "#742774"
            // }
        ]
    };
    // const data = React.useMemo(

    //     () => [

    //         {
    //             label: 'Series 1',
    //             data: [{ x: 1, y: 20 }, { x: 2, y: 34 }, { x: 3, y: 80 },]
    //         },
    //         {
    //             label: 'Series 2',
    //             data: [{ x: 1, y: 40 }, { x: 2, y: 10 }, { x: 3, y: 20 }]
    //         },
    //         {
    //             label: 'Series 3',
    //             data: [{ x: 1, y: 31 }, { x: 2, y: 30 }, { x: 3, y: 30 }]
    //         },
    //         {
    //             label: 'Series 4',
    //             data: [{ x: 1, y: 34 }, { x: 2, y: 70 }, { x: 3, y: 10 }]
    //         }
    //     ],
    //     []
    // )

    // const axes = React.useMemo(
    //     () => [
    //         { primary: true, type: 'linear', position: 'bottom' },
    //         { type: 'linear', position: 'left' }
    //     ],
    //     []
    // )
    React.useEffect(() => fetchSongReport(), [])
    // console.log(songReport)
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

                                        </tr>
                                    )
                                })
                                    :
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <div className="py-5">
                                            <p>No Avalible Report for this song</p>
                                            <Link
                                                className="btn btn-outline-success"
                                                to={{
                                                    pathname: `/song/${songReport._id}`,
                                                    state: { id: songReport._id }
                                                }}
                                            >Add Usage Report <i className="fa fa-arrow-right"></i></Link>
                                        </div>
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
