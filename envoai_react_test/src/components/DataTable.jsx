import React from 'react'
import DataTableRow from './DataTableRow'

const DataTable = ({tableColumns, entries, setEntries}) => {
  return (
    <table className="entries-table">
      <thead>
        <tr>
          {tableColumns.map(column => (<th key={column}>{column}</th>))}
          {/* <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Phone</th>
          <th>Added</th>
          <th>Action</th> */}
        </tr>
      </thead>
      <tbody>
        {entries.map(entry => (
          <DataTableRow key={entry.id} entry={entry} setEntries={setEntries}/>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable