import React from "react";
import { Button } from "semantic-ui-react"

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <button className="ui button">Botão com a lib Semantic-ui</button>
        <Button>Botão com a lib Semantic-ui-react</Button>
      </div>
    );
  }
}

export { HomePage };
