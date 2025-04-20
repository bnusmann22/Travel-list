import { useState } from "react";
import { Item } from "./Item";

export const PackingList = ({ items, onDeleteItem, onToggle, onclearList }) => {
  const [sortBy, setSortBy] = useState('input');
  let sortedItem;
  if (sortBy === "input") sortedItem = items;
  if (sortBy === "description") sortedItem = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed") sortedItem = items.slice().sort((a, b) => +(a.packed) - +(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItem.map(item => (<Item item={item} key={item.id} onDeleteItem={onDeleteItem} onToggle={onToggle} />))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed Status</option>
        </select>
        <button onClick={onclearList}>Clear list</button>
      </div>
    </div>
  );
};
