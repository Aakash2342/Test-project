import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliveryOptions";
import axios from "axios";
import { useState, useEffect } from "react";

export function OrderSummary({ deliveryOptions, cart, loadCart }) {
    const [localCart, setLocalCart] = useState(cart);
    
    useEffect(() => {
        setLocalCart(cart);
    }, [cart]);
    
    const deleteCartItem = async (productId) => {
        await axios.delete(`/api/cart-items/${productId}`);
        await loadCart();
    };

    const changeQuantity = (productId, delta) => {
        setLocalCart((prevCart) =>
            prevCart.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + delta }
                    : item
            )
        );
    };

    useEffect(() => {
        const timer = setTimeout(async () => {

            for (const item of localCart) {
                await axios.put(`/api/cart-items/${item.productId}`, {
                    quantity: item.quantity
                });
            }

            await loadCart();

        }, 2000);

        return () => clearTimeout(timer);

    }, [localCart]);

    return (
        <div className="order-summary">
            {deliveryOptions.length > 0 &&
                localCart.map((cartItem) => {

                    const selectedDeliveryOption = deliveryOptions.find(
                        (deliveryOption) =>
                            deliveryOption.id === cartItem.deliveryOptionId
                    );

                    if (!selectedDeliveryOption) return null;

                    return (
                        <div key={cartItem.productId} className="cart-item-container">

                            <div className="delivery-date">
                                Delivery date:{" "}
                                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs)
                                    .format("dddd, MMMM, D")}
                            </div>

                            <div className="cart-item-details-grid">

                                <img
                                    className="product-image"
                                    src={cartItem.product.image}
                                />

                                <div className="cart-item-details">

                                    <div className="product-name">
                                        {cartItem.product.name}
                                    </div>

                                    <div className="product-price">
                                        ${formatMoney(cartItem.product.priceCents)}
                                    </div>

                                    <div className="product-quantity">
                                        <span>
                                            Quantity:{" "}
                                            <span className="quantity-label">
                                                {cartItem.quantity}
                                            </span>
                                        </span>
                                        <br />
                                        <span
                                            className="update-quantity-link link-primary"
                                        >
                                            <button
                                                onClick={() => changeQuantity(cartItem.productId, 1)}
                                            >
                                                +
                                            </button>

                                            <button
                                                onClick={() => changeQuantity(cartItem.productId, -1)}
                                            >
                                                -
                                            </button>
                                        </span>
                                        <br />
                                        <span
                                            className="delete-quantity-link link-primary"
                                            onClick={() => deleteCartItem(cartItem.productId)}
                                        >
                                            Delete
                                        </span>

                                    </div>
                                </div>

                                <DeliveryOptions
                                    cartItem={cartItem}
                                    deliveryOptions={deliveryOptions}
                                    loadCart={loadCart}
                                />

                            </div>
                        </div>
                    );
                })}
        </div>
    );
}