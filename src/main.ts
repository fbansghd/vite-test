type Memo = {
  id: number;
  content: string;
};

class MemoApp {
  private memos: Memo[] = [];
  private nextId: number = 1;

  constructor() {
    this.initEventListeners();
    this.renderMemos();
  }

  // 新規メモ作成
  createMemo(content: string): void {
    const newMemo: Memo = { id: this.nextId++, content };
    this.memos.push(newMemo);
    this.renderMemos();
  }

  // メモの編集
  editMemo(id: number, newContent: string): void {
    const memo = this.memos.find((m) => m.id === id);
    if (memo) {
      memo.content = newContent;
      this.renderMemos();
    }
  }

  // メモの削除
  deleteMemo(id: number): void {
    this.memos = this.memos.filter((m) => m.id !== id);
    this.renderMemos();
  }

  // メモ一覧を表示
  renderMemos(): void {
    const memoList = document.getElementById("memo-list");
    if (!memoList) return;

    memoList.innerHTML = ""; // リストをクリア

    this.memos.forEach((memo) => {
      const memoDiv = document.createElement("div");
      memoDiv.className = "memo";

      const contentSpan = document.createElement("span");
      contentSpan.textContent = memo.content;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        const newContent = prompt("Edit memo:", memo.content);
        if (newContent !== null) {
          this.editMemo(memo.id, newContent);
        }
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        this.deleteMemo(memo.id);
      });

      memoDiv.appendChild(contentSpan);
      memoDiv.appendChild(editButton);
      memoDiv.appendChild(deleteButton);
      memoList.appendChild(memoDiv);
    });
  }

  // イベントリスナーを初期化
  private initEventListeners(): void {
    const addMemoButton = document.getElementById("add-memo");
    const newMemoContent = document.getElementById(
      "new-memo-content"
    ) as HTMLTextAreaElement;

    if (addMemoButton && newMemoContent) {
      addMemoButton.addEventListener("click", () => {
        const content = newMemoContent.value.trim();
        if (content) {
          this.createMemo(content);
          newMemoContent.value = ""; // テキストエリアをクリア
        }
      });
    }
  }
}

// アプリの初期化
const app = new MemoApp();

