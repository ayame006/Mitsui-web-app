import React, { useEffect, useState } from 'react';
import './ProductDetails.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {

    const { id } = useParams();
    const [item, setItem] = useState([]);
    
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
            console.log(res.data);
            setItem(res.data);
        });
    }, [id]);
    
    const FilterProducts = () => {
        return (
            <div className='product_details'>
             <div className='product_info'>
                <img src={item.image} alt="#" />
                <div className='info'>
                    <h2>{item.title}</h2>
                    <h3>{item.price}$</h3>
                    <h4>Category: {item.category}</h4>
                    <h4>
                        {
                            item.rating && item.rating.rate
                        }
                    </h4>
                    <p>{item.description}</p>
                    <button  className='btn_cart' >Add to cart</button>
                </div>
              </div>
            </div>
        );
    };  

    return (
        <div>
            {
                <FilterProducts />
            }
        </div>
    )
}

export default ProductDetails;
