import React, { Component } from 'react';
import { Doughnut, defaults } from 'react-chartjs-2'

class donut extends Component {
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
                <Doughnut
                    data={
                        {
                            labels: arrLabel,
                            datasets: [{
                                label: 'My First Dataset',
                                data: arryDataset,
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)',
                                    'rgb(255,228,225)',
                                    'rgb(176,224,230)',
                                    'rgb(240,230,140)',
                                    'rgb(255, 205, 86)'

                                ],
                                hoverOffset: 4
                            }]
                        }
                    }
                    height={400}
                    width={400}
                    options={{
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true,
                                    },
                                },
                            ],
                        },
                        legend: {
                            labels: {
                                fontSize: 25,
                            },
                        },
                    }}
                />
            </div>
        );
    }
}

export default donut;