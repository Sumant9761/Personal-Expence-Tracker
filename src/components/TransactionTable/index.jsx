import { Radio, Select, Table } from 'antd';
import React, { useState } from 'react'
import searchImg from '../../assets/search.svg'
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';
import './style.css';


const TransactionTable = ({ transactions, addTransaction, fetchTransactions }) => {
    const { Option } = Select;
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortKey, setSortKey] = useState("");
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    let filteredTransactions = transactions.filter((item) => 
        item.name.toLowerCase().includes(search.toLowerCase()) && 
        item.type.includes(typeFilter)
    );

    let sortedTransactions = filteredTransactions.sort((a, b) => {
        if(sortKey === 'date'){
            return new Date(a.date) - new Date(b.date);
        }else if(sortKey === 'amount'){
            return a.amount - b.amount;
        }else{
            return 0;
        }
    })

    function exportCSV() {
        var csv = unparse({
            fields: ["name", "amount", "tag", "type", "date", ],
            data: transactions,
        })
        const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transactions.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function importFromCSV(event){
        event.preventDefault();
        try{
            parse(event.target.files[0], {
                header: true,
                complete: async function (results) {
                    //Now results.data is an array of objects representing your csv rows
                    for(const transaction of results.data){
                        //Write each transaction to firebase, you can use the addTransaction function here
                        console.log("Transactions>>", transaction);
                        const newTransaction = {
                            ...transaction,
                            amount: parseFloat(transaction.amount),
                        }
                        await addTransaction(newTransaction, true);
                    }
                },
            });
            toast.success("All Transactions Added");
            fetchTransactions();
            event.target.files = null;
        }catch(e){
            toast.error(e.message);
        }
    }

  return (
    <div className="table-container">
        <div className="search-filter-container">
            <div className="input-flex">
                <img src={searchImg} width='16' />
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    placeholder='Search by name'
                /> 
            </div>
            
            <Select
                className='select-input'
                onChange={(value) => setTypeFilter(value)}
                value={typeFilter}
                placeholder='Filter'
                allowClear
            >
                <Option value=''>All</Option>
                <Option value='income'>Income</Option>
                <Option value='expense'>Expense</Option>
            </Select>
        </div>
        <div className='my-table'>
            <div className="table-header-container">
                <h2>My Transactions</h2>

                <Radio.Group
                    className='input-radio'
                    onChange={(e) => setSortKey(e.target.value)}
                    value={sortKey}
                >
                    <Radio.Button value="">No Sort</Radio.Button>
                    <Radio.Button value="date">Sort by Date</Radio.Button>
                    <Radio.Button value="amount">Sort by Amount</Radio.Button>
                </Radio.Group>
                <div className="table-actions-container">
                    <button className='btn' onClick={exportCSV}>
                        Export to CSV
                    </button>
                    <label htmlFor="file-csv" className='btn btn-blue'>
                        Import from CSV
                    </label>
                    <input 
                        id='file-csv'
                        type='file'
                        accept='.csv'
                        required
                        onChange={importFromCSV}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            <Table dataSource={sortedTransactions} columns={columns} scroll={{ x: true }} />
        </div>
    </div>
    
  )
}

export default TransactionTable