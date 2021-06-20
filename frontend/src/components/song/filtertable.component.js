import React from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { Link } from 'react-router-dom';


function FilterTable(props) {
    const myFunction = () => {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[1];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    const filterByDate = () => {
        const filterbydate = document.getElementById('filterbydate');
        const everything = document.getElementById('everything');
        const sorted_today = document.getElementById('sorted_today');
        const sorted_week = document.getElementById('sorted_week');
        const sorted_month = document.getElementById('sorted_month');
        const total_usage = document.getElementById('total_usage');
        const get_today_total = document.getElementById('get_today_total');
        const get_week_total = document.getElementById('get_week_total');
        const month_total_usage = document.getElementById('month_total_usage');
        if (filterbydate.value == 'everything') {
            everything.style.display = '';
            total_usage.style.display = '';
            sorted_today.style.display = 'none';
            sorted_week.style.display = 'none';
            sorted_month.style.display = 'none';
            get_today_total.style.display = 'none';
            get_week_total.style.display = 'none';
            month_total_usage.style.display = 'none';
        } else if (filterbydate.value == 'sorted_today') {
            everything.style.display = 'none'
            sorted_today.style.display = ''
            get_today_total.style.display = ''
            sorted_week.style.display = 'none'
            sorted_month.style.display = 'none'
            total_usage.style.display = 'none'
            get_week_total.style.display = 'none'
            month_total_usage.style.display = 'none'
        } else if (filterbydate.value == 'sorted_week') {
            everything.style.display = 'none';
            sorted_today.style.display = 'none';
            sorted_week.style.display = '';
            get_week_total.style.display = '';
            sorted_month.style.display = 'none';
            total_usage.style.display = 'none';
            get_today_total.style.display = 'none';
            month_total_usage.style.display = 'none';
        } else if (filterbydate.value == 'sorted_month') {
            everything.style.display = 'none';
            sorted_today.style.display = 'none';
            sorted_week.style.display = 'none';
            sorted_month.style.display = '';
            month_total_usage.style.display = '';
            total_usage.style.display = 'none';
            get_today_total.style.display = 'none';
            get_week_total.style.display = 'none';
        }

    }
    React.useEffect(() => props.fetchSongReport(), [])
    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <input type="text"
                        placeholder='filter by UDID'
                        onKeyUp={myFunction}
                        id="myInput"
                        className="form-control form-control-sm" />
                </div>
                <div className="col-md-6">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <span className="input-group-text bg-dark text-white">filter by</span>
                        </div>
                        <select name=""
                            className="form-control form-control-sm"
                            id="filterbydate"
                            onChange={filterByDate}
                        >
                            <option value="everything">Everything</option>
                            <option value="sorted_today">Today</option>
                            <option value="sorted_week">This week</option>
                            <option value="sorted_month">This month</option>
                        </select>
                    </div>
                </div>
            </div>
            <hr />
            <Table responsive="xl" id="myTable">
                <thead className="text-center">
                    <tr className="header">

                        <th>S/N</th>
                        <th>UDID</th>
                        <th>Video Length</th>
                        <th>Usage</th>
                        <th>Percentage(%)</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody id="everything">
                    {props.songReport && props.songReport.report && props.songReport.report.length > 0 ? props.songReport.report.map((report, i) => {
                        { props.songReport.report.reverse() }
                        var everything_total_usage = (props.songReport.report.reduce((a, v) => a = a + v.usage, 0))
                        var total_usage = document.getElementById('total_usage');
                        if (total_usage) { total_usage.innerHTML = `Total Usage: ${everything_total_usage.toFixed(1)}` }
                        return (
                            <>
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{report.udid.slice(0, 15)}...</td>
                                    <td>{report.video_length.toFixed(2)}</td>
                                    <td>{report.usage.toFixed(2)}</td>
                                    <td>{report.percentage_usage}</td>
                                    <td>{moment(report.date).format('DD MMM, YYYY')}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => props.deleteReport(report._id, report.get_usage_id)}
                                        >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>

                                </tr>

                            </>
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
                                        pathname: `/song/${props.songReport._id}`,
                                        state: { id: props.songReport._id }
                                    }}
                                >Add Usage Report <i className="fa fa-arrow-right"></i></Link>
                            </td>
                        </tr>
                    }
                </tbody>


                <tbody id="sorted_today" style={{ display: 'none' }}>
                    {props.songReport && props.songReport.report && props.songReport.report.length > 0 ? props.songReport.report.map((report, i) => {
                        { props.songReport.report.reverse() }
                        var varied_date = new Date()
                        var sampleDate = new Date(report.date)
                        if (sampleDate.getDate() == varied_date.getDate()) {
                            var get_today_total = (props.songReport.report.reduce((a, v) => a = a + v.usage, 0));
                            var total_usage = document.getElementById('get_today_total');
                            if (total_usage) { total_usage.innerHTML = `Total Usage: ${get_today_total.toFixed(1)}` }
                            return (
                                <>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{report.udid.slice(0, 15)}...</td>
                                        <td>{report.video_length.toFixed(2)}</td>
                                        <td>{report.usage.toFixed(2)}</td>
                                        <td>{report.percentage_usage}</td>
                                        <td>{moment(report.date).format('DD MMM, YYYY')}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => props.deleteReport(report._id, report.get_usage_id)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>

                                    </tr>

                                </>
                            )
                        }
                    }) : <></>}

                </tbody>


                <tbody id="sorted_week" style={{ display: 'none' }}>
                    {props.songReport && props.songReport.report && props.songReport.report.length > 0 ? props.songReport.report.map((report, i) => {
                        { props.songReport.report.reverse() }
                        Date.prototype.getWeek = function () {
                            var onejan = new Date(this.getFullYear(), 0, 1);
                            var today = new Date(this.getFullYear(), this.getMonth(), this.getDate());
                            var dayOfYear = ((today - onejan + 86400000) / 86400000);
                            return Math.ceil(dayOfYear / 7)
                        };
                        var varied_date = new Date()
                        var sampleDate = new Date(report.date)
                        if (sampleDate.getWeek() == varied_date.getWeek()) {
                            var get_week_total = (props.songReport.report.reduce((a, v) => a = a + v.usage, 0));
                            var total_usage = document.getElementById('get_week_total');
                            if (total_usage) { total_usage.innerHTML = `Total Usage: ${get_week_total.toFixed(1)}` }
                            return (
                                <>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{report.udid.slice(0, 15)}...</td>
                                        <td>{report.video_length.toFixed(2)}</td>
                                        <td>{report.usage.toFixed(2)}</td>
                                        <td>{report.percentage_usage}</td>
                                        <td>{moment(report.date).format('DD MMM, YYYY')}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => props.deleteReport(report._id, report.get_usage_id)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>

                                    </tr>

                                </>
                            )
                        }
                    }) : <></>}

                </tbody>

                <tbody id="sorted_month" style={{ display: 'none' }}>
                    {props.songReport && props.songReport.report && props.songReport.report.length > 0 ? props.songReport.report.map((report, i) => {
                        { props.songReport.report.reverse() }
                        var varied_date = new Date()
                        var sampleDate = new Date(report.date)
                        if (sampleDate.getMonth() + 1 == varied_date.getMonth() + 1) {
                            var get_month_total = (props.songReport.report.reduce((a, v) => a = a + v.usage, 0));
                            var total_usage = document.getElementById('month_total_usage');
                            if (total_usage) { total_usage.innerHTML = `Total Usage: ${get_month_total.toFixed(1)}` }
                            return (
                                <>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{report.udid.slice(0, 15)}...</td>
                                        <td>{report.video_length.toFixed(2)}</td>
                                        <td>{report.usage.toFixed(2)}</td>
                                        <td>{report.percentage_usage}</td>
                                        <td>{moment(report.date).format('DD MMM, YYYY')}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => props.deleteReport(report._id, report.get_usage_id)}
                                            >
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </td>

                                    </tr>

                                </>
                            )
                        }
                    }) : <></>}

                </tbody>
            </Table>

            <p> <span id="total_usage"></span></p>
            <p> <span style={{ display: 'none' }} id="get_today_total"></span></p>
            <p> <span style={{ display: 'none' }} id="get_week_total"></span></p>
            <p> <span style={{ display: 'none' }} id="month_total_usage"></span></p>
        </div >
    )
}

export default FilterTable;
