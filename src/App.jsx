import { useState } from "react";
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
  return (
    <div className="app">
     <Logo/>
     < Form onAddItem={handleAddItems}/>
     < PackingList items = {items} onDeleteItem ={handleDeleteItem} onToggle={handleToggle}/>
     < Stats items ={items}/>
    </div>
  )
}

export default App

const Logo =() =>{
  return(
    <h1>🌴 Far Away 💼</h1>
  ) 
}
const Form =({onAddItem}) =>{
  const [desc , setDesc] = useState("")
  const [quan , setQuan] = useState(1)

  function handleSubmit(e) {
   e.preventDefault();
   if (!desc) return;
   const newItem = { 'id': Date.now(), 'description': desc, 'quantity': +quan, 'packed': false };
   console.log(newItem);
   
   onAddItem(newItem)
   setDesc("");
   setQuan(1);
  }
  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you neeed for your trip? </h3>
      <select value={quan} onChange={(e) => setQuan(+e.target.value)}>
        {Array.from({length: 20}, (_, i)=> i + 1).map(num => (
          <option value={num} key ={num}>{num}</option>
        )
        )}
        
      </select>
      <input style = {{cursor: "text"}} type="text" placeholder="Item ..." value={desc} onChange={(e) => setDesc(e.target.value)}/> 
      <button>add</button>
    </form>
  )
}
const PackingList =({items, onDeleteItem, onToggle}) =>{
  return(
    <div className="list">
      <ul>
      {items.map(item => (<Item item={item} key={item.id} onDeleteItem ={onDeleteItem} onToggle={onToggle} />))}
      </ul>

      <div className="actions">
        <select>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed Status</option>
        </select>
      </div>
    </div>
  )
}

const Item = ({item , onDeleteItem, onToggle}) =>{
  return <li>
    <input type="checkbox" value ={item.packed} onChange={() => onToggle(item.id)}/>
    <span style={item.packed ? {textDecoration: "line-through"}: {}}>
    {item.quantity}{" "}
    {item.description}
    </span>
    <button onClick ={() => onDeleteItem(item.id) }>❌</button>
    </li>
}
const Stats =({items}) =>{
  if(!items.length) return <p className="stats">Start Adding items 📜</p>;

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length
  const packedPercent = Math.round(numPacked / numItems * 100) 
  return(
    <footer className="stats">
      {packedPercent == 100 ? <em>All Packed Ready to go 🚀</em> : <em>You have {numItems} items on your list, and you have packed {numPacked} ({packedPercent}%)
      </em>}
      </footer>
  )
}