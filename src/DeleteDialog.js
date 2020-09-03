import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

class DeleteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  handleClickOpen() {
    this.setState({ open: true });
  };

  handleClose() {
    this.setState({ open: false });
  }

  deleteUser() {
    this.setState({ open: false });
    this.props.deleteUser(this.props.item)
  };

  render() {
    return (
      <div>
        <DeleteIcon variant="outlined" color="primary" onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete user
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
          </Button>
            <Button onClick={this.deleteUser} color="primary" autoFocus>
              Delete
          </Button>
          </DialogActions>
        </Dialog>
      </div >
    );
  }
}
export default DeleteDialog