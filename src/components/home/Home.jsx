import React, { useEffect, useState } from 'react';
import './Home.scss';
import Slider from '../slider/Slider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(products);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setFilter(res.data);
    });
  }, []);

  const Filtered = (product) => {
    const updatedProducts = products.filter((id) => id.category === product);
    setFilter(updatedProducts);
  };

  const FilterProducts = () => {
    return (
      <>
        <div className='categories'>
            <button onClick={() => setFilter(products)}>All</button>
            <button onClick={() => Filtered("men's clothing")}>Men</button>
            <button onClick={() => Filtered("women's clothing")}>Women</button>
            <button onClick={() => Filtered("jewelery")}>Jewelery</button>
            <button onClick={() => Filtered("electronics")}>Electronics</button>
        </div>
        
        <div className='cards'>
          {
            filter.map((item) => {
              return (
                <div className='cards'>
                    <div key={item.id} className='product_card' onClick={() => {navigate(`/${item.id}`)}}>
                          <img src={item.image} alt="#" />
                        <div className='descr'>
                          <h2>{item.title}</h2>
                          <h3>{item.price}$</h3>
                          <button className='buy_now'>Buy Now</button>
                        </div>
                    </div>
                </div>
              )
            })
          }
        </div>
      </>
    );
  };

  return (
    <main>
      <Slider />
      <div className='home'>
        {
          <FilterProducts />
        }
      </div>
    </main>
  )
}

export default Home;
