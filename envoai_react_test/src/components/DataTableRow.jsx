import React from 'react'

const DataTableRow = ({entry, setEntries}) => {
  const handleDelete = (id) => {
    setEntries(prev => {
      const updated = prev.filter(entry => entry.id !== id)
      localStorage.setItem('userEntries', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <tr key={entry.id}>
            <td>{entry.name}</td>
            <td>{entry.email}</td>
            <td>{entry.department}</td>
            <td>{entry.phone}</td>
            <td>{entry.timestamp}</td>
            <td>
              <button 
                onClick={() => handleDelete(entry.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
  )
}

export default DataTableRow