import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Cards from '../components/Cards'
import AddExpenseModal from '../components/Modals/addExpense';
import AddIncomeModal from '../components/Modals/addIncome';
import { addDoc, collection, getDocs, query, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import TransactionTable from '../components/TransactionTable';
import ChartComponent from '../components/Charts';
import NoTransactions from '../components/NoTransactions';



const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const[isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const[isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    }
    addTransaction(newTransaction);
    if(type === 'expense'){
      setIsExpenseModalVisible(false);
    }else{
      setIsIncomeModalVisible(false);
    }
  }

  async function addTransaction(transaction, many){
    //Add the doc
    try{
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      )
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
      setTransactions([...transactions, transaction]);
      calculateBalance();
    }catch(e){
      console.error("Error adding document: ", e)
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    // Get all docs from collection
    if (user) {
      fetchtransactions();
    }
  }, [user])

  useEffect(() => {
    calculateBalance();
  }, [transactions])

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if(transaction.type === 'income'){
        incomeTotal += transaction.amount;
      }else{
        expenseTotal += transaction.amount;
      }
    })

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  async function fetchtransactions(){
    setLoading(true);
    if(user){
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        //doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      })
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  async function resetBalance() {
    if (!window.confirm("Are you sure you want to reset your balance? This will delete all your transactions.")) {
      return;
    }
    setLoading(true);
    if (user) {
      try {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        const deletePromises = [];
        querySnapshot.forEach((doc) => {
          deletePromises.push(deleteDoc(doc.ref));
        });
        await Promise.all(deletePromises);
        setTransactions([]);
        calculateBalance();
        toast.success("Balance Reset!");
      } catch (e) {
        console.error("Error resetting balance: ", e);
        toast.error("Couldn't reset balance");
      }
    }
    setLoading(false);
  }

  let sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(a.date) - new Date(b.date); 
  })

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards 
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            resetBalance={resetBalance}
          />
          {transactions.length != 0 ? <ChartComponent sortedTransactions={sortedTransactions} /> : <NoTransactions />}
          <AddExpenseModal 
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncomeModal 
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionTable 
            transactions={transactions} 
            addTransaction={addTransaction}
            fetchTransactions={fetchtransactions}
          />
        </>
        )
      }
    </div>
  )
}

export default Dashboard