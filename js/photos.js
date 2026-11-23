// Góc Ảnh Kỷ Niệm: up to 6 photos Ngọc picks, shrunk and kept ONLY on this device (IndexedDB), never uploaded and never in
// the repo (GitHub Pages is public). The room hangs the newest 3 as tiny polaroids (getRoomThumbs) and tapping them opens
// #modalPhotos (open). Captions are user text: always textContent. The save code (Sao lưu) does not carry photos.
window.PhotoWall = (() => {
  const DB_NAME = "hu_keo_photos";
  const STORE = "photos";
  const MAX_PHOTOS = 6;
  const MAX_SIDE = 480; // stored size (JPEG), enough for the viewer
  const THUMB_W = 11; // room polaroid photo area
  const THUMB_H = 9;

  let photos = []; // [{ id, createdAt, caption, image }] newest first
  let thumbs = []; // tiny canvases for the room, same order as photos
  let currentId = null;
  let dbPromise = null;

  function openDb() {
    if (!dbPromise) {
      dbPromise = new Promise((resolve, reject) => {
        if (!window.indexedDB) {
          reject(new Error("no indexedDB"));
          return;
        }
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }
    return dbPromise;
  }

  function tx(mode, fn) {
    return openDb().then((db) => new Promise((resolve, reject) => {
      const t = db.transaction(STORE, mode);
      const result = fn(t.objectStore(STORE));
      t.oncomplete = () => resolve(result && "result" in result ? result.result : undefined);
      t.onerror = () => reject(t.error);
    }));
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("image decode failed"));
      img.src = src;
    });
  }

  // Centre-crop to the polaroid's aspect and shrink to THUMB_W × THUMB_H (smoothing on, so it reads as a tiny photo)
  function makeThumb(img) {
    const c = document.createElement("canvas");
    c.width = THUMB_W;
    c.height = THUMB_H;
    const g = c.getContext("2d");
    g.imageSmoothingEnabled = true;
    const want = THUMB_W / THUMB_H;
    let sw = img.width;
    let sh = img.height;
    if (sw / sh > want) sw = sh * want;
    else sh = sw / want;
    g.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, THUMB_W, THUMB_H);
    return c;
  }

  async function refresh() {
    try {
      const all = (await tx("readonly", (s) => s.getAll())) || [];
      photos = all.sort((a, b) => b.createdAt - a.createdAt);
    } catch {
      photos = [];
    }
    thumbs = [];
    for (const p of photos.slice(0, 3)) {
      try {
        thumbs.push(makeThumb(await loadImage(p.image)));
      } catch {
        thumbs.push(null);
      }
    }
    render();
  }

  // Shrinks any image blob to MAX_SIDE JPEG and stores it. Returns the new id (or null if full / unreadable).
  async function addFromBlob(blob) {
    if (photos.length >= MAX_PHOTOS) {
      if (window.showToast) window.showToast(`Tường treo tối đa ${MAX_PHOTOS} ảnh thôi, em gỡ bớt một tấm rồi thêm nha 📷`);
      return null;
    }
    const url = URL.createObjectURL(blob);
    let img;
    try {
      img = await loadImage(url);
    } catch {
      if (window.showToast) window.showToast("Ảnh này máy không đọc được, em chọn ảnh khác nha 🙏");
      return null;
    } finally {
      URL.revokeObjectURL(url);
    }
    const scale = Math.min(1, MAX_SIDE / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(img.width * scale));
    c.height = Math.max(1, Math.round(img.height * scale));
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    const rec = { id: `p${Date.now()}${Math.floor(Math.random() * 1000)}`, createdAt: Date.now(), caption: "", image: c.toDataURL("image/jpeg", 0.82) };
    try {
      await tx("readwrite", (s) => s.put(rec));
    } catch {
      if (window.showToast) window.showToast("Máy hết chỗ lưu ảnh rồi, em gỡ bớt ảnh cũ nha 🙏");
      return null;
    }
    await refresh();
    return rec.id;
  }

  async function remove(id) {
    try {
      await tx("readwrite", (s) => s.delete(id));
    } catch {
      // ignore: the list is re-read below either way
    }
    await refresh();
  }

  async function setCaption(id, caption) {
    const rec = photos.find((p) => p.id === id);
    if (!rec) return;
    rec.caption = caption.slice(0, 60);
    try {
      await tx("readwrite", (s) => s.put(rec));
    } catch {
      // keep the in-memory caption; it will be lost on reload if storage failed
    }
  }

  // ---------- modal UI ----------
  const $ = (id) => document.getElementById(id);

  function render() {
    const grid = $("photoGrid");
    if (!grid) return;
    grid.textContent = "";
    if (!photos.length) {
      const empty = document.createElement("p");
      empty.className = "photo-empty";
      empty.textContent = "Chưa có tấm ảnh nào. Bấm “Thêm ảnh” để treo ảnh hai đứa lên tường nha 💕";
      grid.appendChild(empty);
    }
    photos.forEach((p) => {
      const btn = document.createElement("button");
      btn.className = "photo-tile pixel-btn btn-cream";
      btn.setAttribute("aria-label", p.caption ? `Xem ảnh: ${p.caption}` : "Xem ảnh");
      const img = document.createElement("img");
      img.src = p.image;
      img.alt = "";
      const cap = document.createElement("span");
      cap.className = "photo-tile-cap";
      cap.textContent = p.caption || new Date(p.createdAt).toLocaleDateString("vi-VN");
      btn.append(img, cap);
      btn.addEventListener("click", () => showViewer(p.id));
      grid.appendChild(btn);
    });
    $("photoCount").textContent = `${photos.length}/${MAX_PHOTOS}`;
    $("photoAddLabel").classList.toggle("disabled", photos.length >= MAX_PHOTOS);
  }

  function showViewer(id) {
    const p = photos.find((x) => x.id === id);
    if (!p) return;
    currentId = id;
    $("photoViewerImg").src = p.image;
    $("photoCaption").value = p.caption || "";
    $("photoViewer").classList.remove("hidden");
    $("photoGrid").classList.add("hidden");
  }

  function hideViewer() {
    currentId = null;
    $("photoViewer").classList.add("hidden");
    $("photoGrid").classList.remove("hidden");
  }

  function open() {
    hideViewer();
    render();
    if (window.openAppModal) window.openAppModal("modalPhotos");
  }

  function init() {
    $("photoInput").addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      e.target.value = "";
      if (!file) return;
      const id = await addFromBlob(file);
      if (id && window.showToast) window.showToast("📷 Đã treo ảnh lên tường phòng rồi nè!");
    });
    $("btnPhotoBack").addEventListener("click", hideViewer);
    $("btnPhotoSaveCaption").addEventListener("click", async () => {
      if (!currentId) return;
      await setCaption(currentId, $("photoCaption").value.trim());
      render();
      if (window.showToast) window.showToast("💾 Đã lưu ghi chú cho ảnh");
    });
    $("btnPhotoDelete").addEventListener("click", async () => {
      if (!currentId) return;
      if (!confirm("Gỡ ảnh này khỏi tường? (Ảnh gốc trong máy em vẫn còn nguyên)")) return;
      await remove(currentId);
      hideViewer();
    });
    refresh();
  }

  return {
    init,
    open,
    addFromBlob,
    remove,
    getRoomThumbs: () => thumbs,
    count: () => photos.length,
    MAX_PHOTOS
  };
})();
