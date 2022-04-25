import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";

const AddUserForm = (props) => {
  const [user, setUser] = useState(props.initialFormState);
  const [erro, setErro] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const validation = (event) => {
    const regPrazo =
      /^\b(0?[1-9]|[12][0-9]|3[01])\b-\b(0?[1-9]|1[0-2])\b-\b(2022|[2-9][0-9][0-9][0-9])\b$/;
    if (
      user.titulo === "" ||
      user.descricao === "" ||
      user.prazo === "" ||
      user.entregue === ""
    ) {
      setErro("empty");
      return;
    } else if (user.prazo.match(regPrazo) === null) {
      setErro("term");
      return;
    } else if (user.entregue !== "sim" && user.entregue !== "não") {
      setErro("delivered");
      return;
    }

    event.preventDefault();

    props.addUser(user);
    setUser(props.initialFormState);
    setErro(null);
  };

  return (
    <>
      {erro === "empty" ? (
        <Alert severity="error">
          Campo vazio - <strong>revise dados</strong>
        </Alert>
      ) : erro === "term" ? (
        <Alert severity="error">
          Campo prazo inválido - <strong>revise dados</strong>
        </Alert>
      ) : erro === "delivered" ? (
        <Alert severity="error">
          Campo entrega concluída inválido - <strong>revise dados</strong>
        </Alert>
      ) : (
        <Alert severity="info">
          Preencha os dados - <strong>dados a serem preenchidos</strong>
        </Alert>
      )}
      <div className="box-input">
        <TextField
          name="titulo"
          type="text"
          className="input input--titulo"
          label="Título"
          value={user.titulo}
          onChange={handleInputChange}
        />
        <TextField
          name="descricao"
          type="text"
          className="input input--descricao"
          label="Descrição"
          value={user.descricao}
          onChange={handleInputChange}
        />
        <TextField
          name="prazo"
          type="text"
          className="input input--prazo"
          label="Prazo de entrega"
          placeholder="dd-mm-aaaa"
          value={user.prazo}
          onChange={handleInputChange}
        />
        <TextField
          name="entregue"
          type="text"
          className="input input--entregue"
          label="Entrega concluída"
          placeholder="sim/não"
          value={user.entregue}
          onChange={handleInputChange}
        />
      </div>
      <div className="box-button">
        <div className="adjust-1">
          <Button onClick={validation} variant="outlined">
            adicionar
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddUserForm;
