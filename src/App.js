import React, {Component, Fragment} from 'react'
import BilanClimatique from "./components/BilanClimatique"
import Header from "./components/Header"

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header/>
        <BilanClimatique/>
      </Fragment>
    )
  }
}

export default App;
