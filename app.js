const SUBMIT_URL = "/api/submit";

const questions = [
  {
    id: "perfil_motorista",
    text: "Você é:",
    options: [
      "Autônomo",
      "Empregado",
      "Transportadora"
    ]
  },
  {
    id: "primeiro_olhar",
    text: "Quando aparece um frete novo, qual é a primeira coisa que você olha?",
    options: [
      "Valor do frete",
      "Distância da viagem",
      "Lugar de entrega",
      "Tipo ou peso da carga",
      "Tempo que posso perder esperando"
    ]
  },
  {
    id: "decisao_frete",
    text: "Como você decide se um frete vale a pena?",
    options: [
      "Faço uma conta detalhada",
      "Faço uma conta por cima",
      "Vou pela experiência",
      "Depende de quem está oferecendo",
      "Às vezes não sei se vou lucrar"
    ]
  },
  {
    id: "custo_pesa",
    text: "Qual custo mais pesa no seu bolso?",
    options: [
      "Diesel",
      "Pedágio",
      "Manutenção ou pneu",
      "Alimentação e diárias"
    ]
  },
  {
    id: "diesel_decisao",
    text: "O preço do diesel muda sua decisão de aceitar um frete?",
    options: [
      "Sempre",
      "Quase sempre",
      "Só em viagem longa",
      "Quase nunca"
    ]
  },
  {
    id: "retorno",
    text: "Como você lida com carga de retorno?",
    options: [
      "Só aceito se já tiver retorno",
      "Procuro retorno no caminho",
      "Aceito e vejo depois",
      "Normalmente volto vazio"
    ]
  },
  {
    id: "info_falta",
    text: "Qual informação mais costuma faltar em um frete?",
    options: [
      "Peso da carga",
      "Pedágio ou rota",
      "Tempo de carga e descarga",
      "Condição de pagamento"
    ]
  },
  {
    id: "onde_usaria",
    text: "Se uma ferramenta ajudasse a conferir se um frete vale a pena, você usaria onde?",
    options: [
      "WhatsApp",
      "Aplicativo no celular",
      "Site simples",
      "Não usaria"
    ]
  },
  {
    id: "ajuda_antes",
    text: "O que mais te ajudaria antes de aceitar um frete?",
    options: [
      "Saber o lucro aproximado",
      "Saber o custo total",
      "Saber se tem retorno",
      "Saber se a rota é pesada"
    ]
  },
  {
    id: "contato",
    text: "Quer participar dos primeiros testes do Rode com Lucro?",
    type: "contact",
    optional: true
  }
];

const shipperQuestions = [
  {
    id: "transportadora_dificuldade",
    text: "Qual é a maior dificuldade ao contratar motorista para um frete?",
    options: [
      "Encontrar motorista disponível",
      "Confiar no motorista",
      "Negociar valor",
      "Documentação e regras",
      "Agilidade para fechar"
    ]
  },
  {
    id: "transportadora_encontra_motoristas",
    text: "Como vocês normalmente encontram motoristas?",
    options: [
      "WhatsApp",
      "Indicação",
      "Agenciador",
      "Plataformas de frete",
      "Base própria de motoristas"
    ]
  },
  {
    id: "transportadora_atraso",
    text: "O que mais atrasa o fechamento de um frete?",
    options: [
      "Motorista demorando para responder",
      "Falta de informação do frete",
      "Negociação de preço",
      "Documentação",
      "Não encontrar motorista na rota"
    ]
  },
  {
    id: "transportadora_confianca",
    text: "O que faria você confiar mais em um motorista novo?",
    options: [
      "Histórico de fretes",
      "Avaliação de outros contratantes",
      "Documentos verificados",
      "Indicação de alguém conhecido",
      "Contato direto e rápido"
    ]
  },
  {
    id: "transportadora_utilidade",
    text: "O que seria mais útil para sua operação?",
    options: [
      "Publicar fretes rapidamente",
      "Receber motoristas interessados",
      "Ver motoristas por rota ou região",
      "Organizar contatos no WhatsApp",
      "Comparar motoristas por histórico ou reputação"
    ]
  },
  {
    id: "transportadora_whatsapp",
    text: "Hoje, o WhatsApp ajuda ou atrapalha a operação?",
    options: [
      "Ajuda muito",
      "Ajuda, mas fica bagunçado",
      "Atrapalha pela quantidade de mensagens",
      "Preferia uma ferramenta organizada"
    ]
  },
  {
    id: "transportadora_valor_plataforma",
    text: "Qual seria o maior valor de uma plataforma para transportadoras?",
    options: [
      "Fechar fretes mais rápido",
      "Reduzir risco com motorista",
      "Organizar a operação",
      "Diminuir dependência de agenciador",
      "Ter histórico e controle"
    ]
  }
];

const employeeQuestions = [
  {
    id: "empregado_decide_viagem",
    text: "Você tem liberdade para decidir algo na viagem?",
    options: [
      "Escolho rota",
      "Escolho onde abastecer",
      "Escolho paradas",
      "Só sigo orientação da empresa"
    ]
  },
  {
    id: "empregado_ajuda_estrada",
    text: "O que mais te ajudaria na estrada?",
    options: [
      "Combustível mais barato",
      "Parada boa e segura",
      "Rota melhor",
      "Informação mais clara da viagem"
    ]
  },
  {
    id: "empregado_interesse_ferramenta",
    text: "Se existisse uma ferramenta simples para ajudar motoristas na estrada, você gostaria de receber?",
    options: [
      "Sim, pelo WhatsApp",
      "Sim, por aplicativo",
      "Talvez",
      "Não tenho interesse"
    ]
  }
];

const driverQuestions = questions.slice(1, -1);
const contactQuestion = questions[questions.length - 1];
const autonomousOpenQuestion = {
  id: "comentario_autonomo",
  text: "Quer contar qual é a maior dificuldade para conseguir bons fretes e ganhar melhor na estrada?",
  type: "textarea",
  optional: true,
  placeholder: "Ex.: frete baixo, falta de retorno, diesel caro, pedágio, espera, pouca informação..."
};
const employeeOpenQuestion = {
  id: "comentario_empregado",
  text: "Quer contar o que mais atrapalha seu dia a dia na estrada?",
  type: "textarea",
  optional: true,
  placeholder: "Ex.: rota ruim, parada insegura, espera, informação incompleta..."
};
const shipperOpenQuestion = {
  id: "comentario_transportadora",
  text: "Quer contar qual é a maior dificuldade para fechar fretes com bons motoristas?",
  type: "textarea",
  optional: true,
  placeholder: "Ex.: demora para responder, confiança, documentação, preço..."
};

function getActiveQuestions() {
  let branch = [...driverQuestions, autonomousOpenQuestion];

  if (answers.perfil_motorista === "Empregado") {
    branch = [...employeeQuestions, employeeOpenQuestion];
  }

  if (answers.perfil_motorista === "Transportadora") {
    branch = [...shipperQuestions, shipperOpenQuestion];
  }

  return [questions[0], ...branch, contactQuestion];
}

function clearBranchAnswers() {
  [
    ...driverQuestions,
    autonomousOpenQuestion,
    ...employeeQuestions,
    employeeOpenQuestion,
    ...shipperQuestions,
    shipperOpenQuestion
  ].forEach((question) => {
    delete answers[question.id];
  });
}

const intro = document.getElementById("intro");
const thanks = document.getElementById("thanks");
const form = document.getElementById("surveyForm");
const questionCard = document.getElementById("questionCard");
const questionTitle = document.getElementById("questionTitle");
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const againButton = document.getElementById("againButton");

let current = 0;
let answers = {};
let sending = false;

function showScreen(screen) {
  intro.classList.toggle("hidden", screen !== "intro");
  form.classList.toggle("hidden", screen !== "form");
  thanks.classList.toggle("hidden", screen !== "thanks");
}

function renderQuestion() {
  const activeQuestions = getActiveQuestions();
  const question = activeQuestions[current];
  const total = activeQuestions.length;
  const value = answers[question.id] || "";

  questionTitle.textContent = question.text;
  progressText.textContent = `${current + 1}/${total}`;
  progressBar.style.width = `${((current + 1) / total) * 100}%`;
  backButton.disabled = current === 0 || sending;
  nextButton.textContent = current === total - 1 ? "Enviar" : "Continuar";
  nextButton.disabled = sending;

  if (question.type === "textarea") {
    questionCard.innerHTML = `
      <div class="field">
        <label for="${question.id}">${question.optional ? "Opcional" : "Resposta"}</label>
        <textarea id="${question.id}" placeholder="${question.placeholder || ""}">${value || ""}</textarea>
        <span class="hint">Pode deixar em branco se não quiser comentar.</span>
      </div>
    `;
    document.getElementById(question.id).addEventListener("input", (event) => {
      answers[question.id] = event.target.value.trim();
    });
    return;
  }

  if (question.type === "contact") {
    const contato = answers[question.id] || {};
    const isShipper = answers.perfil_motorista === "Transportadora";
    questionCard.innerHTML = `
      <div class="contactInvite">
        <strong>Quer acompanhar o projeto?</strong>
        <p>
          Sua resposta já ajudou. Se quiser, deixe seu WhatsApp para receber novidades e testar
          o Rode com Lucro quando abrirmos para ${isShipper ? "transportadoras" : "motoristas"}.
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

  questionCard.innerHTML = `
    <div class="options">
      ${question.options.map((option, index) => `
        <label class="option">
          <input
            type="radio"
            name="${question.id}"
            value="${option}"
            ${value === option ? "checked" : ""}
          >
          <span>${option}</span>
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
  if (question.optional) return true;
  return Boolean(answers[question.id]);
}

async function sendAnswers() {
  const contato = answers.contato || {};
  const comentario =
    answers.comentario_autonomo ||
    answers.comentario_empregado ||
    answers.comentario_transportadora ||
    answers.comentario ||
    "";
  const payload = {
    respostas: answers,
    comentario,
    nome: contato.nome || "",
    whatsapp: contato.whatsapp || "",
    origem: "link_publico"
  };

  const response = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    localStorage.setItem(`pesquisa-caminhoneiros-pendente-${Date.now()}`, JSON.stringify(payload));
    throw new Error(`Servidor ${response.status}: ${text || "Erro ao salvar resposta."}`);
  }

  return { savedLocally: false };
}

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
    await sendAnswers();
    showScreen("thanks");
  } catch (error) {
    sending = false;
    renderQuestion();
    showError(`Não consegui enviar ao banco agora. Guardei uma cópia neste aparelho. Detalhe: ${error.message}`);
    console.error("Erro ao enviar pesquisa:", error);
  }
});

againButton.addEventListener("click", () => {
  current = 0;
  answers = {};
  sending = false;
  showScreen("intro");
});
