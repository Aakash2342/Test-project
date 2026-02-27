import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import './HomePage.css';
import { ProductsGrid } from './ProductsGrid';

export function HomePage( {cart} ) {
    const [products, setProduct] = useState([]);
    
    
    useEffect(() => {
        // used server proxy for this see vite.config in there see server proxy api
        axios.get('/api/products')
            .then((response) => {
                setProduct(response.data);
            })
    }, []);


    return (
        <>
            <title>E-Commerce Page</title>

            <Header cart={ cart }/>
            <div className="home-page">
                <ProductsGrid products={products} />
            </div>
        </>
    )
}