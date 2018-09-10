export const i18n_pt_br = {

	period: {
		title: "Período",
		week: "Semana",
		month: "Mês"
	},

	filter: {
		all: "Todos",
		choose: "Escolha...",
		related: "Relacionadas ao candidato",
		candidates: "Todos os candidatos",
		two: "Escolha dois candidatos:"
	},

	select: {
		graphic: "Gráfico",
		terms: "Termos"
	},

	slider: {
		choose: "Escolha um candidato"
	},

  intro: {
    meta_tags: {
      title: 'Na busca do candidato',
      description: 'Google',
    },
    title: 'Na busca do',
    highlight: 'candidato',
    description: [
    	'O que os brasileiros procuram no Google sobre as eleições de 2018?',
      'Veja o que pesquisam sobre os candidatos à presidência\n'
    ],
  },

  keywords: {
	  title: "Por quem buscam",
	  description: "O gráfico representa a popularidade dos candidatos na busca diária do Google e os termos mais comuns associados a ele durante a semana. Quanto maior o interesse de busca pelo candidato, maior a proporção das imagens.",
	  highlight: "Quanto maior o interesse de busca pelo candidato, maior a proporção das imagens.",
	  button: "Saiba mais",
	  legend: "Palavras relacionadas",
	  more: [
	  	'O gráfico de bolas representa a relevância das buscas dos candidatos à presidência nas eleições de 2018 no Brasil, e a nuvem de palavras mostra os termos mais buscados no Google para cada candidato. Os termos e candidatos mais frequentes aparecem maiores.'
	  ],
	  select: {
	  	graphic: "Gráfico",
	  	candidate: "Candidato"
		},
		buttons: {
			choose_candidate: "Clique em um candidato"
		}
	},

	lines: {
    title: 'O desempenho nas buscas',
		description: 'Interesse pelos candidatos ao longo do tempo.',
		highlight: '',
		legend: "Interesse de busca por candidato, em valores de 0 a 100, indexados pelo Google Trends",
		button: 'Saiba mais',
		more: [
	  	'O Google Trends disponibiliza a informação de interesse ao longo do tempo para cada candidato em valores indexados de 0 a 100, sendo 100 o ponto mais alto do gráfico. ',
      'Todos os outros valores são por comparação. ',
      'É possível visualizar a evolução temporal do volume de busca dos candidato com os filtros por semana, mês e ano, e sua evolução individual',
    ],
  },

  category:{
	  title: 'O que buscam?',
	  description: 'A comparação dos termos mais buscados em cinco temas predominantes.',
	  highlight: '',
	  legend: "Porcentagem das categorias (%) entre as buscas feitas para cada candidato",
	  button: 'Saiba mais',
	  more: [
	  	'A análise dos termos de busca revelou a curiosidade por diferentes aspectos de cada candidato.',
      'Foi possível agrupar os dados iniciais em cinco grandes temas fornecendo um novo entendimento sobre o interesse dos usuários.'
	  ],

	  list:[
	  	{
	  		id: 6,
	  		name:"Figuras políticas",
	  		text:"Políticos em mandato ativo e demais personalidades do mundo político, como ministros do Supremo e juízes federais."
	  	},
	  	{
	  		id: 5,
	  		name:"Mídia",
	  		text:"Buscas relacionadas a notícias e seus veículos de publicação, como jornais, sites ou programas de TV."
	  	},
	  	{
	  		id: 4,
	  		name:"Ideologia",
	  		text:"Todos os termos relacionados à ideologia política dos candidatos, como plano de governo e declarações."
	  	},
	  	{
	  		id: 3,
	  		name:"Celebridades",
	  		text:"Cantores, atores, ex-BBBs… quem orbita os candidatos à Presidência na busca relacionada."
	  	},
	  	{
	  		id: 1,
	  		name:"Biografia",
	  		text:"Buscas sobre a vida pública dos candidatos, como cargos ocupados ou pretendidos e envolvimento em casos de corrupção."
	  	},
	  	{
	  		id: 2,
	  		name:"Outros",
	  		text:"Termos amplamente buscados que não se enquadram em nenhuma classificação."
	  	}
	  ]
	},

  radar: {
	  title: "Como buscam",
	  description: "A região do gráfico indica o interesse nos diferentes temas. O deslocamento da área em relação ao centro revela a importância de cada tema na busca dos candidatos.",
	  highlight: "",
	  legend: "Porcentagem das categorias (%) entre as buscas feitas para cada candidato",
	  button: "Saiba mais",
	  more: [
	  	"O gráfico ajuda a entender melhor a curiosidade do usuário pelo candidato, revelando a distribuição de buscas pelos temas. ",
		  "Dessa forma, é possível acompanhar uma transformação de interesses ao longo do tempo com os filtros."
	  ],
	  names:[
			"Figuras políticas",
			"Mídia",
			"Ideologia",
			"Celebridades",
			"Biografia",
			"Outros"
	  ],

	  empty: "O candidato não teve buscas suficientes para gerar a visualização"
	},

	relationship: {
	  title: "Como os candidatos se relacionam",
	  description: "As palavras de busca relacionada de cada candidato. Para descobrir quais termos são comum a ambos, escolha dois políticos para comparação.",
	  highlight: '',
	  button: "Saiba mais",
	  more: [
	  	"A comparação dos termos de cada candidato destaca a interessante relação das buscas tanto ideológicas quanto à aspectos de individuais, como biografia ou figuras políticas, e pode evidenciar posicionamentos opostos nos termos não comuns a ambos. ",
		  "Para evitar redundâncias, buscas como “proposta de Bolsonaro” e “proposta Bolsonaro” foram agrupados em “proposta”."
	  ],
	  common:'em comum'
	},

	orbit: {
	  title: "Quem está na órbita",
	  description: "A frequência com que celebridades e figuras políticas aparecem nas buscas. A proximidade do centro indica um maior volume de busca correlacionadas entre o candidato e a personalidade.",
	  highlight: '',
	  legend: "Personalidades na busca relacionada ao candidato, em valores de 0 a 100, indexados pelo Google Trends",
	  button: "Saiba mais",
	  more: [
	  	"A análise inicial dos dados coletados mostrou uma quantidade relevante de nomes de personalidades associada ao de candidatos. ",
			"A visualização mede a intensidade dessa busca relacionada, distribuindo os nomes de acordo com a sua relevância, sendo que buscas mais frequentes se mantém próximas ao centro."
	  ],
	  empty: "O candidato não teve buscas suficientes para gerar a visualização"
	},

  search: {
    input: 'Search for topic or category',
  },

	footer:{
  	share: "Compartilhe esse projeto",
		project: {
	  	title: "O projeto",
		  columnLeft: [
		  	"“Na busca do Candidato” é um projeto de designer e programadoras brasileiras em colaboração com o Google News Initiative. Analisamos os dados de pesquisas no Google relacionados à campanha eleitoral de 2018.",
			  "Buscamos entender o que mais interessa ao eleitor brasileiro sobre os candidatos ao cargo de Presidente da República.",
		  ],
	   	columnRight: [
	   		"Vamos acompanhar os resultados até outubro de 2018, mês das eleições.",
	  		"O Google Trends analisa uma amostra aleatória das buscas feitas pelo Google em um período específico de tempo e as classifica em uma escala de 0 a 100, sendo 100 o termo de maior interesse de pesquisa. A partir daí, os outros resultados ganham valores relativos.\n"
	   	]
		},
  	team: {
	  title: "Equipe",
	  list: [
	  	{
	  		title: "Carol Cavaleiro",
	  		name: "Direção de arte, edição e design",
				link: "https://carolcavaleiro.com/portfolio/"
	  	},
	  	{
	  		title: "Thais Viana",
	  		name: "hub9 | Compreensão de Dados",
				link: "https://hub9.co/"
	  	},
	  	{
	  		title: "Tainá Simões",
	  		name: "Grama | Programação Criativa",
				link: "https://grama.cc/"
	  	},
	  	{
	  		title: "Google News Lab",
	  		name: "Marco Túlio Pires e Simon Rogers"
	  	},
	  	{
	  		title: "Consultor de projetos",
	  		name: "Alberto Cairo"
	  	}
	  ]
	},

	clipping: {
	  list: [
	  	{
	  		title: "Making Of",
	  		text: "Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa"
	  	},
	  	{
	  		title: "Link 2",
	  		text: "Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa"
	  	},
	  	{
	  		title: "Link 3",
	  		text: "Chocolate cookie dessert ice cream. Pudding brownie bonbon jujubes. Sweet cookie dessert. Bear claw lemon drops dragée sweet roll donut icing pie sweet jelly-o. Soufflé marzipan bear claw. Ice cream oa"
	  	}
	  ]
	}

  }
}