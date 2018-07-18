
import React from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import download from "downloadjs";
import html2canvas from "html2canvas";
import {CameraAlt as Camera} from "@material-ui/icons"
import {Button} from "@material-ui/core"

class PictureButton extends React.Component{


  takePicture = () => {

    const {element} = this.props

    html2canvas(element, {logging: false}).then(function (canvas) {
      download(canvas.toDataURL("image/png"), `BilanClimatique.png`, "image/png");
    })

  }


  render(){

    const {classes} = this.props

    return (
      <Button className={classes.button} onClick={this.takePicture} variant="fab"><Camera/></Button>
    )
  }
}

/* Styles
-------------------------------------------------------------------------------------------------*/
const styles = theme => ({
  button:{
    margin: 30
  }
});
const StyledPictureButton = withStyles(styles)(PictureButton);

export default StyledPictureButton