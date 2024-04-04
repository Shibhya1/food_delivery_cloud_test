import React from 'react'
import { useCart } from '../components/ContextReducer';
import { useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (!data.length) {
    return (
      <div className='m-5 w-100 text-center fs-3 text-white'>The Cart is Empty!</div>
    )
  }
  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  const handleCheckOut = async () =>{
    let userEmail =localStorage.getItem("userEmail");
  
    let response = await fetch (" http://localhost:3000/api/OrderData", {
      method:"POST" ,
      headers: {
        'Content-Type':'application/json',

      },
      body :JSON.stringify({
          order_data:data,
          email:userEmail,
          order_date:new Date().toDateString()
      })
    })
    console.log("Order Response:" , response)
    if(response.status == 200){
      dispatch({type :"DROP"})
    }
  }

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' style={{ height: "500px", overflowY: 'scroll', overflowX: "hidden" }} >
        <table className='table table-hover  '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >Sr.No</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn btn-danger p-1" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>Delete </button> </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>
    </div>
  )
}
