<<<<<<< Updated upstream
import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
=======
// メモの型定義
interface Memo {
  id: string;
  content: string;
}

// ローカルストレージのキー
const STORAGE_KEY = "memos";

// メモリストを表示する関数
const renderMemos = () => {
  const memoList = document.getElementById("memoList") as HTMLUListElement;
  const memoInput = document.getElementById("memoInput") as HTMLTextAreaElement;

  // ローカルストレージからメモを取得
  const savedMemos = localStorage.getItem(STORAGE_KEY);
  const memos: Memo[] = savedMemos ? JSON.parse(savedMemos) : [];

  // メモのリストを描画
  memoList.innerHTML = "";
  memos.forEach((memo) => {
    const li = document.createElement("li");
    li.textContent = memo.content;

    // 編集ボタン
    const editBtn = document.createElement("button");
    editBtn.textContent = "編集";
    editBtn.classList.add("editBtn");
    editBtn.onclick = () => {
      memoInput.value = memo.content;
      deleteMemo(memo.id);  // 編集したメモを削除する（後で再追加するため）
    };

    // 削除ボタン
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => {
      deleteMemo(memo.id);
    };

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    memoList.appendChild(li);
  });
};

// メモを追加する関数
const addMemo = () => {
  const memoInput = document.getElementById("memoInput") as HTMLTextAreaElement;
  const content = memoInput.value.trim();

  if (content === "") {
    alert("メモ内容を入力してください！");
    return;
  }

  const newMemo: Memo = {
    id: Date.now().toString(), // ユニークなIDを生成
    content,
  };

  const savedMemos = localStorage.getItem(STORAGE_KEY);
  const memos: Memo[] = savedMemos ? JSON.parse(savedMemos) : [];

  memos.push(newMemo);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));

  memoInput.value = ""; // 入力欄をクリア
  renderMemos(); // メモリストを再描画
};

// メモを削除する関数
const deleteMemo = (id: string) => {
  const savedMemos = localStorage.getItem(STORAGE_KEY);
  const memos: Memo[] = savedMemos ? JSON.parse(savedMemos) : [];

  const updatedMemos = memos.filter((memo) => memo.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMemos));

  renderMemos(); // メモリストを再描画
};

// イベントリスナー
window.addEventListener("load", renderMemos); // ページロード時にメモを表示

const addMemoBtn = document.getElementById("addMemoBtn") as HTMLButtonElement;
addMemoBtn.addEventListener("click", addMemo);
>>>>>>> Stashed changes
