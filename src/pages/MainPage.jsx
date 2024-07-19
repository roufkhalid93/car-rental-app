
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import AddBooking from "../components/AddBooking";
import BookingTable from "../components/BookingTable";
// import { Provider } from "react-redux";



export default function MainPage() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "");
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }


    const navigate = useNavigate();

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate]);

    const handleLogout = () => {
        setAuthToken(""); //clear token from localStorage 
    };

    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);


    return (
        <Container>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="#home">carANTel <i className="bi bi-car-front-fill"></i></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    <Button variant="primary" className="justify-content-end" onClick={handleLogout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Navbar>
            <br />
            <Button variant="secondary" onClick={handleShow}> Add Booking </Button>
            <AddBooking show={show} handleClose={handleClose} />
            <div className="table">
                <h1>Booking List</h1>
                <BookingTable />
            </div>
        </Container>
    );
}
