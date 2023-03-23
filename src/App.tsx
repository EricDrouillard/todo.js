import './App.css'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface Todoitem {
  Id: string;
  Name: string;
  Done?: boolean;
}

function App() {
  const [userInput, setUserInput] = useState("")
  const [listItems, setListItems] = useState<Todoitem[]>([])

  const addtodoitem = () => {
    if (userInput === "") {
      return;
    }

    setListItems( // a variable thats value is function.
      (existingItems) => {
          return [ // return a brand new array
          ...existingItems, // with all of the previous todo items
          { Id: uuidv4(), Name: userInput } // and a new item
        ]
      }
    )
    setUserInput("") // clear the user input
  }

  const markDone = (clickedItemId: string) => {
    // 2. we want to update a single item that user has clicked to be done
    // 3. done means `item.Done = true`
    setListItems(existingItems => existingItems.map(existingItem => { // visit an item in the array
      if (existingItem.Id === clickedItemId) { // we only care about the item that was clicked
        existingItem.Done = true; // set the 'Done' property to the value 'true'
      }
      return existingItem; // return that item to the position in the array
    }));
  }

  return (
    <div className="App">
     <h1>My To-Do List</h1>
     <div>
      <input type={"text"} placeholder={"What would you like to do?"} value={userInput} onChange={(event)=>setUserInput(event.currentTarget.value)}/>
      <p><button onClick={addtodoitem}>Add Your Item</button></p>
     </div>
     <div>
      {listItems.map((item: Todoitem) => 
      <p onClick={()=> markDone(item.Id)} key={item.Id}>
        {item.Done ? // inline if statement, a ternary
          <span style={{textDecoration: 'line-through'}}>{item.Name}</span> : 
          item.Name}
      </p>)}
     </div>
    </div>  
  )
}

export default App
