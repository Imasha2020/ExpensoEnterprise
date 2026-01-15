import React from 'react'
import {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getCategories } from '../../api/CategoryService';
import { createTransaction } from '../../api/TransactionService';

function AddTransaction() {

const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [type, setType] = useState("EXPENSE");
const [categoryId, setCategoryId] = useState("");
const [description, setDescription] = useState("");
const [transactionDate, setTransactionDate] = useState("");

const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

//Load categories when page loads
useEffect(()=>{
  const loadCategories = async ()=>{
    try{
        const res = await getCategories();
        setCategories(res.data.data);
    }catch(err){
      console.error("Error loading categories:", err);
    }
  };
  loadCategories();
},[]);


  return (
    <div>
      <input
      type="text" 
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
    />
    </div>
  )
}

export default AddTransaction