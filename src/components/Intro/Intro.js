import React from "react";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from './Intro.module.css';


const Intro = () =>{
    const curiosityShop = (
        <div>
          <h2>"Curiosity Shop"</h2>
          <p>The enigmatic restaurant and food delivery service that offers a truly unique culinary experience. As the name suggests, Curiosity Shop specializes in exotic and mysterious dishes that are sure to pique your interest and tantalize your taste buds.</p>
    
          <p>But this is no ordinary restaurant - Curiosity Shop operates exclusively at night, delivering their tantalizing menu items only on the second Wednesday of every month. And to add to the intrigue, the menu changes every two hours, keeping even their most loyal customers on their toes.</p>
    
          <p>In addition to their eclectic menu, Curiosity Shop also offers a wide selection of mysterious drinks that are sourced from the most remote corners of the world. And while the identity of their delivery agency remains undisclosed, customers can be assured that their food will arrive promptly and in perfect condition.</p>
    
          <p>If you're looking for an unforgettable culinary adventure that will leave you feeling both satisfied and curious, look no further than Curiosity Shop.</p>
        </div>
      );

    return (
        <Card className={classes.summary}>
            {curiosityShop}
            <Button>See our locations!</Button>
        </Card>
    )
};

export default Intro;