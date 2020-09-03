import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


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
        console.log(this.props);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
        let _id = this.state.Id;
        let colour = this.state.colourName;
        let name = this.state.nameValue;
        let age = this.state.ageValue;
        this.props.addUser({_id,name,age,colour});
    };

    checkForIdValidation = (e) => {
        let value = e.target.value;
        if (isNaN(value)) {
            this.setState({ numberError: true })
        }
        else {
            this.setState({ numberError: false })
            this.setState({ Id: e.target.value })
        }
    }

    checkForNameValidation = (e) => {
        let value = e.target.value;
        if (isNaN(value)) {
            this.setState({ nameError: false })
            this.setState({ nameValue: e.target.value })
        }
        else {
            this.setState({ nameError: true })   
        }
    }

    checkForAgeValidation = (e) => {
        let value = e.target.value;
        if (isNaN(value)) {
            this.setState({ ageError: true })
        }
        else {
            this.setState({ ageError: false })
            this.setState({ ageValue: e.target.value })
        }
    }

    checkForColourNameValidation = (e) => {
        let value = e.target.value;
        if (isNaN(value)) {
            this.setState({ colourNameError: false })
            this.setState({ colourName: e.target.value })
        }
        else {
            this.setState({ colourNameError: true })
        }
    }
    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
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
                            Disagree
                        </Button>
                        <Button disabled={this.state.numberError === true || this.state.ageError === true || this.state.colourNameError === true || this.state.nameError === true} onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
