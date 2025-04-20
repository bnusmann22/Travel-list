import { useState } from "react";

export const Form = ({ onAddItem }) => {
  const [desc, setDesc] = useState("");
  const [quan, setQuan] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!desc) return;
    const newItem = { 'id': Date.now(), 'description': desc, 'quantity': +quan, 'packed': false };
    console.log(newItem);

    onAddItem(newItem);
    setDesc("");
    setQuan(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you neeed for your trip? </h3>
      <select value={quan} onChange={(e) => setQuan(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>{num}</option>
        )
        )}

      </select>
      <input style={{ cursor: "text" }} type="text" placeholder="Item ..." value={desc} onChange={(e) => setDesc(e.target.value)} />
      <button>add</button>
    </form>
  );
};
