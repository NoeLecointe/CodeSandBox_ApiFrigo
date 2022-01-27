import React, { useState, useEffect } from "react";
import Produit from "../produit";
import { List, ListItem, ListItemText, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import RemoveIcon from "@material-ui/icons/RemoveCircleOutline";
import FrigoForm from "./frigoForm";

export default function Frigo() {
  const [frigo, setFrigo] = useState([]);

  useEffect(() => {
    getFrigo();
  }, [frigo]);

  const getFrigo = () => {
    let url = `https://webmmi.iut-tlse3.fr/~lcn3741a/Laravel/APIFrigo/public/api/produits`;
    let fetchOptions = {};

    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        let produits = [];
        dataJSON.forEach((e) => {
          let prod = new Produit(e.id, e.nom, e.qte);
          produits.push(prod);
        });
        setFrigo(produits);
      });
  };

  const handlerProduit = (produit) => {
    console.log(produit);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const url = `https://webmmi.iut-tlse3.fr/~lcn3741a/Laravel/APIFrigo/public/api/produits`;

    const fetchOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(produit)
    };

    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        getFrigo();
        console.log(dataJSON);
      })
      .catch((error) => console.log(error));
  };

  const handlerDelete = (id) => {
    const url = `https://webmmi.iut-tlse3.fr/~lcn3741a/Laravel/APIFrigo/public/api/produits`;

    const fetchOptions = {
      method: "DELETE" // --> DELETE = suppression
    };
    fetch(url + "/" + id, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        getFrigo();
        console.log(dataJSON);
      })
      .catch((error) => console.log(error));
  };

  const handlerPlusUn = (produit) => {
    produit.qte++;
    const url = `https://webmmi.iut-tlse3.fr/~lcn3741a/Laravel/APIFrigo/public/api/produits`;

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const fetchOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(produit)
    };

    fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        getFrigo();
        console.log(dataJSON);
      })
      .catch((error) => console.log(error));
  };

  const handlerMoinsUn = (produit) => {
    produit.qte--;

    if (produit.qte === 0) {
      handlerDelete(produit.id);
    } else {
      const url = `https://webmmi.iut-tlse3.fr/~lcn3741a/Laravel/APIFrigo/public/api/produits`;

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const fetchOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(produit)
      };

      fetch(url, fetchOptions)
        .then((response) => {
          return response.json();
        })
        .then((dataJSON) => {
          getFrigo();
          console.log(dataJSON);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <FrigoForm handlerA={handlerProduit}></FrigoForm>
      <List>
        {frigo.map((f) => {
          return (
            <ListItem button key={f.id}>
              <ListItemText>
                {f.nom} ({f.qte})
              </ListItemText>
              <Button variant="contained" onClick={(e) => handlerPlusUn(f)}>
                <AddIcon />
              </Button>
              <Button variant="contained" onClick={(e) => handlerMoinsUn(f)}>
                <RemoveIcon />
              </Button>
              <Button variant="contained" onClick={(e) => handlerDelete(f.id)}>
                <DeleteIcon />
              </Button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
