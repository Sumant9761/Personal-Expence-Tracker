import { Line, Pie } from '@ant-design/charts';
import React from 'react'

const ChartComponent = ({ sortedTransactions }) => {
    const data = sortedTransactions.map((item) => {
        return { date: item.date, amount: item.amount };
    });

    let spendingData = sortedTransactions.filter((transaction) => {
        if (transaction.type == 'expense'){
            return { tag: transaction.tag, amount: transaction.amount };
        }
    });

    let finalSpendings = spendingData.reduce((acc, obj) => {
        let key = obj.tag;
        if(!acc[key]){
            acc[key] = { tag: obj.tag, amount: obj.amount }; // create a new object with the same properties
        }else{
            acc[key].amount += obj.amount;
        }
        return acc;
    }, {});

    const config = {
        data: data,
        width: 500,
        autoFit: true,
        xField: 'date',
        yField: 'amount',
    };
    const spendingConfig = {
        data: Object.values(finalSpendings),
        width: 500,
        angleField: 'amount',
        colorField: 'tag',
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
            <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
        </div>
    </div>
  )
}

export default ChartComponent