// import { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItems from "./MealItem";

const requestConfig = {}
export default function Meals(){

  const {data : meals , isLoading , error} = useHttp('http://localhost:3000/meals',requestConfig,[])

  // const [meals , setMeals] = useState([]) 

  // useEffect(()=>{
  //   async function fetchMeals(){
  //     const response = await fetch('http://localhost:3000/meals')
  //     const data = await response.json()
  //     setMeals(data)
  //   }
  //   fetchMeals();
  // },[])

  if(isLoading){
    return <p className="center">Fetching meals...</p>
  }

  if(error){
    return(
      <Error title="Failed to fetch meals" message={error}/>
    )
  }

    return (
        <ul id="meals">
           {meals.map((meal) => (
              <MealItems key={meal.id} meal={meal} />
          ))} 
        </ul>
      );
}