import React, { useState, useCallback, useEffect } from 'react';

import Card from "../UI/Card/Card";
import MealItem from "./MealItem/MealItem.js";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState();

  const fetchMeals = useCallback(async () => {
    try {
      const response = await fetch("https://react-food-order-ba806-default-rtdb.europe-west1.firebasedatabase.app/meals.json");

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      let loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsloading(false);    
    } catch (error){
      setIsloading(false); 
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  if (isLoading) {
    return ( 
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes['meals-error']}>
        <p>Failed to fetch</p>
      </section>
    );
  }

  const mealList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
