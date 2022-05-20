import React, { useState } from 'react'
import Header from './Header'
import { Card, Button,Dropdown } from 'react-bootstrap'
import CardsData from './CardsData'
import './style.css'
import {ADD} from '../redux/actions/action'
import { useDispatch } from 'react-redux'

const Cards = () => {
  const [data, setData] = useState(CardsData);
  const handleFilter=(item)=>{
    const result=CardsData.filter((curData)=>{
        return(curData.category===item);
    });
    setData(result);
}
  const dispatch=useDispatch();
 
  const send=(e)=>{
    
  dispatch(ADD(e));
  
}

  return (
    <>
      
      <div className='container mt-3'>
        <h2 className='text-center'>Enjoy Shopping with us!!</h2>
        <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Category
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item onClick={()=>handleFilter('electronics')}>Electronics</Dropdown.Item>
    <Dropdown.Item onClick={()=>handleFilter('jewelery')}>Jewelery</Dropdown.Item>
    <Dropdown.Item onClick={()=>handleFilter(`men's clothing`)}>Men's Clothing</Dropdown.Item>
    <Dropdown.Item onClick={()=>handleFilter(`women's clothing`)}>Women's Clothing</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
        <div className='row d-flex justify-content-center align-items-center'>
          {
            data.map((element, id) => {
              return (
                <>
            
                  <Card style={{ width: '22rem',border:'none' }} className="mx-2 mt-4 card_style">
                    
                    <Card.Img variant="top" src={element.image} style={{height:'16rem'}} className='mt-3'/>
                    <Card.Body>
                      <Card.Title>{element.title}</Card.Title>
                      <Card.Text>
                       Price : ₹ {element.price}
                      </Card.Text>
                      <div className='button_div d-flex justify-content-center'>
                        <Button variant="primary" className='col-lg-12' onClick={()=>send(element)}>Add To Cart</Button>
                        </div>
                      
                    </Card.Body>
                  </Card>
                </>
              )
            })
          }

        </div>
      </div>

    </>
  )
}

export default Cards