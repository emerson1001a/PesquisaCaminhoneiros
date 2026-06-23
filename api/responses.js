const TABLE_NAME = "respostas_pesquisa_caminhoneiros";

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false, erro: "Metodo nao permitido." });
  }

  const adminToken = process.env.ADMIN_TOKEN;
  const receivedToken = req.headers["x-admin-token"];

  if (!adminToken || receivedToken !== adminToken) {
    return res.status(401).json({ ok: false, erro: "Acesso nao autorizado." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      ok: false,
      erro: "Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY na Vercel."
    });
  }

  let supabaseRestUrl;
  try {
    supabaseRestUrl = new URL(
      `/rest/v1/${TABLE_NAME}?select=*&order=created_at.desc&limit=500`,
      supabaseUrl
    ).toString();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      erro: "SUPABASE_URL invalida na Vercel.",
      detalhe: error.message
    });
  }

  try {
    const response = await fetch(supabaseRestUrl, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json"
      }
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        erro: text || "Erro ao buscar respostas no Supabase."
      });
    }

    return res.status(200).json({
      ok: true,
      respostas: text ? JSON.parse(text) : []
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      erro: error.message || "Erro inesperado ao buscar respostas."
    });
  }
};
