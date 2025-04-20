export const Stats = ({ items }) => {
  if (!items.length) return <p className="stats">Start Adding items 📜</p>;

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const packedPercent = Math.round(numPacked / numItems * 100);
  return (
    <footer className="stats">
      {packedPercent == 100 ? <em>All Packed Ready to go 🚀</em> : <em>You have {numItems} items on your list, and you have packed {numPacked} ({packedPercent}%)
      </em>}
    </footer>
  );
};
