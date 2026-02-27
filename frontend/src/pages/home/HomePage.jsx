import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';

export function HomePage({ cart }) {
    const [products, setProduct] = useState([]);


    useEffect(() => {
        const getHomeData = async () => {
            // used server proxy for this see vite.config in there see server proxy api
            const response = await axios.get('/api/products')
            setProduct(response.data);

        };

        getHomeData();
    }, []);


    return (
        <>
            <title>E-Commerce Page</title>

            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    )
}