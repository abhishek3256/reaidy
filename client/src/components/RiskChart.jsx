import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RiskChart = () => {
    const transactions = useSelector(state => state.transactions.transactions);

    // Recent 20 transactions for chart
    const dataPoints = [...transactions].reverse().slice(-20);

    const data = {
        labels: dataPoints.map(t => new Date(t.timestamp).toLocaleTimeString()),
        datasets: [
            {
                label: 'Risk Score',
                data: dataPoints.map(t => t.riskScore),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Real-time Risk Analysis' },
        },
    };

    return (
        <div className="card">
            <Line options={options} data={data} />
        </div>
    );
};

export default RiskChart;
