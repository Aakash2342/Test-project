import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
import { Header } from '../../components/Header';
import './OrdersPage.css';
import axios from 'axios';
import { useState, useEffect, Fragment } from 'react';

export function OrdersPage({ cart, loadCart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        document.title = 'Orders';

        axios
            .get('/api/orders?expand=products')
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

        const addCart = async (productId, quantity) => {
        await axios.post('/api/cart-items', {
            productId,
            quantity
        });
        await loadCart();
    }

    return (
        <>
            <Header cart={cart} />

            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <div className="orders-grid">
                    {orders.map((order) => (
                        <div key={order.id} className="order-container">
                            <div className="order-header">
                                <div className="order-header-left-section">
                                    <div className="order-date">
                                        <div className="order-header-label">Order Placed:</div>
                                        <div>
                                            {dayjs(order.orderTimeMs).format(
                                                'dddd, MMMM D'
                                            )}
                                        </div>
                                    </div>

                                    <div className="order-total">
                                        <div className="order-header-label">Total:</div>
                                        <div>{formatMoney(order.totalCostCents)}</div>
                                    </div>
                                </div>

                                <div className="order-header-right-section">
                                    <div className="order-header-label">Order ID:</div>
                                    <div>{order.id}</div>
                                </div>
                            </div>

                            <div className="order-details-grid">
                                {order.products?.map((orderProduct) => (
                                    <Fragment key={orderProduct.product.id}>
                                        <div className="product-image-container">
                                            <img
                                                src={orderProduct.product.image}
                                                alt={orderProduct.product.name}
                                            />
                                        </div>

                                        <div className="product-details">
                                            <div className="product-name">
                                                {orderProduct.product.name}
                                            </div>

                                            <div className="product-delivery-date">
                                                Arriving on:{' '}
                                                {dayjs(
                                                    orderProduct.estimatedDeliveryTimeMs
                                                ).format('MMMM D')}
                                            </div>

                                            <div className="product-quantity">
                                                Quantity: {orderProduct.quantity}
                                            </div>

                                            <button className="buy-again-button button-primary"
                                                onClick={() => addCart(orderProduct.product.id, orderProduct.quantity)}
                                            >
                                                <img
                                                    className="buy-again-icon"
                                                    src="images/icons/buy-again.png"
                                                    alt="Buy again"
                                                />
                                                <span className="buy-again-message">
                                                    Add to Cart
                                                </span>
                                            </button>
                                        </div>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}