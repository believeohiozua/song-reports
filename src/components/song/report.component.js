import React from 'react';
import { Chart } from 'react-charts';
import Table from 'react-bootstrap/Table'


function Report() {
    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [{ x: 1, y: 20 }, { x: 2, y: 34 }, { x: 3, y: 80 },]
            },
            {
                label: 'Series 2',
                data: [{ x: 1, y: 40 }, { x: 2, y: 10 }, { x: 3, y: 20 }]
            },
            {
                label: 'Series 3',
                data: [{ x: 1, y: 31 }, { x: 2, y: 30 }, { x: 3, y: 30 }]
            }
        ],
        []
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    return (
        <div className="container mt-5 pt-5">
            <h1>title Usage</h1>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <Table responsive="xl">
                        <thead>
                            <tr>
                                <th>S/N</th>
                                <th>UDID</th>
                                <th>usage</th>
                                <th>Duration</th>
                                <th>Date</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="col-md-6 mx-auto">
                    <div
                        style={{
                            width: '400px',
                            height: '300px'
                        }}
                    >
                        <Chart data={data} axes={axes} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Report;
