import { useState, useEffect } from 'react'
import './BugHunt.css'

function BugHunt() {
  const [counter, setCounter] = useState(0)
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 10, quantity: 1 },
    { id: 2, name: 'Item 2', price: 20, quantity: 2 },
    { id: 3, name: 'Item 3', price: 15, quantity: 1 }
  ])
  const [discount, setDiscount] = useState(0)
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // setCounter(counter + 1); INCORRECT

    /***** EXPLANATION -- BUG 1 *****/
    // The error "Maximum update depth exceeded" was caused by
    // the improper state management in useEffect(), when counter
    // state is updated a new re-render of the component is triggered
    // causing the useEffect to run again therefore causing an infinite loop
    // problem is solved by using the state setter function
    // since the setter function is a constant value there's no need
    // to add it to the dependencies array
    setCounter(prevCounter => prevCounter + 1)
    
  }, [])

  /***
   * multiply purchased items' price by their quantity and sum them up to
   * get the total value
   * @returns {number} total value of purchased items
  ***/
  const calculateTotal = () => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      // total += items[i].price = items[i].quantity INCORRECT
      /***** EXPLANATION -- BUG 5 *****/

      // in order to calculate the total value of each item, the quantity
      // should be MULTIPLIED by the price. Subsequently, this amount
      // is added to the total value to calculate the final total
      total += items[i].price * items[i].quantity
    }
    return total
  }

  /***
   * apply discount value to the total payable amount
   * @param {number} total value of purchased items
   * @returns {number} total value of purchased items considering any discount
  ***/
  const applyDiscount = (total) => {
    /***** EXPLANATION -- BUG 2 *****/

    // the calculation was not done correctly
    // in order to apply a discount, the following changes were made:
    // 1. the discount is divided by 100
    // 2. total value * discount percentage is subtracted from the total value
    return total - (total * (discount/100))
  }

  /***
   * handle login functionality, once logged in update isLoggedIn state to true
  ***/
  const handleLogin = () => {
    if (username.length < 3) {
      alert('Username must be at least 3 characters')
      return
    }
    /***** EXPLANATION -- BUG 3 *****/
  
    // The state was being updated in the wrong order
    // once the user enters a username which is at least 3 characters long
    // the isLoggedIn state should be set to true,
    // conversely, once the user logs out, the state is set back to false 
    setIsLoggedIn(true)
  }

  /***
   * handle logout functionality, once logged in update isLoggedIn state to false
  ***/
  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername('')
  }

  /***
   * update the quantity of items about to be purchased, in the items state
   * @param {number} id - id of the modified item
   * @param {number} newQuantity - updated quantity of the item
  ***/
  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      /***** EXPLANATION -- BUG 4 *****/

      // when the value of quantity gets updated for each item,
      // the entire item object should be returned, this can be achieved
      // by using the spread operator to return the rest of the object which
      // remained unchanged along with the updated properties
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  /***
   * remove an item from the to be purchased list of items, in the items state
   * @param {number} id - id of the modified item
  ***/
  const removeItem = (id) => {
    // setItems(items.filter(item => item.id == id)) INCORRECT

    /***** EXPLANATION -- BUG 6 *****/

    // after removing each item, the items state refers to
    // every item except the one removed. To achieve this
    // we use filter() and by looking up their ids in the callback function
    // we retrieve the updated items 
    setItems(items.filter(item => item.id !== id))
  }

  const total = calculateTotal()
  const finalTotal = applyDiscount(total)

  return (
    <div className="page-container">
      <h2 className="page-title">Challenge 2: Bug Hunt</h2>
      
      <div className="instructions">
        <h3>Your Task:</h3>
        <ul>
          <li>This page contains <strong>6 logical bugs</strong> that need to be fixed</li>
          <li>The bugs are in the component logic, not in styling</li>
          <li>Test all features to identify what&apos;s not working correctly:</li>
          <ul>
            <li>Counter behavior</li>
            <li>Shopping cart total calculation</li>
            <li>Discount application</li>
            <li>Login/Logout functionality</li>
            <li>Item quantity updates</li>
            <li>Item removal</li>
          </ul>
          <li>Document each bug you find and how you fixed it</li>
        </ul>
      </div>

      <div className="bug-hunt-content">
        {/* Counter Section */}
        <div className="section">
          <h3>Counter Feature</h3>
          <p>Counter: {counter}</p>
          <p className="hint">⚠️ Check the browser console and watch the counter behavior</p>
        </div>

        {/* Login Section */}
        <div className="section">
          <h3>User Login</h3>
          {isLoggedIn ? (
            <div>
              <p>✅ Welcome, {username}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div>
              <p>❌ Please log in</p>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          )}
          <p className="hint">Try logging in with a username (3+ chars)</p>
        </div>

        {/* Shopping Cart Section */}
        <div className="section">
          <h3>Shopping Cart</h3>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                      min="0"
                      style={{ width: '60px' }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="discount-input">
              <label>Discount (%):</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                min="0"
                max="100"
                style={{ width: '80px' }}
              />
            </div>
            
            <div className="total-row final">
              <span>Final Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <p className="hint">
            Try: updating quantities, removing items, and applying a discount
          </p>
        </div>
      </div>

      <div className="bug-documentation">
        <h3>📝 Bug Report Template</h3>
        <p>Document your findings:</p>
        <ol>
          <li><strong>Bug Location:</strong> Where is the bug?</li>
          <li><strong>Expected Behavior:</strong> What should happen?</li>
          <li><strong>Actual Behavior:</strong> What actually happens?</li>
          <li><strong>Fix Applied:</strong> How did you fix it?</li>
        </ol>
      </div>
    </div>
  )
}

export default BugHunt

