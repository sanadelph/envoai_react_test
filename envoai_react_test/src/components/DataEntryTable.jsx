import { useState, useEffect } from 'react'
import './DataEntryTable.css'
import useMediaQuery from '../../utils/useMediaQuery'
import DataTable from './DataTable'

function DataEntryTable() {
  const [matchesMd, matchesSm] = useMediaQuery()
  // console.log(matchesMd);
  

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    phone: ''
  })
  
  const [entries, setEntries] = useState([])

  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    const savedData = localStorage.getItem('userEntries')
    if (savedData) {
      try {
        setEntries(JSON.parse(savedData))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
  }, [])

  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('userEntries', JSON.stringify(entries))
    }
  }, [entries])

  /***
   * handle input changes on entry form, modify form data accordingly
  ***/
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  /***
   * handle form submit event
  ***/
  const handleSubmit = (e) => {
    e.preventDefault()
    // basic form validation
    if (!formData.name || !formData.email || !formData.department || !formData.phone) {
      alert('Please fill in all fields')
      return
    }

    const newEntry = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toLocaleString()
    }

    setEntries(prev => [...prev, newEntry])
    // reset values
    setFormData({
      name: '',
      email: '',
      department: '',
      phone: ''
    })
  }

  /***
   * reset entry list
  ***/
  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all entries?')) {
      setEntries([])
      localStorage.removeItem('userEntries')
    }
  }

  return (
    <div className="data-entry-container">
      <div className='data-entry-header-container'>
        <div className='data-entry-header'>
          <h3>User Data Entry Form</h3>
          <p className="subtitle">Enter 4 parameters and save to local database</p>
        </div>
          {matchesMd && !matchesSm && <button onClick={() => setIsOpen(true)}>Saved Entries</button>}
      </div>
      
      <form onSubmit={handleSubmit} className="entry-form">
          <label htmlFor="name" className='input-wrapper'>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder=""
            />
            <span className='label'>Name </span>
            {/* <span className='focus-bg'></span> */}
          </label>

            <label htmlFor="email" className='input-wrapper'>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder=""
              />
              <span className='label'>Email </span>
              {/* <span className='focus-bg'></span> */}
            </label>

            <label htmlFor="department" className='input-wrapper'>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder=""
              />
              <span className='label'>Department </span>
              {/* <span className='focus-bg'></span> */}
            </label>

            <label htmlFor="phone" className='input-wrapper'>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder=""
              />
              <span className='label'>Phone</span>
              {/* <span className='focus-bg'></span> */}
            </label>
          <button type="submit">Add Entry</button>
      </form>
      {matchesSm && <button onClick={() => setIsOpen(true)}>View Saved Entries</button>}

      <div className="entries-section">

        {isOpen ? (
          <>
          <div className='backdrop' onClick={() => setIsOpen(false)}></div>
            <div className='dialog'>
              <div className='dialog-header'>
                <h4>Saved Entries ({entries.length})</h4>
                {entries.length > 0 && (
                  <button onClick={handleClearAll} className="clear-btn">
                    Clear All
                  </button>
                )}
              </div>
              {entries.length === 0 ? (
              <p className="no-entries">No entries yet. Add some data above.</p>
            ) : (
              <DataTable tableColumns={
                ['Name', 
                'Email', 
                'Department', 
                'Phone', 
                'Added', 
                'Action']} 
                entries={entries} 
                setEntries={setEntries}
              />
        )}
          <button
            className="close-button"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
        </>
        ) : null}

        {!matchesMd && (
          <div className='saved-entries-header'>
            <h4>Saved Entries ({entries.length})</h4>
            {entries.length > 0 && (
              <button onClick={handleClearAll} className="clear-btn">
                Clear All
              </button>
            )}
          </div>
        )}

        {!matchesMd ? entries.length === 0 ? (
          <p className="no-entries">No entries yet. Add some data above.</p>
        ) : (
          <DataTable tableColumns={
            ['Name', 
            'Email', 
            'Department', 
            'Phone', 
            'Added', 
            'Action']} 
            entries={entries}
            setEntries={setEntries}
          />
        ) : null}
      </div>
    </div>
  )
}

export default DataEntryTable

