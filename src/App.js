import React from "react";
import Header from "./components/Header/Header";
import Intro from "./components/Intro/Intro";
import MenuList from "./components/Menu/MenuList";
import { foodItems, drinkItems } from './dummy-meals';
// 
function App() {
  return (
    <React.Fragment>
      <Header/>
      <Intro/>
      <MenuList title='Food' menuList={foodItems}/>
      <MenuList title='Drinks' menuList={drinkItems}/>
    </React.Fragment>
  );
}

export default App;
