import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import { checkForAgeValidation, checkForColourNameValidation, checkForIdValidation, checkForNameValidation } from "./formValidation";

class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      numberError: false,
      ageError: false,
      nameError: false,
      colourNameError: false,
      colour: null
    }

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  };

  checkForIdValidation = (e) => {
    if (checkForIdValidation(e)) {
      this.setState({ numberError: true })
    }
    else {
      this.setState({ numberError: false })
      this.setState({ _id: e.target.value })
    }
  }

  checkForNameValidation = (e) => {
    if (checkForNameValidation(e) === false) {
      this.setState({ nameError: false })
      this.setState({ name: e.target.value })
    }
    else {
      this.setState({ nameError: true })
    }
  }

  checkForAgeValidation = (e) => {
    if (checkForAgeValidation(e)) {
      this.setState({ ageError: true })
    }
    else {
      this.setState({ ageError: false })
      this.setState({ age: e.target.value })
    }
  }

  checkForColourNameValidation = (e) => {
    if (checkForColourNameValidation(e) === false) {
      console.log("RRr",e.target.value);
      this.setState({ colourNameError: false })
      this.setState({ colour: e.target.value })
    }
    else {
      this.setState({ colourNameError: true })
    }
  }

  // it is for checking whether the value from form is changed or not
  checkForValue(value, variable) {
    console.log("CCC",value,variable);
    let userData = this.props.item;
    if (value === undefined || value==null) {
      for (var prop in userData) {
        if (prop === variable) {
          console.log(userData[prop])
          return userData[prop];
        }
      }
    }
    else {
      return value
    }
  }

  editUser = () => {
    this.setState({ open: false })
    console.log("DD",this.state.colour);
    console.log("DD",this.state.name);

    let _id = this.checkForValue(this.state._id, "_id");
    let colour = this.checkForValue(this.state.colour, "colour");
    let name = this.checkForValue(this.state.name, "name");
    let age = this.checkForValue(this.state.age, "age");
    this.props.editUser({ _id, name, age, colour });
  };

  render() {
    return (
      <div>
        <EditIcon variant="outlined" color="primary" onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update User"}</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                required
                error={this.state.numberError}
                id="outlined-error-helper-text"
                label="id"
                defaultValue={this.props.item._id}
                helperText={this.state.numberError ? "Incorrect entry" : ""}
                variant="outlined"
                onChange={(e) => { this.checkForIdValidation(e) }} /><br />
              <br />
              <br />
              <br />
              <TextField required
                error={this.state.nameError}
                id="outlined-error-helper-text"
                label="name"
                defaultValue={this.props.item.name}
                helperText={this.state.nameError ? "Incorrect entry" : ""}
                variant="outlined"
                onChange={(e) => { this.checkForNameValidation(e) }} /><br />
              <br />
              <br />
              <br />
              <TextField required
                error={this.state.ageError}
                id="outlined-error-helper-text"
                label="age"
                defaultValue={this.props.item.age}
                helperText={this.state.ageError ? "Incorrect entry" : ""}
                variant="outlined"
                onChange={(e) => { this.checkForAgeValidation(e) }} />
              <br />
              <br />
              <br />
              <br />
              <TextField required
                error={this.state.colourNameError}
                id="outlined-error-helper-text"
                label="colour"
                defaultValue={this.props.item.colour}
                helperText={this.state.colourNameError ? "Incorrect entry" : ""}
                variant="outlined"
                onChange={(e) => { this.checkForColourNameValidation(e) }} />
              <br />
              <br />
              <br />
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
          </Button>
            <Button disabled={this.checkForDisabledButton} onClick={this.editUser} color="primary" autoFocus>
              Update
          </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}
export default EditDialog