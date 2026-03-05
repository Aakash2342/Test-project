import { formatMoney } from "../../utils/money";
import { useState } from "react";
import axios from "axios";

export function Product({ product, loadCart }) {
    const [quantity, setQuantity] = useState(1);

    const addToCart = async () => {
        await axios.post('/api/cart-items', {
            productId: product.id,
            quantity
        },);
        await loadCart();
    }

    const selectQty = (event) => {
        const quantitySelected = Number(event.target.value);
        setQuantity(quantitySelected);
    }

    return (
        <div className="product-container"
        data-testid="product-container">
            <div className="product-image-container">
                <img
                    className="product-image"
                    data-testid="product-image"
                    src={product.image}
                    alt={product.name}
                />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img
                    className="product-rating-stars"
                    data-testid="product-rating-stars-image"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    alt="rating"
                />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>

            <div className="product-quantity-container">
                <select value={quantity} onChange={
                    selectQty
                }>
                    {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="added-to-cart">
                <img src="images/icons/checkmark.png" alt="checkmark" />
                Added
            </div>

            <button className="add-to-cart-button button-primary"
                data-testid="add-to-cart-button"
                onClick={addToCart}
            >
                Add to Cart
            </button>
        </div>
    );
}