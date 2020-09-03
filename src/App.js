
import React from 'react';
import "./def.css";
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CreateDialog from "./CreateDialog";
import { user_fetch_requested, delete_user, create_user } from "./action/action";
import DeleteDialog from "../src/DeleteDialog"
import EditDialog from "../src/EditDialog"
var rows = [];

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
      data: []
    }
    this.deleteUser = this.deleteUser.bind(this)
    this.addUser = this.addUser.bind(this)
  }

  componentDidMount() {
    this.props.user_fetch_requested()
  }

  componentWillReceiveProps(nextProps) { //need to change
    console.log(nextProps);
    const newValue = nextProps.user;
    if (newValue !== this.props.user.length)
      this.setState({ data: newValue }, () => {
        this.rowsCalculator() //need to add logic here
      })
  }

  def(row) {
    console.log(row);
    return (
      <div className="icons">
        <DeleteDialog agent={this.deleteUser} item={row} />
       &nbsp; &nbsp;
        <EditDialog agent={this.editUser} item={row} />
      </div>
    )
  }

  deleteUser(row) {
    this.props.delete_user(row);
  }

  editUser(row) {
    console.log(row);
  }

  addUser(user) {
    this.props.created_user(user);
  }

  createData(id, name, age, colour) {
    return { id, name, age, colour };
  }

  rowsCalculator = () => {
    this.props.user.map(value => {
      var result = this.createData(value._id, value.name, value.age, value.colour)
      rows.push(result);
    })
  }

  handleChangePage(newPage) {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage(event) {
    console.log(event.target.value);
    this.setState({ rowsPerPage: event.target.value });
    this.setState({ page: 0 });
  };

  render() {
    console.log("slice", this.state.data);
    return (
      <div className="form-table">
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          console.log("value", value);
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                              {column.id === "status" ? this.def(row) : ""}
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
              count={rows.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("state", state);
  return state.myReducer;
},
  mapDispatchToProps = (dispatch) => {
    return {
      "user_fetch_requested": () => dispatch(user_fetch_requested()),
      "delete_user": (user) => dispatch(delete_user(user)),
      "created_user": (user) => dispatch(create_user(user))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(App);
