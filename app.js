const SUBMIT_URL = "/api/submit";

// ─────────────────────────────────────────────
// PERGUNTA DE SEGMENTAÇÃO (comum a todos)
// ─────────────────────────────────────────────
const perguntaInicial = {
  id: "perfil_motorista",
  texto: "Você é:",
  opções: ["Autônomo", "Empregado", "Transportadora"]
};

// ─────────────────────────────────────────────
// FLUXO: AUTÔNOMO
// Alterações aplicadas:
// - P5 (diesel_decisao) REMOVIDA — era redundante com custo_pesa
// - P4 (custo_pesa) agora permite até 2 seleções
// - P2 (primeiro_olhar): "Tempo que posso perder esperando" → "Prazo de carga e descarga"
// - P9 (ajuda_antes): "Saber o custo total" → "Saber a reputação de quem oferece o frete"
// - NOVAS: arrependimento_frete, controle_financeiro, recebimento_frete
// ─────────────────────────────────────────────
const perguntasAutonomo = [
  {
    id: "primeiro_olhar",
    texto: "Quando aparece um frete novo, qual é a primeira coisa que você olha?",
    opções: [
      "Valor do frete",
      "Distância da viagem",
      "Lugar de entrega",
      "Tipo ou peso da carga",
      "Prazo de carga e descarga"
    ]
  },
  {
    id: "decisao_frete",
    texto: "Como você decide se um frete vale a pena?",
    opções: [
      "Faço uma conta detalhada",
      "Faço uma conta por cima",
      "Vou pela experiência",
      "Depende de quem está oferecendo",
      "Às vezes não sei se vou lucrar"
    ]
  },
  {
    id: "arrependimento_frete",
    texto: "Você já aceitou um frete e se arrependeu depois de fazer as contas?",
    opções: [
      "Sim, acontece com frequência",
      "Sim, já aconteceu algumas vezes",
      "Raramente",
      "Nunca aconteceu"
    ]
  },
  {
    id: "custo_pesa",
    texto: "Quais custos mais pesam no seu bolso?",
    maxSelections: 2,
    opções: [
      "Diesel",
      "Pedágio",
      "Manutenção ou pneu",
      "Alimentação e diárias"
    ]
  },
  {
    id: "retorno",
    texto: "Como você lida com carga de retorno?",
    opções: [
      "Só aceito se já tiver retorno",
      "Procuro retorno no caminho",
      "Aceito e vejo depois",
      "Normalmente volto vazio"
    ]
  },
  {
    id: "info_falta",
    texto: "Qual informação mais costuma faltar em um frete?",
    maxSelections: 2,
    opções: [
      "Peso da carga",
      "Pedágio ou rota",
      "Tempo de carga e descarga",
      "Condição de pagamento"
    ]
  },
  {
    id: "controle_financeiro",
    texto: "Você usa algo hoje para controlar seus ganhos e gastos?",
    opções: [
      "Sim, uso um aplicativo",
      "Sim, uso planilha",
      "Anoto no papel",
      "Não controlo"
    ]
  },
  {
    id: "recebimento_frete",
    texto: "Como você costuma receber pelo frete?",
    opções: [
      "No ato da entrega",
      "Em até 7 dias",
      "Entre 15 e 30 dias",
      "Varia muito"
    ]
  },
  {
    id: "onde_usaria",
    texto: "Se uma ferramenta ajudasse a conferir se um frete vale a pena, você usaria onde?",
    opções: [
      "WhatsApp",
      "Aplicativo no celular",
      "Site simples",
      "Não usaria"
    ]
  },
  {
    id: "ajuda_antes",
    texto: "O que mais te ajudaria antes de aceitar um frete?",
    opções: [
      "Saber o lucro aproximado",
      "Saber se tem retorno disponível",
      "Saber a reputação de quem oferece o frete",
      "Saber se a rota é pesada"
    ]
  }
];

const perguntaAbertaAutonomo = {
  id: "comentario_autonomo",
  texto: "Quer contar qual é a maior dificuldade para conseguir bons fretes e ganhar melhor na estrada?",
  tipo: "textarea",
  opcional: true,
  placeholder: "Ex.: frete baixo, falta de retorno, diesel caro, pedágio, espera, pouca informação..."
};

// ─────────────────────────────────────────────
// FLUXO: EMPREGADO
// Alterações aplicadas:
// - Perguntas antigas SUBSTITUÍDAS por perguntas estratégicas
// - Foco: intenção de virar autônomo, barreiras e percepção de ferramentas
// ─────────────────────────────────────────────
const perguntasEmpregado = [
  {
    id: "empregado_intencao_autonomo",
    texto: "Você já pensou em trabalhar por conta própria como autônomo?",
    opções: [
      "Sim, é um plano",
      "Sim, mas tenho medo",
      "Já tentei e voltei",
      "Não pretendo"
    ]
  },
  {
    id: "empregado_barreira_autonomo",
    texto: "O que mais te impede (ou te impediu) de trabalhar como autônomo?",
    opções: [
      "Medo de ficar sem renda fixa",
      "Não sei se consigo fretes suficientes",
      "Não sei se vai compensar financeiramente",
      "Caminhão próprio é caro",
      "Burocracia e documentação"
    ]
  },
  {
    id: "empregado_ferramenta_empresa",
    texto: "Se seu empregador usasse um app para gerenciar os fretes, você acharia isso:",
    opções: [
      "Ótimo, facilitaria meu trabalho",
      "Indiferente",
      "Dependeria do que ele faz",
      "Prefiro o jeito atual"
    ]
  }
];

const perguntaAbertaEmpregado = {
  id: "comentario_empregado",
  texto: "Quer contar o que mais atrapalha seu dia a dia na estrada?",
  tipo: "textarea",
  opcional: true,
  placeholder: "Ex.: rota ruim, parada insegura, espera, informação incompleta..."
};

// ─────────────────────────────────────────────
// FLUXO: TRANSPORTADORA
// Alterações aplicadas:
// - P3 (transportadora_encontra_motoristas): adicionada opção "Grupos em redes sociais"
// - P2 e P4 mantidas (angulações distintas o suficiente), mas P4 agora permite 2 seleções
// - P6 (transportadora_utilidade) e P8 (transportadora_valor_plataforma): P6 removida
//   para dar espaço à nova pergunta sobre disposição de pagamento
// - NOVA: transportadora_pagaria e transportadora_tamanho_operacao
// ─────────────────────────────────────────────
const perguntasTransportadora = [
  {
    id: "transportadora_dificuldade",
    texto: "Qual é a maior dificuldade ao contratar motorista para um frete?",
    opções: [
      "Encontrar motorista disponível",
      "Confiar no motorista",
      "Negociar valor",
      "Documentação e regras",
      "Agilidade para fechar"
    ]
  },
  {
    id: "transportadora_encontra_motoristas",
    texto: "Como vocês normalmente encontram motoristas?",
    maxSelections: 2,
    opções: [
      "WhatsApp",
      "Indicação",
      "Agenciador",
      "Plataformas de frete",
      "Base própria de motoristas",
      "Grupos em redes sociais"
    ]
  },
  {
    id: "transportadora_atraso",
    texto: "O que mais atrasa o fechamento de um frete?",
    maxSelections: 2,
    opções: [
      "Motorista demorando para responder",
      "Falta de informação do frete",
      "Negociação de preço",
      "Documentação",
      "Não encontrar motorista na rota"
    ]
  },
  {
    id: "transportadora_confianca",
    texto: "O que faria você confiar mais em um motorista novo?",
    opções: [
      "Histórico de fretes",
      "Avaliação de outros contratantes",
      "Documentos verificados",
      "Indicação de alguém conhecido",
      "Contato direto e rápido"
    ]
  },
  {
    id: "transportadora_whatsapp",
    texto: "Hoje, o WhatsApp ajuda ou atrapalha a operação?",
    opções: [
      "Ajuda muito",
      "Ajuda, mas fica bagunçado",
      "Atrapalha pela quantidade de mensagens",
      "Preferia uma ferramenta organizada"
    ]
  },
  {
    id: "transportadora_valor_plataforma",
    texto: "Qual seria o maior valor de uma plataforma para transportadoras?",
    opções: [
      "Fechar fretes mais rápido",
      "Reduzir risco com motorista",
      "Organizar a operação",
      "Diminuir dependência de agenciador",
      "Ter histórico e controle"
    ]
  },
  {
    id: "transportadora_pagaria",
    texto: "Você pagaria por uma ferramenta que reduzisse o tempo de fechamento de frete e trouxesse motoristas confiáveis?",
    opções: [
      "Sim, com certeza",
      "Sim, dependendo do preço",
      "Talvez, precisaria testar",
      "Não pagaria"
    ]
  },
  {
    id: "transportadora_tamanho_operacao",
    texto: "Quantos fretes vocês fecham por mês em média?",
    opções: [
      "Menos de 10",
      "Entre 10 e 30",
      "Entre 30 e 100",
      "Mais de 100"
    ]
  }
];

const perguntaAbertaTransportadora = {
  id: "comentario_transportadora",
  texto: "Quer contar qual é a maior dificuldade para fechar fretes com bons motoristas?",
  tipo: "textarea",
  opcional: true,
  placeholder: "Ex.: demora para responder, confiança, documentação, preço..."
};

// ─────────────────────────────────────────────
// PERGUNTA DE CONTATO (comum a todos)
// ─────────────────────────────────────────────
const perguntaContato = {
  id: "contato",
  texto: "Quer participar dos primeiros testes do Rode com Lucro?",
  tipo: "contato",
  opcional: true
};

// ─────────────────────────────────────────────
// ROTEAMENTO DE FLUXO
// ─────────────────────────────────────────────
function getActiveQuestions() {
  if (answers.perfil_motorista === "Empregado") {
    return [
      perguntaInicial,
      ...perguntasEmpregado,
      perguntaAbertaEmpregado,
      perguntaContato
    ];
  }

  if (answers.perfil_motorista === "Transportadora") {
    return [
      perguntaInicial,
      ...perguntasTransportadora,
      perguntaAbertaTransportadora,
      perguntaContato
    ];
  }

  // Padrão: Autônomo
  return [
    perguntaInicial,
    ...perguntasAutonomo,
    perguntaAbertaAutonomo,
    perguntaContato
  ];
}

function clearBranchAnswers() {
  [
    ...perguntasAutonomo,
    perguntaAbertaAutonomo,
    ...perguntasEmpregado,
    perguntaAbertaEmpregado,
    ...perguntasTransportadora,
    perguntaAbertaTransportadora
  ].forEach((q) => {
    delete answers[q.id];
  });
}

// ─────────────────────────────────────────────
// REFERÊNCIAS DOM
// ─────────────────────────────────────────────
const intro        = document.getElementById("intro");
const thanks       = document.getElementById("thanks");
const form         = document.getElementById("surveyForm");
const questionCard = document.getElementById("questionCard");
const questionTitle = document.getElementById("questionTitle");
const progressText = document.getElementById("progressText");
const progressBar  = document.getElementById("progressBar");
const startButton  = document.getElementById("startButton");
const backButton   = document.getElementById("backButton");
const nextButton   = document.getElementById("nextButton");
const againButton  = document.getElementById("againButton");

let current = 0;
let answers = {};
let sending = false;

// ─────────────────────────────────────────────
// CONTROLE DE TELA
// ─────────────────────────────────────────────
function showScreen(screen) {
  intro.classList.toggle("hidden", screen !== "intro");
  form.classList.toggle("hidden", screen !== "form");
  thanks.classList.toggle("hidden", screen !== "thanks");
}

// ─────────────────────────────────────────────
// RENDERIZAÇÃO DE PERGUNTAS
// ─────────────────────────────────────────────
function renderQuestion() {
  const activeQuestions = getActiveQuestions();
  const question = activeQuestions[current];
  const total = activeQuestions.length;
  const value = answers[question.id] || "";

  questionTitle.textContent = question.texto;
  progressText.textContent = `${current + 1}/${total}`;
  progressBar.style.width = `${((current + 1) / total) * 100}%`;
  backButton.disabled = current === 0 || sending;
  nextButton.textContent = current === total - 1 ? "Enviar" : "Continuar";
  nextButton.disabled = sending;

  // Pergunta aberta (textarea)
  if (question.tipo === "textarea") {
    questionCard.innerHTML = `
      <div class="field">
        <label for="${question.id}">${question.opcional ? "Opcional" : "Resposta"}</label>
        <textarea id="${question.id}" placeholder="${question.placeholder || ""}">${value || ""}</textarea>
        <span class="hint">Pode deixar em branco se não quiser comentar.</span>
      </div>
    `;
    document.getElementById(question.id).addEventListener("input", (e) => {
      answers[question.id] = e.target.value.trim();
    });
    return;
  }

  // Pergunta de contato
  if (question.tipo === "contato") {
    const contato = answers[question.id] || {};
    const isTransportadora = answers.perfil_motorista === "Transportadora";
    questionCard.innerHTML = `
      <div class="contactInvite">
        <strong>Quer acompanhar o projeto?</strong>
        <p>
          Sua resposta já ajudou. Se quiser, deixe seu WhatsApp para receber novidades e testar
          o Rode com Lucro quando abrirmos para ${isTransportadora ? "transportadoras" : "motoristas"}.
        </p>
        <p>
          Não é obrigatório. O contato serve só para chamar quem quiser participar dos próximos passos.
        </p>
      </div>
      <div class="field">
        <label for="nome">Nome</label>
        <input id="nome" autocomplete="name" placeholder="Ex.: Paulo" value="${contato.nome || ""}">
      </div>
      <div class="field" style="margin-top:14px">
        <label for="whatsapp">WhatsApp</label>
        <input id="whatsapp" inputmode="tel" autocomplete="tel" placeholder="Ex.: (11) 99999-9999" value="${contato.whatsapp || ""}">
        <span class="hint">Opcional. Use apenas se quiser receber o convite.</span>
      </div>
    `;
    const saveContact = () => {
      answers[question.id] = {
        nome: document.getElementById("nome").value.trim(),
        whatsapp: document.getElementById("whatsapp").value.trim()
      };
    };
    document.getElementById("nome").addEventListener("input", saveContact);
    document.getElementById("whatsapp").addEventListener("input", saveContact);
    return;
  }

  // Pergunta de múltipla escolha (checkbox)
  if (question.maxSelections) {
    const selectedValues = Array.isArray(value) ? value : [];
    questionCard.innerHTML = `
      <span class="hint">Escolha até ${question.maxSelections} opções.</span>
      <div class="options">
        ${question.opções.map((opcao) => `
          <label class="option">
            <input
              type="checkbox"
              name="${question.id}"
              value="${opcao}"
              ${selectedValues.includes(opcao) ? "checked" : ""}
              ${selectedValues.length >= question.maxSelections && !selectedValues.includes(opcao) ? "disabled" : ""}
            >
            <span>${opcao}</span>
          </label>
        `).join("")}
      </div>
    `;
    questionCard.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => {
        const selected = Array.from(questionCard.querySelectorAll("input:checked")).map((i) => i.value);
        answers[question.id] = selected;
        clearError();
        renderQuestion();
      });
    });
    return;
  }

  // Pergunta de escolha única (radio)
  questionCard.innerHTML = `
    <div class="options">
      ${question.opções.map((opcao) => `
        <label class="option">
          <input
            type="radio"
            name="${question.id}"
            value="${opcao}"
            ${value === opcao ? "checked" : ""}
          >
          <span>${opcao}</span>
        </label>
      `).join("")}
    </div>
  `;
  questionCard.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      if (question.id === "perfil_motorista" && answers[question.id] !== input.value) {
        clearBranchAnswers();
      }
      answers[question.id] = input.value;
      clearError();
    });
  });
}

// ─────────────────────────────────────────────
// VALIDAÇÃO E ERROS
// ─────────────────────────────────────────────
function showError(message) {
  clearError();
  const error = document.createElement("div");
  error.className = "error";
  error.id = "errorMessage";
  error.textContent = message;
  questionCard.appendChild(error);
}

function clearError() {
  document.getElementById("errorMessage")?.remove();
}

function validateCurrent() {
  const question = getActiveQuestions()[current];
  if (question.opcional) return true;
  if (question.maxSelections) return Array.isArray(answers[question.id]) && answers[question.id].length > 0;
  return Boolean(answers[question.id]);
}

// ─────────────────────────────────────────────
// ENVIO
// ─────────────────────────────────────────────
async function submitAnswers() {
  const contato = answers.contato || {};
  const comentario =
    answers.comentario_autonomo ||
    answers.comentario_empregado ||
    answers.comentario_transportadora ||
    "";

  const payload = {
    answers,
    comentario,
    nome: contato.nome || "",
    whatsapp: contato.whatsapp || "",
    s: "link_publico"
  };

  const response = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    localStorage.setItem(`pesquisa-caminhoneiros-pendente-${Date.now()}`, JSON.stringify(payload));
    throw new Error(`Servidor ${response.status}: ${text || "Erro ao salvar resposta."}`);
  }

  return { savedLocally: false };
}

// ─────────────────────────────────────────────
// EVENTOS
// ─────────────────────────────────────────────
startButton.addEventListener("click", () => {
  showScreen("form");
  renderQuestion();
});

backButton.addEventListener("click", () => {
  if (current === 0 || sending) return;
  current -= 1;
  clearError();
  renderQuestion();
});

nextButton.addEventListener("click", async () => {
  if (!validateCurrent()) {
    showError("Escolha uma alternativa para continuar.");
    return;
  }

  if (current < getActiveQuestions().length - 1) {
    current += 1;
    clearError();
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  try {
    sending = true;
    nextButton.textContent = "Enviando...";
    nextButton.disabled = true;
    await submitAnswers();
    showScreen("thanks");
  } catch (error) {
    sending = false;
    renderQuestion();
    showError(`Não consegui enviar ao banco agora. Guardei uma cópia neste aparelho. Detalhe: ${error.message}`);
    console.error("Erro ao enviar pesquisa:", error);
  }
});

againButton.addEventListener("click", () => {
  const message = [
    "Pesquisa rápida do Rode com Lucro:",
    "ajude a entender a estrada de verdade e fortalecer quem vive do frete.",
    window.location.origin
  ].join("\n\n");

  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});