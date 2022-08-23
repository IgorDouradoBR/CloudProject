
import { 
  Row, Col, Button,
  Card,  CardBody, CardHeader, CardFooter,
  Input, InputGroup, InputGroupAddon,
  } 
  from 'reactstrap';
import React from 'react';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        "nome": "",
        "setor": "",
        "prateleira": "",
        "tipo": "",
        "peso": "",
        "volume": "",
        "quantidade": "",
        "httpStatus": 0,
        "saida": ""
        };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const entra = event.target.id;
    const valor = event.target.value;
    let state = this.state;
    state[entra] = valor;
    this.setState(state);
  }

  handleClick(event) {
    const buttonId = event.target.id;
    let state = this.state
    if (buttonId === "adiciona") {
      fetch("http://localhost:5000/keys", {
        method: 'POST',
        body: JSON.stringify({
            "nome": state["nome"],
            "setor": state["setor"],
            "prateleira": state["prateleira"],
            "tipo": state["tipo"],
            "peso": state["peso"],
            "volume": state["volume"],
            "quantidade": state["quantidade"]
            })
      })
      .then(requisicao => {
        state["httpStatus"] = requisicao.status;
        state["saida"] = requisicao.statusText;
        if (requisicao.status < 300) {
          return requisicao.json();
        }
        return {}
      })
      .then(valores => {
          if (state["httpStatus"] < 300) {
            state["nome"] = valores["nome"];
            state["setor"] = valores["setor"];
            state["prateleira"] = valores["prateleira"];
            state["tipo"] = valores["tipo"];
            state["peso"] = valores["peso"];
            state["volume"] = valores["volume"];
            state["quantidade"] = valores["quantidade"];
          }
          this.setState(state);
      })
      .catch(naofoi => {
        state["saida"] = naofoi;
        this.setState(state);
      });    
    }

    else if (buttonId === "consulta") {
      fetch("http://localhost:5000/keys/" + state["nome"], {
      })
      .then(requisicao => {
        state["httpStatus"] = requisicao.status;
        state["saida"] = requisicao.statusText;
        if (requisicao.status < 300) {
          return requisicao.json();
        }
        return {}
      })
      .then(valores => {
          if (state["httpStatus"] < 300) {
            state["nome"] = valores["nome"];
            state["setor"] = valores["setor"];
            state["prateleira"] = valores["prateleira"];
            state["tipo"] = valores["tipo"];
            state["peso"] = valores["peso"];
            state["volume"] = valores["volume"];
            state["quantidade"] = valores["quantidade"];
          } else {
            state["setor"] = "";
            state["prateleira"] = "";
            state["tipo"] = "";
            state["peso"] = "";
            state["volume"] = "";
            state["quantidade"] = "";
          }
          this.setState(state);
      })
      .catch(naofoi => {
        state["setor"] = "";
        state["prateleira"] = "";
        state["tipo"] = "";
        state["peso"] = "";
        state["volume"] = "";
        state["quantidade"] = "";
        state["saida"] = naofoi;
        this.setState(state);
      });    
    }
    else if (buttonId === "atualiza") {
      fetch("http://localhost:5000/keys/" +  state["nome"], { 
        method: 'PUT',
        body: JSON.stringify({
            "setor": state["setor"],
            "prateleira": state["prateleira"],
            "tipo": state["tipo"],
            "peso": state["peso"],
            "volume": state["volume"],
            "quantidade": state["quantidade"]
            })
      })
      .then(requisicao => {
        state["httpStatus"] = requisicao.status;
        state["saida"] = requisicao.statusText;
        if (requisicao.status < 300) {
          return requisicao.json();
        }
        return {}
      })
      .then(valores => {
          if (state["httpStatus"] < 300) {
            state["nome"] = valores["nome"];
            state["setor"] = valores["setor"];
            state["prateleira"] = valores["prateleira"];
            state["tipo"] = valores["tipo"];
            state["peso"] = valores["peso"];
            state["volume"] = valores["volume"];
            state["quantidade"] = valores["quantidade"];
          }
          this.setState(state);
      })
      .catch(naofoi => {
        state["saida"] = naofoi;
        this.setState(state);
      });    
    }

    else if (buttonId === "exclui") {
      fetch("http://localhost:5000/keys/" + state["nome"], { 
        method: 'DELETE'
      })
      .then(requisicao => {
        // console.log(requisicao);
        state["httpStatus"] = requisicao.status;
        state["saida"] = requisicao.statusText;
        if (requisicao.status < 300) {
          return requisicao.json();
        }
        return {}
      })
      .then(valores => {
          // console.log(valores);
          if (state["httpStatus"] < 300) {
            state["nome"] = valores["nome"];
            state["setor"] = valores["setor"];
            state["prateleira"] = valores["prateleira"];
            state["tipo"] = valores["tipo"];
            state["peso"] = valores["peso"];
            state["volume"] = valores["volume"];
            state["quantidade"] = valores["quantidade"];
          }
          this.setState(state);
      })
      .catch(naofoi => {
        // console.log(naofoi);
        state["saida"] = naofoi;
        this.setState(state);
      });    
    }

   

    else if (buttonId === "buscaSetor") {
      fetch("http://localhost:5000/keys/" + state["setor"], {
      })
      .then(requisicao => {
        // console.log(requisicao);
        state["httpStatus"] = requisicao.status;
        state["saida"] = requisicao.statusText;
        if (requisicao.status < 300) {
          return requisicao.json();
        }
        return {}
      })
      .then(valores => {
          // console.log(valores);
          if (state["httpStatus"] < 300) {
            state["saida"] = JSON.stringify(valores);
          }
          this.setState(state);
      })
      .catch(naofoi => {
        // console.log(naofoi);
        state["setor"] = "";
        state["prateleira"] = "";
        state["tipo"] = "";
        state["peso"] = "";
        state["volume"] = "";
        state["quantidade"] = "";
        state["saida"] = naofoi;
        this.setState(state);
      });    
    }
    else if (buttonId === "buscaPrateleira") {
      fetch("http://localhost:5000/keys/" + state["prateleira"], {
      })
      .then(requisicao => {
        // console.log(requisicao);
        state["httpStatus"] = requisicao.status;
        state["saida"] = requisicao.statusText;
        if (requisicao.status < 300) {
          return requisicao.json();
        }
        return {}
      })
      .then(valores => {
          // console.log(valores);
          if (state["httpStatus"] < 300) {
            state["saida"] = JSON.stringify(valores);
          }
          this.setState(state);
      })
      .catch(naofoi => {
        // console.log(naofoi);
        state["setor"] = "";
        state["prateleira"] = "";
        state["tipo"] = "";
        state["peso"] = "";
        state["volume"] = "";
        state["quantidade"] = "";
        state["saida"] = naofoi;
        this.setState(state);
      });    
    }
    else if (buttonId === "buscaPratSetor") {
      fetch("http://localhost:5000/keys/" + state["setor"], {
      })
      .then(requisicao => {
        // console.log(requisicao);
        state["httpStatus"] = requisicao.status;
        state["saida"] = requisicao.statusText;
        if (requisicao.status < 300) {
          return requisicao.json();
        }
        return {}
      })
      .then(valores => {
          // console.log(valores);
          if (state["httpStatus"] < 300) {
            state["saida"] =  JSON.stringify(valores);
          }
          this.setState(state);
      })
      .catch(naofoi => {
        // console.log(naofoi);
        state["setor"] = "";
        state["prateleira"] = "";
        state["tipo"] = "";
        state["peso"] = "";
        state["volume"] = "";
        state["quantidade"] = "";
        state["saida"] = naofoi;
        this.setState(state);
      });    
    }
  }

  // ######################### page design ###########################
  render() {
    const state = this.state;
    return (
    <Row> <Col sm={{ size: 6, offset: 3 }}> <Card className='mt-5'>
        <CardHeader tag="h3">API Test</CardHeader>
        <CardBody>
          <InputGroup>
            <InputGroupAddon addonType="prepend">Nome:</InputGroupAddon>
            <Input value={state["nome"]} onChange={this.handleChange} id="nome"/>
          </InputGroup> <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Setor: </InputGroupAddon>
            <Input value={state["setor"]} onChange={this.handleChange} id="setor"/>
          </InputGroup> <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Prateleira: </InputGroupAddon>
            <Input value={state["prateleira"]} onChange={this.handleChange} id="prateleira"/>
          </InputGroup> <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Tipo: </InputGroupAddon>
            <Input value={state["tipo"]} onChange={this.handleChange} id="tipo"/>
          </InputGroup> <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Peso: </InputGroupAddon>
            <Input value={state["peso"]} onChange={this.handleChange} id="peso"/>
          </InputGroup> <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Volume: </InputGroupAddon>
            <Input value={state["volume"]} onChange={this.handleChange} id="volume"/>
          </InputGroup> <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend">Quantidade: </InputGroupAddon>
            <Input value={state["quantidade"]} onChange={this.handleChange} id="quantidade"/>
          </InputGroup> <br />
          <Button color="secondary" onClick={this.handleClick} id="adiciona">Adiciona</Button>{" "}
          <Button color="secondary" onClick={this.handleClick} id="consulta">Consulta</Button>{" "}
          <Button color="secondary" onClick={this.handleClick} id="atualiza">Atualiza</Button>{" "}
          <Button color="secondary" onClick={this.handleClick} id="exclui">Exclui</Button>{" "}
          <Button color="secondary" onClick={this.handleClick} id="buscaSetor">Busca por setor</Button>{" "}
          <Button color="secondary" onClick={this.handleClick} id="buscaPrateleira">Busca por prateleira</Button>{" "}
          <Button color="secondary" onClick={this.handleClick} id="buscaPratSetor">Busca as prateleiras por setor</Button>{" "}

        </CardBody>
      <CardFooter> 
        {"OUTPUT: " + state["saida"]}
      </CardFooter>
    </Card> 
    </Col> 
    </Row>
    )
  }
}

export default App;
