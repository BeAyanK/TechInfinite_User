import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Table, Button, Image, Container, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const FIREBASE_ORDERS_URL =
  "https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/orders";

const OrdersPage = () => {
  const auth = useSelector((state) => state.auth);
  const userEmail = auth?.email || "guest";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelling, setCancelling] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${FIREBASE_ORDERS_URL}.json`);
        const data = res.data || {};
        const loaded = Object.entries(data)
          .map(([id, order]) => ({
            id,
            ...order,
          }))
          .filter((order) => order.user === userEmail); 

        setOrders(loaded);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]); // Include userEmail as dependency since it's used in fetchOrders

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    setCancelling(orderId);
    try {
      await axios.patch(`${FIREBASE_ORDERS_URL}/${orderId}.json`, {
        status: "cancelled",
      });
      
      // Refetch orders after cancellation
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const res = await axios.get(`${FIREBASE_ORDERS_URL}.json`);
          const data = res.data || {};
          const loaded = Object.entries(data)
            .map(([id, order]) => ({
              id,
              ...order,
            }))
            .filter((order) => order.user === userEmail); 

          setOrders(loaded);
        } catch (err) {
          console.error("Error fetching orders:", err);
        } finally {
          setLoading(false);
        }
      };
      
      await fetchOrders();
    } catch (err) {
      console.error("Failed to cancel order:", err);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <Container className="my-5">
      <h3 className="mb-4">My Orders</h3>

      {loading ? (
        <Spinner animation="border" />
      ) : orders.length === 0 ? (
        <Alert variant="warning">You have no orders.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Status</th>
              <th>Items</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const totalQty = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
              const canCancel = order.status !== "cancelled" && order.status !== "delivered";

              return (
                <tr key={order.id}>
                  <td>
                    <span className="text-capitalize">{order.status}</span>
                  </td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {order.items?.map((item, idx) => (
                        <li key={idx} className="d-flex align-items-center gap-2 mb-1">
                          <Image src={item.imageUrl} alt={item.title} width={40} height={40} rounded />
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{totalQty}</td>
                  <td>₹{Number(order.totalAmount).toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{new Date(order.orderDate).toLocaleString()}</td>
                  <td>
                    {canCancel ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancelling === order.id}
                      >
                        {cancelling === order.id ? "Cancelling..." : "Cancel Order"}
                      </Button>
                    ) : (
                      <span className="text-muted">Not available</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default OrdersPage
