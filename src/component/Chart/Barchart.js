import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2'

class Barchart extends Component {
    render() {
        var { dataStatisticList } = this.props
        const arrLabel = [];
        const arryDataset = [];
        if (dataStatisticList.length > 0) {
            dataStatisticList.map((dataItem, index) => {
                arrLabel.push(dataItem.name);
                arryDataset.push(dataItem.missingEmp)
            })
        }

        return (
            <div>
                <Bar
                    data={{
                        labels: arrLabel,
                        datasets: [{
                            label: 'Number of employee',
                            data: arryDataset,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(255, 205, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(201, 203, 207, 0.2)',
                                'rgb(255,228,225,0.2)',
                                'rgb(176,224,230,0.2)',
                                'rgb(240,230,140,0.2)',
                                'rgb(255, 205, 86,0.2)'
                            ],
                            borderColor: [
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
                            borderWidth: 1
                        }]
                    }
                    }
                    options={{
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}
                    height={400}
                    width={600} />
            </div>
        );
    }
}

export default Barchart;