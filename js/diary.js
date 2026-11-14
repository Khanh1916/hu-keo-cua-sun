/**
 * Daily Couple Intimacy Diary & Question Engine (phong cách SumOne)
 * Khanh & Ngoc share daily thoughts, bonding questions, and romantic memory log.
 */
window.DiaryApp = (() => {
  let getStateFn = null;
  let saveStateFn = null;
  let addRewardsFn = null;
  let showSpeechFn = null;
  let selectedTags = new Set();
  let currentActiveTab = "today";

  function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function getTodayQuestion() {
    const list = (window.DATA && DATA.coupleQuestions) ? DATA.coupleQuestions : [];
    if (!list.length) {
      return {
        id: 1,
        text: "Hôm nay em có yêu anh nhiều hơn ngày hôm qua một chút xíu nào không nè?",
        defaultTags: ["Nhiều hơn hôm qua 💕", "Nhớ anh nhiều", "Cần cái ôm", "Yêu vô cùng"]
      };
    }
    const dayIndex = Math.floor((Date.now() - new Date("2024-02-11").getTime()) / (1000 * 60 * 60 * 24));
    const idx = Math.abs(dayIndex) % list.length;
    return list[idx];
  }

  function init({ getState, saveState, addRewards, showSpeech }) {
    getStateFn = getState;
    saveStateFn = saveState;
    addRewardsFn = addRewards;
    showSpeechFn = showSpeech;

    bindUI();
    renderWidget();
  }

  function bindUI() {
    const btnOpen = document.getElementById("btnOpenDiaryModal");
    if (btnOpen) {
      btnOpen.addEventListener("click", () => openModal("today"));
    }
    const btnHistory = document.getElementById("btnOpenDiaryHistory");
    if (btnHistory) {
      btnHistory.addEventListener("click", () => openModal("list"));
    }
    const btnEdit = document.getElementById("btnEditTodayDiary");
    if (btnEdit) {
      btnEdit.addEventListener("click", () => openModal("today"));
    }

    const tabToday = document.getElementById("tabDiaryToday");
    const tabList = document.getElementById("tabDiaryList");
    if (tabToday) {
      tabToday.addEventListener("click", () => switchTab("today"));
    }
    if (tabList) {
      tabList.addEventListener("click", () => switchTab("list"));
    }

    const textarea = document.getElementById("diaryInputText");
    const charCount = document.getElementById("diaryCharCount");
    if (textarea && charCount) {
      textarea.addEventListener("input", () => {
        charCount.textContent = `${textarea.value.length}/300`;
      });
    }

    const btnSubmit = document.getElementById("btnSubmitDiary");
    if (btnSubmit) {
      btnSubmit.addEventListener("click", handleSubmit);
    }
  }

  function openModal(tab = "today") {
    const modal = document.getElementById("modalDiary");
    if (!modal) return;
    modal.classList.remove("hidden");
    switchTab(tab);
  }

  function switchTab(tab) {
    currentActiveTab = tab;
    const tabToday = document.getElementById("tabDiaryToday");
    const tabList = document.getElementById("tabDiaryList");
    const contentToday = document.getElementById("diaryTabTodayContent");
    const contentList = document.getElementById("diaryTabListContent");

    if (tabToday && tabList) {
      tabToday.classList.toggle("active", tab === "today");
      tabList.classList.toggle("active", tab === "list");
    }
    if (contentToday && contentList) {
      contentToday.classList.toggle("hidden", tab !== "today");
      contentList.classList.toggle("hidden", tab !== "list");
    }

    if (tab === "today") {
      renderTodayForm();
    } else {
      renderHistoryList();
    }
  }

  function renderWidget() {
    const state = getStateFn ? getStateFn() : {};
    const diary = state.coupleDiary || {};
    const todayKey = getTodayKey();
    const entry = diary[todayKey];
    const q = getTodayQuestion();

    const qText = document.getElementById("cdsQuestionText");
    if (qText) qText.textContent = `"${q.text}"`;

    const tag = document.getElementById("cdsStatusTag");
    const actionArea = document.getElementById("cdsActionArea");
    const answeredBox = document.getElementById("cdsAnsweredBox");
    const answerQuote = document.getElementById("cdsAnswerQuote");

    if (entry && entry.answer) {
      if (tag) {
        tag.textContent = "Đã viết ✓";
        tag.className = "cds-status-tag completed";
      }
      if (actionArea) actionArea.classList.add("hidden");
      if (answeredBox) answeredBox.classList.remove("hidden");
      if (answerQuote) {
        const tagsHtml = (entry.tags && entry.tags.length) 
          ? `<div class="cds-tags-preview">${entry.tags.map(t => `<span class="cds-tag-chip">${t}</span>`).join(" ")}</div>` 
          : "";
        answerQuote.innerHTML = `"${entry.answer}"${tagsHtml}`;
      }
    } else {
      if (tag) {
        tag.textContent = "Chưa viết";
        tag.className = "cds-status-tag";
      }
      if (actionArea) actionArea.classList.remove("hidden");
      if (answeredBox) answeredBox.classList.add("hidden");
    }
  }

  function renderTodayForm() {
    const state = getStateFn ? getStateFn() : {};
    const diary = state.coupleDiary || {};
    const todayKey = getTodayKey();
    const entry = diary[todayKey] || {};
    const q = getTodayQuestion();

    const title = document.getElementById("dqhQuestionTitle");
    if (title) title.textContent = `"${q.text}"`;

    const dayBadge = document.getElementById("dqhDayBadge");
    if (dayBadge) {
      const parts = todayKey.split("-");
      dayBadge.textContent = `📅 Ngày ${parts[2]}/${parts[1]}/${parts[0]} • Câu hỏi #${q.id}`;
    }

    selectedTags = new Set(entry.tags || []);

    const tagsContainer = document.getElementById("diaryQuickTags");
    if (tagsContainer) {
      const defaultTags = q.defaultTags || ["Rất nhớ anh", "Muốn được ôm", "Hạnh phúc lắm", "Cùng cố gắng"];
      tagsContainer.innerHTML = defaultTags.map(tag => {
        const isSelected = selectedTags.has(tag);
        return `<button type="button" class="diary-tag-pill ${isSelected ? "selected" : ""}" data-tag="${tag}">${tag}</button>`;
      }).join("");

      tagsContainer.querySelectorAll(".diary-tag-pill").forEach(btn => {
        btn.addEventListener("click", () => {
          const t = btn.getAttribute("data-tag");
          if (selectedTags.has(t)) {
            selectedTags.delete(t);
            btn.classList.remove("selected");
          } else {
            selectedTags.add(t);
            btn.classList.add("selected");
          }
          if (window.AudioManager) AudioManager.playClick();
        });
      });
    }

    const textarea = document.getElementById("diaryInputText");
    const charCount = document.getElementById("diaryCharCount");
    if (textarea) {
      textarea.value = entry.answer || "";
      if (charCount) charCount.textContent = `${textarea.value.length}/300`;
    }
  }

  function handleSubmit() {
    const textarea = document.getElementById("diaryInputText");
    const text = textarea ? textarea.value.trim() : "";
    const tags = Array.from(selectedTags);

    if (!text && tags.length === 0) {
      if (window.showToast) window.showToast("Em hãy viết vài lời hoặc chọn một cảm xúc nhé 💕");
      return;
    }

    const state = getStateFn ? getStateFn() : {};
    state.coupleDiary = state.coupleDiary || {};
    const todayKey = getTodayKey();
    const isNew = !state.coupleDiary[todayKey] || !state.coupleDiary[todayKey].answer;
    const q = getTodayQuestion();

    state.coupleDiary[todayKey] = {
      questionId: q.id,
      questionText: q.text,
      answer: text || tags.join(" • "),
      tags: tags,
      answeredAt: Date.now()
    };

    if (saveStateFn) saveStateFn();

    if (isNew && addRewardsFn) {
      addRewardsFn(3, 15);
      if (window.AudioManager) AudioManager.playCelebration();
    } else {
      if (window.AudioManager) AudioManager.playCandy();
    }

    if (window.RoomScene) {
      RoomScene.triggerKhanhHappy("happy");
      for (let i = 0; i < 5; i++) {
        setTimeout(() => RoomScene.spawnHeart(120, 100), i * 120);
      }
    }

    const sweetReplies = [
      "Anh đọc được lời nhắn của Ngọc rồi nè, ấm lòng quá đi! Thương em nhiều 💕",
      "Cảm ơn em đã chia sẻ cùng anh nhé, từng dòng chữ của em đều quý giá lắm ✨",
      "Nhận được tâm tình của công chúa rồi, anh yêu em nhiều hơn mỗi ngày 💖",
      "Anh đã lưu lại vào cuốn sổ tình yêu của hai đứa mình rồi nè 🥰"
    ];
    const reply = sweetReplies[Math.floor(Math.random() * sweetReplies.length)];
    if (showSpeechFn) showSpeechFn("Anh Khánh 💕", reply);

    renderWidget();

    // Close modal
    const modal = document.getElementById("modalDiary");
    if (modal) modal.classList.add("hidden");

    if (window.showToast) {
      window.showToast(isNew ? "Đã gửi tâm tình cho anh! +3 🍬 & +15 XP 💕" : "Đã cập nhật tâm tình hôm nay! 💕");
    }
  }

  function renderHistoryList() {
    const listContainer = document.getElementById("diaryHistoryList");
    if (!listContainer) return;

    const state = getStateFn ? getStateFn() : {};
    const diary = state.coupleDiary || {};
    const keys = Object.keys(diary).sort().reverse();

    if (keys.length === 0) {
      listContainer.innerHTML = `
        <div class="diary-empty-view">
          <div style="font-size: 38px; margin-bottom: 8px;">📖</div>
          <h4>Chưa có trang nhật ký nào</h4>
          <p>Mỗi ngày em viết một câu trả lời, góc nhỏ này sẽ lưu lại thành cuốn kỷ niệm tình yêu của hai đứa mình nhé 💕</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = keys.map(k => {
      const entry = diary[k];
      const parts = k.split("-");
      const dateDisplay = `${parts[2]}/${parts[1]}/${parts[0]}`;
      const tagsHtml = (entry.tags && entry.tags.length)
        ? `<div class="dh-item-tags">${entry.tags.map(t => `<span class="dh-tag">${t}</span>`).join(" ")}</div>`
        : "";

      return `
        <div class="diary-history-item">
          <div class="dh-item-header">
            <span class="dh-date">📅 ${dateDisplay}</span>
            <span class="dh-check">Đã gửi anh ✓</span>
          </div>
          <div class="dh-question">❓ ${entry.questionText || "Tâm tình hôm nay"}</div>
          <div class="dh-answer">💬 "${entry.answer}"</div>
          ${tagsHtml}
        </div>
      `;
    }).join("");
  }

  return {
    init,
    openModal,
    renderWidget,
    switchTab
  };
})();
