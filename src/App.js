import "./styles.css";
import React from "react";
import Frigo from "./components/frigo";

export default function App() {
  let prenom = "Noé";

  return (
    <div className="App">
      <h1>Bonjour {prenom}</h1>
      <h2>Bienvenue dans ton frigo !</h2>
      <Frigo></Frigo>
    </div>
  );
}
