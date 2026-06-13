/* ============================================================================
   App — renderiza la grilla y maneja el modal de descarga con email.
   (No necesitás editar este archivo para agregar documentos: usá documentos.js)
   ============================================================================ */

(function () {
  "use strict";

  const grid   = document.getElementById("grid");
  const countEl = document.getElementById("count");

  const SVG_DL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M5 21h14"/></svg>';
  const SVG_CHECK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 13 4 4L19 7"/></svg>';

  const tone = (n) => `var(--cover-${(((n || 1) - 1) % 4) + 1})`;

  /* ---- Render de la grilla ------------------------------------------------ */
  function render() {
    countEl.textContent =
      DOCUMENTOS.length + (DOCUMENTOS.length === 1 ? " documento" : " documentos");

    grid.innerHTML = "";
    DOCUMENTOS.forEach((doc, i) => {
      const card = document.createElement("article");
      card.className = "card";
      card.style.animationDelay = i * 70 + "ms";

      card.innerHTML = `
        <div class="cover" style="background:${tone(doc.tono)}">
          <span class="cat">${esc(doc.categoria || "PDF")}</span>
          <span class="num">${String(i + 1).padStart(2, "0")}</span>
          <h2 class="ctitle">${esc(doc.titulo)}</h2>
          <div class="rule"></div>
          <div class="cfoot">
            <span><span class="dot"></span>${esc(doc.paginas || "PDF")}</span>
            <span class="pdf-badge">PDF</span>
          </div>
        </div>
        <div class="card-body">
          <p>${esc(doc.descripcion || "")}</p>
          <div class="card-foot">
            <span class="card-meta">Descarga gratuita</span>
            <button class="btn-dl" type="button">${SVG_DL}<span>Descargar</span></button>
          </div>
        </div>`;

      card.querySelector(".btn-dl").addEventListener("click", () => requestDownload(doc));
      grid.appendChild(card);
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );
  }

  /* ---- Flujo de descarga -------------------------------------------------- */
  const STORE_KEY = "gl_suscriptor";

  function isSubscribed() {
    try { return !!localStorage.getItem(STORE_KEY); } catch (e) { return false; }
  }

  function requestDownload(doc) {
    // Si ya dejó el email antes, descarga directo (no lo molestamos de nuevo).
    if (isSubscribed()) {
      startDownload(doc);
      toast("Descargando “" + doc.titulo + "”");
      return;
    }
    openModal(doc);
  }

  function startDownload(doc) {
    const a = document.createElement("a");
    a.href = doc.archivo;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  /* ---- Modal -------------------------------------------------------------- */
  const backdrop = document.getElementById("modal-backdrop");
  const modal    = document.getElementById("modal");
  const form     = document.getElementById("subscribe-form");
  const nameIn   = document.getElementById("f-name");
  const emailIn  = document.getElementById("f-email");
  const emailField = document.getElementById("field-email");
  const modalTitle = document.getElementById("modal-title");
  const closeBtn = document.getElementById("modal-close");

  let pendingDoc = null;

  function openModal(doc) {
    pendingDoc = doc;
    modal.classList.remove("done");
    emailField.classList.remove("invalid");
    modalTitle.textContent = "Descargá “" + doc.titulo + "”";
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(() => emailIn.focus(), 280);
  }

  function closeModal() {
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    pendingDoc = null;
  }

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closeModal(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailIn.value.trim();
    const name  = nameIn.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      emailField.classList.add("invalid");
      emailIn.focus();
      return;
    }

    // Guardamos el suscriptor.  ⬇️  Mirá la nota al final del archivo para
    // conectar esto con tu lista de correo real (Formspree, Mailchimp, etc.)
    saveSubscriber({ nombre: name, email: email, documento: pendingDoc.titulo });

    // Éxito + descarga
    modal.classList.add("done");
    startDownload(pendingDoc);
  });

  emailIn.addEventListener("input", () => emailField.classList.remove("invalid"));

  document.getElementById("again").addEventListener("click", closeModal);

  /* ---- Guardado del suscriptor ------------------------------------------- */
  function saveSubscriber(data) {
    const entry = { ...data, fecha: new Date().toISOString() };

    // 1) Guardado local (para que no le pidamos el email otra vez en este equipo)
    try {
      localStorage.setItem(STORE_KEY, data.email);
      const list = JSON.parse(localStorage.getItem("gl_suscriptores") || "[]");
      list.push(entry);
      localStorage.setItem("gl_suscriptores", JSON.stringify(list));
    } catch (e) {}

    // 2) ⬇️ PARA RECIBIR LOS EMAILS DE VERDAD: descomentá y poné tu endpoint.
    //    Por ejemplo con Formspree (gratis): https://formspree.io
    //
    // fetch("https://formspree.io/f/TU_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json", "Accept": "application/json" },
    //   body: JSON.stringify(entry),
    // });
  }

  /* ---- Toast -------------------------------------------------------------- */
  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById("toast");
    el.querySelector("span").textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  render();
})();
