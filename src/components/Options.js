import React from "react"

const withOptions = (WrappedComponent) => {

  return class extends React.Component {

    state = {
      options:{
        debut: null,
        fin: null,
        offset: 10,
        dateTicks: 12,
        colors: {
          TMoy: "#FF9A5A",
          TMax: "#FF0200",
          TMini: "#53DDFF",
          TZone: "#FFD19B",
          Pluie: "#4682b4"
        },
      }
    }

    setOption = ( option )=>{

      const {options} = this.state
      this.setState({options:{...options, ...option}})
    }

    render() {
      return <WrappedComponent options={this.state.options} setOption={this.setOption}  { ...this.props } />
    }
  }

}

export default withOptions

