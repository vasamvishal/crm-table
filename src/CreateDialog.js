import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import "./CreateDialog.css";
import { checkForAgeValidation, checkForColourNameValidation, checkForIdValidation, checkForNameValidation } from "./formValidation";

export default class CreateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            numberError: false,
            ageError: false,
            nameError: false,
            colourNameError: false,
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    }

    checkForIdValidation = (e) => {
        if (checkForIdValidation(e)) {
            this.setState({ numberError: true })
        }
        else {
            this.setState({ numberError: false })
            this.setState({ Id: e.target.value })
        }
    }

    checkForNameValidation = (e) => {
        if (checkForNameValidation(e) === false) {
            this.setState({ nameError: false })
            this.setState({ nameValue: e.target.value })
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
            this.setState({ ageValue: e.target.value })
        }
    }

    checkForColourNameValidation = (e) => {
        if (checkForColourNameValidation(e) === false) {
            this.setState({ colourNameError: false })
            this.setState({ colourName: e.target.value })
        }
        else {
            this.setState({ colourNameError: true })
        }
    }
    createUser = () => {
        this.setState({ open: false })
        this.props.addUser({ _id:this.state.Id, name:this.state.nameValue, age:this.state.ageValue, colour:this.state.colourName });
    };

    checkForDisabledButton() {
        if (this.state.numberError === false && this.state.colourNameError === false
          && this.state.ageError === false && this.state.nameError === false 
          && this.state.Id !== undefined && this.state.nameValue !==undefined && 
          this.state.ageValue !==undefined && this.state.colourName !==undefined
          ) {
          return false;
        }
        else {
          return true;
        }
      }
    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" className="create-button" onClick={this.handleClickOpen}>
                    NEW
                 </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"NEW USER"}</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                required
                                error={this.state.numberError}
                                id="outlined-error-helper-text"
                                label="id"
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
                            BACK
                        </Button>
                        <Button disabled={this.checkForDisabledButton()}
                            onClick={this.createUser} color="primary" autoFocus>
                            CREATE
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
