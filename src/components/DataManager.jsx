function DataManager({
  number,
  setNumber,
  onlyNumber,
  addNumber,
  history,
  deleteHistory,
}) {
  return (
    <div>
      <h2>📥 データ管理</h2>

      <input
        value={number}
        onChange={(e) => setNumber(onlyNumber(e.target.value))}
        maxLength={3}
        placeholder="583"
      />

      <button onClick={addNumber}>➕ 登録</button>

      <hr />

      <h2>📋 登録履歴</h2>

      {history.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span>
            {item.number}（{item.pattern}）
          </span>

          <button onClick={() => deleteHistory(item.id)}>
            🗑️ 削除
          </button>
        </div>
      ))}
    </div>
  );
}

export default DataManager;