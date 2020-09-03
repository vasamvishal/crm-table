class Table extends React.Component{
    render(){
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    console.log("value", value);
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                        {column.id === "status" ? this.renderIcons(row) : ""}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
        }
    }
export default Table