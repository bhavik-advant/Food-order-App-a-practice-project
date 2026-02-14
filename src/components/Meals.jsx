import { useEffect, useState } from "react";
import MealItems from "./MealItem";

export default function Meals(){

  const [meals , setMeals] = useState([]) 

  useEffect(()=>{
    async function fetchMeals(){
      const response = await fetch('http://localhost:3000/meals')
      const data = await response.json()
      setMeals(data)
    }
    fetchMeals();
  },[])

    return (
        <ul id="meals">
           {meals.map((meal) => (
              <MealItems key={meal.id} meal={meal} />
          ))} 
        </ul>
      );
}