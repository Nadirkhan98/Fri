const express = require("express");
const app = express();
app.use(express.json());

const food = [
  { id: 1, foodName: "Pizza", ratingOutOf5: 5 },
  { id: 2, foodName: "Pasta", ratingOutOf5: 3 },
  { id: 3, foodName: "Curry", ratingOutOf5: 4 },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/food", (req, res) => {
  res.json(food);
});

app.get("/food/:id", (req, res) => {
  console.log(req.params.id);
  try {
    const foodId = parseInt(req.params.id);
    const foodItem = food[foodId - 1];
    if (!foodItem) {
      throw new Error("This food item does not exist. Try another id");
    } else {
      res.send(foodItem);
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

app.post("/food", (req, res) => {
  const newFoodId = food.length + 1;
  const newFood = { ...req.body, id: newFoodId };
  food.push(newFood);
  res.status(201).send(newFood);
});

app.delete("/food", (req, res) => {
  res.status(204).end();
});

module.exports = app;
