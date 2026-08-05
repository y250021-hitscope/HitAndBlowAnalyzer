import { useRef } from "react";
import { supabase } from "../lib/supabase";
function DataManager({
  number,
  setNumber,
  onlyNumber,
  addNumber,
  history,
  setHistory,
  deleteHistory,
  currentUserId,
}) {
  const fileInputRef = useRef(null);
  function exportCsv() {
  if (history.length === 0) {
    alert("書き出すデータがありません！");
    return;
  }

  const header = ["number", "pattern", "date"];

  const rows = history.map((item) => [
    item.number,
    item.pattern,
    item.date,
  ]);

  const csvContent = [header, ...rows]
    .map((row) => row.join(","))
    .join("\n");

  const bom = "\uFEFF";
  const blob = new Blob([bom + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `hitscope-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;

  link.click();

  URL.revokeObjectURL(url);
}
function importCsv(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    const text = e.target.result;

    const rows = text.trim().split("\n");

    const newHistory = rows
      .slice(1)
      .map((row) => {
        const [number, pattern, date] = row.split(",");

        return {
          id: Date.now() + Math.random(),
          number,
          pattern,
          date,
        };
      });
if (
  !window.confirm(
    "現在のデータをCSVで上書きしますか？"
  )
) {
  return;
}
    setHistory(newHistory);

    alert(
      `${newHistory.length}件のデータを読み込みました！`
    );
  };

  reader.readAsText(file);
}
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

      <button onClick={exportCsv}>
  📤 CSVに書き出す
</button>

<button
  onClick={() => fileInputRef.current.click()}
>
  📥 CSVを読み込む
</button>
<input
  type="file"
  accept=".csv"
  ref={fileInputRef}
  onChange={importCsv}
  style={{ display: "none" }}
/>

      <hr />

      <h2>📋 登録履歴(最新順)</h2>

      {[...history].reverse().map((item) => (
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

          {item.userId === currentUserId && (
            <button onClick={() => deleteHistory(item.id)}>
              🗑️ 削除
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default DataManager;