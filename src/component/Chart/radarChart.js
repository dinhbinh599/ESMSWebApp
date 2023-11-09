import React, { Component } from 'react';
import {Line } from 'react-chartjs-2'

class radarChart extends Component {
    render() {
        var { dataStatisticList } = this.props
        const arrLabel = [];
        const arryDataset = [];
        dataStatisticList.map((dataItem, index) => {
            arrLabel.push(dataItem.name);
            arryDataset.push(dataItem.noe)
        })
        return (
            <div>
                <Line data={{
                    labels: arrLabel,
                    datasets: [{
                        label: 'Number Employees in project',
                        data: arryDataset,
                        fill: false,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                }}
                    height={400}
                    width={600} />
            </div>
        );
    }
}

export default radarChart;