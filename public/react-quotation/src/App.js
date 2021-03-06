import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect, useRef } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Quotation from "./components/Quotation";
import ProductManagement from "./components/ProductManagement";
import { Login } from "./components/Login";
import QuotationManagement from "./components/QuotationManagement";

const API_URL = process.env.REACT_APP_API_URL;

function App() {

  // The current user
  const [user,setUser] = useState();

  const handleLogin = (data) => {

    console.log('handleLogin', data)

    // Load data
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        window.alert("Error:"+data.error)
      } else {
        window.alert("Welcome "+data.name)
        console.log(data)
        setUser(data) // set the user
      }
    });
  }

  return (
    <Router>

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">VMS Company</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/quotation">Quotation</Nav.Link>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
            <Nav.Link href="/product-management">Product</Nav.Link>
            <Nav.Link href="/quotation-management">Quotation Management</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
        path="/product-management"
        element={<ProductManagement/>}/>

        <Route
        path="/quotation"
        element={<Quotation/>}/>

        <Route
        path="/"
        element={
          <Container>
            {user ? (
              <div>Hello {user.name}</div>
            ) : (
              <Login onLogin={handleLogin} />
            )}
          </Container>
        }/>  

        <Route
        path="/quotation-management"
        element={<QuotationManagement/>}/>   

        {/* <Route
        path="/"
        element={<Quotation/>}/> */}

      </Routes>

    </Router>
  );
}

export default App;
