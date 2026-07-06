import { Line, Pie } from '@ant-design/charts';
import React from 'react'

const ChartComponent = ({ sortedTransactions }) => {
    const data = sortedTransactions.map((item) => {
        return { date: item.date, amount: item.amount };
    });

    let spendingData = sortedTransactions.filter((transaction) => {
        if (transaction.type && transaction.type.toLowerCase() === 'expense'){
            return { tag: transaction.tag, amount: transaction.amount };
        }
    });

    const formatTag = (tag) => {
        if (!tag) return 'Other';
        const lower = tag.toLowerCase();
        if (lower === 'emi') return 'EMI';
        return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    }

    let finalSpendings = spendingData.reduce((acc, obj) => {
        let tagLabel = formatTag(obj.tag);
        if(!acc[tagLabel]){
            acc[tagLabel] = { tag: tagLabel, amount: parseFloat(obj.amount) || 0 }; // create a new object with the same properties
        }else{
            acc[tagLabel].amount += parseFloat(obj.amount) || 0;
        }
        return acc;
    }, {});

    const config = {
        data: data,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
    };
    const spendingConfig = {
        data: Object.values(finalSpendings),
        autoFit: true,
        angleField: 'amount',
        colorField: 'tag',
        scale: {
            color: {
                domain: ['Food', 'Transport', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Entertainment', 'Travel', 'Rent', 'EMI', 'Other'],
                range: ['#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77', '#E056FD', '#10ac84', '#FF8E9E', '#00d2d3', '#f57c00', '#747d8c', '#a4b0be'],
            }
        }
    };

    let chart;
    let pieChart;
  return (
    <div className='charts-wrapper'>
        <div>
            <h1 style={{ margin: 0 }}>Your Analytics</h1>
            <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>
        <div>
            <h1>Your Spendings</h1>
            {Object.values(finalSpendings).length > 0 ? (
                <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
            ) : (
                <p style={{ textAlign: 'center', marginTop: '2rem' }}>No spendings recorded</p>
            )}
        </div>
    </div>
  )
}

export default ChartComponent