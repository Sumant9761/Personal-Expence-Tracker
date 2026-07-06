import React from 'react'
import transactions from '../assets/transactions.svg'

const NoTransactions = () => {
  return (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flexDirection: "column",
            marginBottom: "2rem",
        }}
    >
        <img src={transactions} style={{ width: "80%", maxWidth: "400px", margin: "4rem auto" }} />
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            You have No Transactions Currently
        </p>
    </div>
  )
}

export default NoTransactions