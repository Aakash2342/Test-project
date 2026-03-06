import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import api from "../../utils/api";

export function DeliveryOptions({ deliveryOptions, cartItem, loadCart }) {

    const updateDeliveryOption = async (deliveryOptionId) => {
        await api.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOptionId
        });

        await loadCart();
    };

    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>

            {deliveryOptions.map((deliveryOption) => {

                let priceString = "Free Shipping";

                if (deliveryOption.priceCents > 0) {
                    priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                }

                return (
                    <div
                        key={deliveryOption.id}
                        className="delivery-option"
                        onClick={() => updateDeliveryOption(deliveryOption.id)}
                    >
                        <input
                            type="radio"
                            checked={deliveryOption.id === cartItem.deliveryOptionId}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`}
                            readOnly
                        />

                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM, D")}
                            </div>

                            <div className="delivery-option-price">
                                {priceString}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}