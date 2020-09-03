
import React from 'react';
import "./App.css";
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import CreateDialog from "./CreateDialog";
import { user_fetch_requested, delete_user, create_user, edit_user } from "./action/action";
import DeleteDialog from "../src/DeleteDialog"
import EditDialog from "../src/EditDialog"
import { Lines } from 'react-preloaders';



const columns = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'name', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 170, align: 'right' },
  { id: 'colour', label: 'Colour', minWidth: 170, align: 'right' },
  { id: 'status', label: 'Status', minWidth: 170, align: 'right' },
];

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      page: 0,
      rowsPerPage: 10,
      data: [],
      isloading: false
    }
    this.deleteUser = this.deleteUser.bind(this)
    this.addUser = this.addUser.bind(this)
    this.editUser = this.editUser.bind(this)
    this.handleChangePage = this.handleChangePage.bind(this)
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
  };

  componentDidMount() {
    this.props.user_fetch_requested()
  };

  componentWillReceiveProps(nextProps) {
    const newValue = nextProps.user;
    if (newValue !== this.props.user.length)
      this.setState({ data: newValue })
  };

  renderIcons(row) {
    return (
      <div className="icons">
        <DeleteDialog deleteUser={this.deleteUser} item={row} />
       &nbsp; &nbsp;
        <EditDialog editUser={this.editUser} item={row} />
      </div>
    )
  };

  deleteUser(row) {
    this.setState({ isloading: true }, () => {
      this.props.delete_user(row)
      if (this.props.user.length >= 0) {
        setTimeout(() => {
          this.setState({ isloading: false })
        }, 2000)
      }
    });
  }

  editUser(row) {
    this.setState({ isloading: true }, () => {
      this.props.edit_user(row);
      if (this.props.user.length >= 0) {
        setTimeout(() => {
          this.setState({ isloading: false })
        }, 2000)
      }
    });
  }

  addUser(user) {
    this.setState({ isloading: true }, () => {
      this.props.created_user(user);
      if (this.props.user.length >= 0) {
        setTimeout(() => {
          this.setState({ isloading: false })
        }, 2000)
      }
    });
  }


  createData(id, name, age, colour) {
    return { id, name, age, colour };
  }

  handleChangePage(event, newPage) {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage(event) {
    this.setState({ rowsPerPage: event.target.value });
    this.setState({ page: 0 });
  };

  render() {
    return (
      <>
        <div className="form-table">
        <p className="label">WELCOME TO CRM TABLE</p>
          <div className="button">
            <CreateDialog addUser={this.addUser} />
          </div>
          <div className="table">
            <Paper className={"root"}>
              <TableContainer className={"container"}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {this.state.data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                        return (
                          this.state.isloading ? <Lines customLoading={this.state.loading} /> :
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {value}
                                  {column.id === "status" ? this.renderIcons(row) : ""}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={this.state.data.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return state.myReducer;
},
  mapDispatchToProps = (dispatch) => {
    return {
      "user_fetch_requested": () => dispatch(user_fetch_requested()),
      "delete_user": (user) => dispatch(delete_user(user)),
      "created_user": (user) => dispatch(create_user(user)),
      "edit_user": (user) => dispatch(edit_user(user))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
