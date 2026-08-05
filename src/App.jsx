import Header from "./components/Header";
import AnalysisPage from "./components/AnalysisPage";
import DataManager from "./components/DataManager";
import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./lib/supabase";

function App() {
  const [number, setNumber] = useState("");
  const [activePage, setActivePage] = useState("analysis");

  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("hitScopeHistory");
    if (savedHistory) {
      return JSON.parse(savedHistory);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("hitScopeHistory", JSON.stringify(history));
  }, [history]);

  const onlyNumber = (text) => {
    return text.replace(/[^0-9]/g, "");
  };

  const getPattern = (number) => {
    return number
      .split("")
      .map((digit) => (Number(digit) <= 4 ? "L" : "H"))
      .join("");
  };

async function getOrCreateUser() {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("セッション取得エラー:", sessionError);
  }

  if (session?.user) {
    return session.user;
  }

  const {
    data,
    error: authError,
  } = await supabase.auth.signInAnonymously();

  if (authError) {
    console.error("匿名ログインエラー:", authError);
    return null;
  }

  return data.user;
}

async function getOrCreateUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    return session.user;
  }

  const {
    data,
    error,
  } = await supabase.auth.signInAnonymously();

  if (error) {
    console.error(error);
    return null;
  }

  return data.user;
}

async function addNumber() {
  if (number.length !== 3) {
    alert("3桁入力してください！");
    return;
  }

  if (new Set(number.split("")).size !== 3) {
    alert("同じ数字は使えません！");
    return;
  }

  // 匿名ユーザー取得
  const user = await getOrCreateUser();

if (!user) {
  alert("ユーザー情報を取得できませんでした！");
  return;
}

  const { error } = await supabase
    .from("games")
    .insert([
      {
        number: number,
        source: "web",
        user_id: user.id, // ←追加！！
      },
    ]);

  if (error) {
    console.error("Supabase保存エラー:", error);
    alert(`保存に失敗しました！ ${error.message}`);
    return;
  }

  await loadHistory();
  setNumber("");
}
useEffect(() => {
  loadHistory();
}, []);

async function loadHistory() {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  setHistory(
    data.map((item) => ({
      id: item.id,
      number: item.number,
      pattern: getPattern(item.number),
      date: item.created_at,
    }))
  );
}

async function deleteHistory(id) {
  const user = await getOrCreateUser();

  if (!user) {
    alert("ユーザー情報を取得できませんでした！");
    return;
  }

  const confirmed = window.confirm(
    "このデータを完全に削除しますか？"
  );

  if (!confirmed) {
    return;
  }

  const { data: deletedRows, error } = await supabase
    .from("games")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) {
    console.error("削除エラー:", error);
    alert(`削除に失敗しました！${error.message}`);
    return;
  }

  if (!deletedRows || deletedRows.length === 0) {
    alert("このデータは自分が登録したものではないため削除できません！");
    await loadHistory();
    return;
  }

  await loadHistory();
}

return (
    <div className="container">
      <Header />
      <div className="page-switcher">
        <button
  className={activePage === "data" ? "active" : ""}
  onClick={() => setActivePage("data")}
>
  📥 データ管理
</button>

<button
  className={activePage === "analysis" ? "active" : ""}
  onClick={() => setActivePage("analysis")}
>
  📊 分析
</button>
      </div>

      {activePage === "data" ? (
        <DataManager
          number={number}
          setNumber={setNumber}
          onlyNumber={onlyNumber}
          addNumber={addNumber}
          history={history}
          setHistory={setHistory}
          deleteHistory={deleteHistory}
        />
      ) : (
        <AnalysisPage history={history} />
      )}
    </div>
  );
}

export default App;
