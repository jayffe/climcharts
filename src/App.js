import React, {Component, Fragment} from 'react'
import Header from "./components/Header"
import { Drawer } from "@material-ui/core"
import { Menu, BilanClimatique, DropCsv } from "./components"
import { Route } from "react-router-dom"


class App extends Component {

  state = {
    open : false
  }

  toggleDrawer = ( open )=>{

    this.setState({open: !this.state.open})
  }

  render() {

    const {open} = this.state

    return (
      <Fragment>

        <Header toggleDrawer={this.toggleDrawer}/>

        <Drawer open={open} onClose={this.toggleDrawer}>
          <div tabIndex={0} role="button" onClick={this.toggleDrawer}>
            <Menu/>
          </div>
        </Drawer>

        <Route exact path="/" component={BilanClimatique} />
        <Route path="/temperatures" component={DropCsv} />

      </Fragment>
    )
  }
}

export default App;
