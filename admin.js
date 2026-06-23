const login = document.getElementById("adminLogin");
const panel = document.getElementById("adminPanel");
const tokenInput = document.getElementById("adminToken");
const loadButton = document.getElementById("loadButton");
const refreshButton = document.getElementById("refreshButton");
const exportButton = document.getElementById("exportButton");
const searchInput = document.getElementById("searchInput");
const errorBox = document.getElementById("adminError");
const responsesBody = document.getElementById("responsesBody");

const totalCount = document.getElementById("totalCount");
const autonomoCount = document.getElementById("autonomoCount");
const empregadoCount = document.getElementById("empregadoCount");
const transportadoraCount = document.getElementById("transportadoraCount");

let rows = [];

function getToken() {
  return sessionStorage.getItem("pesquisa-admin-token") || tokenInput.value.trim();
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function clearError() {
  errorBox.textContent = "";
  errorBox.classList.add("hidden");
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function getPerfil(row) {
  return row.respostas?.perfil_motorista || "Sem perfil";
}

function flattenAnswers(respostas = {}) {
  return Object.entries(respostas)
    .filter(([key]) => key !== "contato")
    .map(([key, value]) => {
      const formatted = Array.isArray(value) ? value.join(" | ") : value;
      return `${key}: ${formatted}`;
    })
    .join("\n");
}

function matchesSearch(row, term) {
  if (!term) return true;
  const haystack = [
    getPerfil(row),
    row.nome,
    row.whatsapp,
    row.comentario,
    flattenAnswers(row.respostas)
  ].join(" ").toLowerCase();
  return haystack.includes(term.toLowerCase());
}

function renderSummary(filteredRows) {
  totalCount.textContent = filteredRows.length;
  autonomoCount.textContent = filteredRows.filter((row) => getPerfil(row) === "Autônomo").length;
  empregadoCount.textContent = filteredRows.filter((row) => getPerfil(row) === "Empregado").length;
  transportadoraCount.textContent = filteredRows.filter((row) => getPerfil(row) === "Transportadora").length;
}

function renderRows() {
  const term = searchInput.value.trim();
  const filteredRows = rows.filter((row) => matchesSearch(row, term));
  renderSummary(filteredRows);

  if (!filteredRows.length) {
    responsesBody.innerHTML = `
      <tr>
        <td colspan="6" class="emptyCell">Nenhuma resposta encontrada.</td>
      </tr>
    `;
    return;
  }

  responsesBody.innerHTML = filteredRows.map((row) => `
    <tr>
      <td>${formatDate(row.created_at)}</td>
      <td>${getPerfil(row)}</td>
      <td>${row.nome || ""}</td>
      <td>${row.whatsapp || ""}</td>
      <td>${row.comentario || ""}</td>
      <td><pre>${flattenAnswers(row.respostas)}</pre></td>
    </tr>
  `).join("");
}

async function loadResponses() {
  const token = getToken();

  if (!token) {
    showError("Digite a senha de administrador.");
    return;
  }

  clearError();
  loadButton.disabled = true;
  loadButton.textContent = "Carregando...";

  try {
    const response = await fetch("/api/responses", {
      headers: {
        "x-admin-token": token
      }
    });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      throw new Error(data.erro || "Nao consegui carregar as respostas.");
    }

    sessionStorage.setItem("pesquisa-admin-token", token);
    rows = data.respostas || [];
    login.classList.add("hidden");
    panel.classList.remove("hidden");
    renderRows();
  } catch (error) {
    showError(error.message);
  } finally {
    loadButton.disabled = false;
    loadButton.textContent = "Entrar";
  }
}

function csvValue(value) {
  const text = String(value || "").replace(/\r?\n/g, " ");
  return `"${text.replace(/"/g, '""')}"`;
}

function exportCsv() {
  const term = searchInput.value.trim();
  const filteredRows = rows.filter((row) => matchesSearch(row, term));
  const lines = [
    ["data", "perfil", "nome", "whatsapp", "comentario", "respostas"].map(csvValue).join(","),
    ...filteredRows.map((row) => [
      formatDate(row.created_at),
      getPerfil(row),
      row.nome,
      row.whatsapp,
      row.comentario,
      flattenAnswers(row.respostas)
    ].map(csvValue).join(","))
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "respostas-pesquisa-caminhoneiros.csv";
  link.click();
  URL.revokeObjectURL(url);
}

loadButton.addEventListener("click", loadResponses);
refreshButton.addEventListener("click", loadResponses);
exportButton.addEventListener("click", exportCsv);
searchInput.addEventListener("input", renderRows);
tokenInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loadResponses();
});
