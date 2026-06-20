const TABLE_NAME = "respostas_pesquisa_caminhoneiros";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, erro: "Metodo nao permitido." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      ok: false,
      erro: "Supabase nao configurado na Vercel."
    });
  }

  let supabaseRestUrl;
  try {
    supabaseRestUrl = new URL(`/rest/v1/${TABLE_NAME}`, supabaseUrl).toString();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      erro: "SUPABASE_URL invalida na Vercel.",
      detalhe: error.message,
      supabase_url_recebida: supabaseUrl || ""
    });
  }

  const body = req.body || {};
  const payload = {
    origem: body.origem || "link_publico",
    nome: body.nome || "",
    whatsapp: body.whatsapp || "",
    comentario: body.comentario || "",
    respostas: body.respostas || {}
  };

  try {
    const response = await fetch(supabaseRestUrl, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({
        ok: false,
        erro: text || "Erro ao salvar no Supabase."
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      erro: error.message || "Erro inesperado ao salvar.",
      causa: error.cause?.message || "",
      supabase_host: (() => {
        try {
          return new URL(supabaseUrl).host;
        } catch {
          return "";
        }
      })(),
      chave_configurada: Boolean(supabaseKey)
    });
  }
};
