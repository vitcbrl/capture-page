document.getElementById('cadastroForm').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    // Captura dos dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const vagas = document.getElementById('vagas').checked;
    const conteudos = document.getElementById('conteudos').checked;
  
    // Verifica se pelo menos uma opção foi marcada
    if (!vagas && !conteudos) {
      console.log('Nenhuma opção foi marcada.');
      return; // Evita a chamada da API
    }
  
    // Captura dos parâmetros de URL
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    const campaign = urlParams.get('campaign');
  
    console.log('Parâmetros de URL - Source:', source, 'Campaign:', campaign);
  
    try {
      // Chamada de API para o ActiveCampaign usando caminho relativo
      const response = await fetch('/api/3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Api-Token': '30eef11cca1642e6a07bedcd5f6edf65c21065cb6f2dabecda139d4290e05225a99ee7e3',
        },
        body: JSON.stringify({
          contact: {
            email: email,
            firstName: nome,
            field: {
              vagas: vagas,
              conteudos: conteudos,
            },
          },
          tags: ['INTERESSADOS MDNEGOCIOS'],
          lists: ['INTERESSADOS MDNEGOCIOS'],
          source: source,
          campaign: campaign,
        }),
      });
  
      const data = await response.json();
  
      console.log('Contato adicionado com sucesso:', data);
      // Exibir mensagem de agradecimento
      document.getElementById('agradecimento').innerText = `Obrigado por se cadastrar, ${nome}! Verifique seu e-mail para confirmação.`;
      document.getElementById('agradecimento').style.display = 'block';
      document.getElementById('cadastroForm').style.display = 'none';
    } catch (error) {
      console.error('Erro ao adicionar contato:', error);
    }
  });
  