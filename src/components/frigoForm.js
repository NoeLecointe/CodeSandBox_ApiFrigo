import React, { useState } from "react";
// import Produit from "../produit";
import { TextField, Button } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function FrigoForm(props) {
  const [nom, setNom] = useState("");
  const [qte, setQte] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (nom !== "" && qte !== "") {
      let produit = { nom: nom, qte: qte };
      props.handlerA(produit);
      setNom("");
      setQte("");
    }
  };

  const handlerChangeN = (event) => {
    setNom(event.target.value);
  };
  const handlerChangeQ = (event) => {
    setQte(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          label="nom*"
          type="text"
          value={nom}
          onChange={handlerChangeN}
        />
        <TextField
          variant="outlined"
          label="quantité*"
          type="number"
          value={qte}
          onChange={handlerChangeQ}
        />
        <Button
          variant="contained"
          type="submit"
          startIcon={<CheckCircleOutlineIcon />}
        >
          Valider
        </Button>
      </form>
    </div>
  );
}
