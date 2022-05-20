import React, { useEffect, useState } from 'react'
import { Table, Card, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ADD, DLT, REMOVE } from '../redux/actions/action'
import { useDispatch } from 'react-redux'
import CartsData from './CartsData'

const CardsDetails = () => {

          const {id}=useParams();
          // console.log("id"+id);
           const [data,setData]=useState([]);

          const getdata = useSelector((state) => state.cartreducer.carts);
          console.log("data"+getdata);

          const dispatch=useDispatch();
          const compare=()=>{
            let comparedata=getdata.filter((e)=>{
              return e.id==id
            });
            setData(comparedata);
            console.log("comparedata"+comparedata)

          }
          useEffect(()=>{
            compare();
          },[id]);

          const dlt=(id)=>{
            dispatch(DLT(id));
          }

          const send=(e)=>{
            dispatch(ADD(e));
          }
          const remove=(item)=>{
            dispatch(REMOVE(item))
          }
          return (
            <>
            <div className='container mt-2'>
            <h2 className='text-center'>Item Details</h2>
            <section className='container mt-3'>
            <div className='itemsdetails'>
              {
                data.map((ele)=>{

                  return(<>
                  <div className='items_img' >
                <img src={ele.image} alt=''/>
              </div>
              <div className='details'>
                <Table>
                  <tr>
                    <td>
                      <p><strong>Price</strong> : ₹ {ele.price}</p>
                      <p><strong>Description</strong> : {ele.title}</p>
                      <p><strong>Total</strong> : ₹ {ele.price*ele.qnty}</p>
                      <div className='mt-5 d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                      <span style={{fontSize:24}} onClick={ele.qnty<=1?dlt(ele.id):()=>remove(ele)}>-</span>
                      <span style={{fontSize:22}}>{}</span> 
                      <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span> 
                      </div>
                      </td>
                      <td>
                      <p><strong>Rating</strong> : <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{ele.rating} ★</span></p>
                      <p><strong>Order Review</strong> : <span>good</span></p>
                      <p><strong>Remove</strong> : <span><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i></span></p>
                      </td>
                  </tr>
                </Table>
              </div>
                  </>)
                })
              }

            </div>
            </section>
            </div>

          </>

          )
        }

export default CardsDetails