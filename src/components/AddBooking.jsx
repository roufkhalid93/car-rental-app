import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
// import { Provider } from "react-redux";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";


export default function AddBooking({ show, handleClose }) {
    const [postName, setPostName] = useState("");
    const [postPhoneNumber, setPostPhoneNumber] = useState("");
    const [postEmail, setPostEmail] = useState("");
    const [postDate, setPostDate] = useState("");
    const [postVehicleType, setPostVehicleType] = useState("");
    const [postSpecialRequest, setPostSpecialRequest] = useState("");


    //handle post booking
    const handleSave = () => {
        //get stored JWT token
        const token = localStorage.getItem("authToken");

        //Decode the token to fetch the userid
        const decode = jwtDecode(token);
        const userId = decode.id

        const data = {
            name: postName,
            phone_number: postPhoneNumber,
            email: postEmail,
            date: postDate,
            vehicle_type: postVehicleType,
            special_request: postSpecialRequest,
            user_id: userId
        };

        axios
            .post("https://75f59249-f39e-45e2-bdbc-28aacda3df6a-00-1uz82hdu0wwx5.picard.replit.dev/booking", data)
            .then((response) => {
                console.log("Success:", response.data);
                handleClose();
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            // onClick={handleShow}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="postName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPostName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postPhoneNumber">
                            <Form.Label>Phone no.</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPostPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPostEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPostDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postVehicleType">
                            <Form.Label>Types of vehicle</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) => setPostVehicleType(e.target.value)}
                            >
                                <option></option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="MPV">MPV</option>
                                <option value="Pickup">Pickup</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="postSpecialRequest">
                            <Form.Label>Special request</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) => setPostSpecialRequest(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Confirm Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
