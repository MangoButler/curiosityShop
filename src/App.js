import React from "react";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import MenuList from "./components/Menu/MenuList";
// import { foodItems, drinkItems } from "./dummy-meals";
import useRequest from "./hooks/use-request";
//
function App() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const { isLoading, error, sendRequest } = useRequest();

  useEffect(() => {
    // const foodJson = JSON.stringify(foodItems);
    const transformData = (setter, data) => {
      const transformedData = [];
      for(let key in data){
        transformedData.push(
          {
            id: data[key].id,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          }
        )
      };
  
      setter(transformedData);
    };

    sendRequest(
      {url: "https://react-http-48ff4-default-rtdb.firebaseio.com/foods.json",}, transformData.bind(null, setFoods)
      ); 
    sendRequest(
        {url: "https://react-http-48ff4-default-rtdb.firebaseio.com/drinks.json",}, transformData.bind(null, setDrinks)
      );   
    

  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <Header />
      <Intro />
      <MenuList title="Food" menuList={foods} />
      <MenuList title="Drinks" menuList={drinks} />
    </React.Fragment>
  );
}

export default App;
