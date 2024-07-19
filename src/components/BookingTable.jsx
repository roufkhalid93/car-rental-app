import { Button, Table } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function BookingTable() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('https://75f59249-f39e-45e2-bdbc-28aacda3df6a-00-1uz82hdu0wwx5.picard.replit.dev/booking');
                setBookings(response.data);
            } catch (error) {
                console.error("Error", error.message)
            }
        };

        fetchBookings()
    }, []);


    const handleDelete = (bookingid) => {
        const token = localStorage.getItem("authToken")
        const decode = jwtDecode(token)
        const userId = decode.id

        const data = {
            user_id: userId
        };

        axios
            .delete(`https://75f59249-f39e-45e2-bdbc-28aacda3df6a-00-1uz82hdu0wwx5.picard.replit.dev/booking/${bookingid}`, data)
            .then((response) => {
                console.log("Success:", response.data)
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id No.</th>
                    <th>Name</th>
                    <th>Phone No.</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Vehicle Type</th>
                    <th>Special Request</th>
                    <th>Option</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map((booking) => (
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.name}</td>
                        <td>{booking.phone_number}</td>
                        <td>{booking.email}</td>
                        <td>{booking.date}</td>
                        <td>{booking.vehicle_type}</td>
                        <td>{booking.special_request}</td>
                        <td>
                            <Button
                                variant='secondary'
                            >
                                Edit
                            </Button>
                            <Button
                                variant='danger'
                                onClick={() => handleDelete(booking.id)}//must put call back funtion otherwise it'll delete the whole table
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}
