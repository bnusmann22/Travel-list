import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

function App() {
  const [items , setItems]= useState(initialItems)

  const handleAddItems= (item) =>{
    setItems((items) => [...items, item])
  }

  const handleDeleteItem =(id)=>{
    console.log(id);
    
    setItems(items => items.filter(item => item.id !== id))
  }

  const handleToggle =(id)=>{
    setItems(items => items.map(item => item.id == id ? {...item, packed: !item.packed} : item))
  } 

  const handleClearList =()=>{
    if(items.length === 0){window.alert("No items to delete")}else{
      const confirmed = window.confirm("Are you sure you want to delete all items")
      if(confirmed)setItems([])
    }
  }
  return (
    <div className="app">
     <Logo/>
     < Form onAddItem={handleAddItems}/>
     < PackingList items = {items} onDeleteItem ={handleDeleteItem} onToggle={handleToggle} onclearList={handleClearList}/>
     < Stats items ={items}/>
    </div>
  )
}

export default App


