import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';
import './Homepage.css';
import axios from 'axios';
import Search from '../components/Search';

export default function Homepage() {
  const [cars, setCars] = useState([]);
  const [searchbox, setSearchbox] = useState('');
  const [filter, setFilter] = useState({
    color: 'All',
    price: [0, 50000],
    mileage: [0, 20]
  });
  const [banner, setBanner] = useState(false);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await axios.get('https://glorious-tam-moth.cyclic.app/marketplace_inventory', {
          params: {
            color: filter.color,
            maxprice: filter.price[1],
            minprice: filter.price[0],
            minmileage: filter.mileage[0],
            maxmileage: filter.mileage[1]
          }
        });

        setCars(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(`Error!!`);
      }
    }

    fetchCars();
  }, [filter]);

  useEffect(() => {
    async function getcar() {
      try {
        const response = await axios.get('https://glorious-tam-moth.cyclic.app/get_car', {
          params: {
            car_req: searchbox
          }
        });
        setCars(response.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getcar();
  }, [searchbox]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  function handleSearchChange(newCar) {
    setSearchbox(newCar);
  }

  function handleBanner() {
    setBanner(true);
  }

  const inventory = cars.map((car) => (
    <Card key={car.id} name={`${car.oem_name} ${car.model_name} ${car.model_year}`} price={car.price} color={car.color} mileage={car.mileage}/>
  ));
  
  return (
    <div className="homepage-wrapper">
      <Search onSearchChange={handleSearchChange}/>
      <div className="homepage">
        <article>
          <Filter onFilterChange={handleFilterChange} />
          {/* {console.log(filter)}; */}
        </article>
        <main>{inventory}</main>
      </div>
    </div>
  );
}

