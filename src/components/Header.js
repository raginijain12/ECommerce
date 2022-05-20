import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Navbar, Container, Nav, Table,Button,Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { DLT } from '../redux/actions/action'
const Header=()=> {

  const [price, setPrice] = useState(0);
  const getdata = useSelector((state) => state.cartreducer.carts);
  console.log("getdata" + getdata)
  const handleFilter=(e)=>{

  }
  const dispatch = useDispatch();
  const dlt = (id) => {
    dispatch(DLT(id));
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const total = () => {
    let price = 0;
    getdata.map((ele, k) => {
      price = ele.price * ele.qnty + price
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total])

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: "60px", width: "100%" }}>
        <Container>

          <NavLink to='/' className="text-decoration-none text-light mx-3">Add to Cart</NavLink>

          <Nav className="me-auto">
            <Link to='/login' className="text-decoration-none text-light mx-3">Login</Link>
            <Link to='/cart' className="text-decoration-none text-light mx-3">Cart</Link>
            <Link to='/signup' className="text-decoration-none text-light mx-3">Sign Up</Link>
            <Link to="/home" className="text-decoration-none text-light mx-3">Home</Link>
           
          </Nav>
          <Badge badgeContent={getdata.length} color="primary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>
            <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: 'pointer' }}></i>
          </Badge>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {
              getdata.length ?
                <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Photo</th>
                        <th>Item Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        getdata.map((e) => {
                          return (
                            <>
                              <tr>
                                <td>
                                  <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                                    <img src={e.image} style={{ width: "5rem", height: "5rem" }} alt="" />
                                  </NavLink>

                                </td>
                                <td>
                                  <p>{e.title}</p>
                                  <p>Price : ₹{e.price}</p>
                                  <p>Quantity : 0</p>
                                  <p style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                                    <i className='fas fa-trash smalltrash' onClick={() => dlt(e.id)}></i>
                                  </p>
                                </td>

                                <td className='mt-5' style={{ color: "red", fontSize: 20, cursor: "pointer" }}>
                                  <i className='fas fa-trash largetrash' onClick={() => dlt(e.id)}></i>
                                </td>
                              </tr>
                            </>
                          )
                        })
                      }
                      <p className='text-center'>Total :₹ {price}</p>
                    </tbody>


                  </Table>
                </div> : <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                  <i className='fas fa-close smallclose'
                    onClick={handleClose}
                    style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                  <p style={{ fontSize: 22 }}>Your carts is empty</p>
                  <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                </div>
            }

          </Menu>
        </Container>
      </Navbar>
    </>
  );
}
export default Header;