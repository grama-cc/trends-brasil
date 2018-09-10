export const i18n_en_us = {

	period: {
		title: "Period",
		week: "Week",
		month: "Month"
	},

	filter: {
		all: "All",
		choose: "Choose...",
		related: "Related to candidate",
		candidates: "All candidates",
		two: "Choose two candidates:"
	},

	select: {
		graphic: "Graphic",
		terms: "Terms"
	},

	slider: {
		choose: "Choose a candidate"
	},

 	intro: {
    meta_tags: {
      title: "On the search for a candidate",
      description: 'Google',
    },
    title: "In search of the",
    highlight: "candidate",
    description: [
    	"What are Brazilians googling about on the 2018 elections?",
    	"Check out what searches are being made about president candidates."
    ],
  },

  keywords: {
	  title: "Who do people search for on Google?",
	  description: "The graphic represents the candidate's daily popularity on Google Search and the most common search terms associated to them during the week.",
	  highlight: "The more frequent the search, the bigger the candidate and terms are.",
	  
	  button: 'Learn more',

	  more: [
	  	"The bubble chart represents the search relevance for each of Brazil’s 2018th presidential race candidate.",
	  	"The word cloud shows the most common search terms on Google about each candidate.",
	  	"The more frequent the search, the bigger the candidate and terms are."
	  ],

	  select: {
	  	graphic: "Graphic",
	  	candidate: "Candidate"
		},

		buttons: {
			choose_candidate: "Click in a candidate"
		}
	},

	lines: {
    title: 'Search performance',
		description: 'Interest in the candidates over time.',
		highlight: "",
		legend: "Search interest for each candidate, from 0 to 100, indexed by Google Trends",
		button: 'Learn more',
		more: [
			"Google Trends tracks the interests over time for each candidate and displays the data in an index from 0 to 100, where 100 is the highest peak of the chart, and all the other values are set in comparison.",
			"It is possible to visualize how each candidate's search develops over time with filters by week, month and year and every candidate's personal evolution.",
		],
  },

  category: {
    title: 'What do they search for?',
    description: "The comparison of the most searched terms in five predominant themes.",
		highlight: "",
		legend: "Percentage of each researched category (%) for each candidate",
		button: 'Learn more',
		more: [
			"The analysis of search terms revealed users’ curiosity about different aspects of each candidate.",
			"It was possible to sort the initial data into five major themes and provide a new understanding of the users’ interest."
		],

		list:[
	  	{
	  		id: 6,
	  		name:"Political figures",
	  		text:"Politicians in office and other personalities from the political world, such as Supreme ministers, federal judges."
	  	},
	  	{
	  		id: 5,
	  		name:"Media",
	  		text:"Related searches about news and publishers, such as newspapers, websites or TV shows."
	  	},
	  	{
	  		id: 4,
	  		name:"Ideology",
	  		text:"All searches about candidate's ideology, such as government plans and statements."
	  	},
	  	{
	  		id: 3,
	  		name:"Celebrities",
	  		text:"Singers, actors, ex-BBBs...those orbiting the Presidential candidates in the related searches."
	  	},
	  	{
	  		id: 1,
	  		name:"Biography",
	  		text:"Searches about politician's lives, such as positions held or wanted and involvement in cases of corruption."
	  	},
	  	{
	  		id: 2,
	  		name:"Others",
	  		text:"Relevant search terms that do not fit under any classification."
	  	}
	  ]
  },

  radar: {
	  title: "How do they search?",
	  description: "The radar chart shows the search interest among the themes. The distance of the area from the center reveals the importance of each theme in the search for candidates.",
	  highlight: "",
	  legend: "Theme percentage (%) of the search interest made on each candidate",
	  button: "Learn more",
	  more: [
	  	"The chart helps to understand the users' curiosity of a candidate, revealing the search distribution by themes.",
	  	"It is possible to track the transition of interests over time with the filters."
	  ],

	  names:[
	  	"Political figures",
	  	"Media",
	  	"Ideology",
	  	"Celebrities",
	  	"Biography",
	  	"Others"
	  ],
	  empty: "The candidate did not have enough searches to generate the view"
	},

  relationship: {
	  title: 'How do they correlate?',
	  description: 'The most common and the most unusual search terms between two candidates. Choose two candidates to compare.',
	  highlight: '',
	  button: "Learn more",
	  more: [
	  	"The comparison between the search terms of two candidates highlights the interesting search correlations among ideological and individual aspects, such as biography or political figures, and may point out opposite points of view in search terms not common between them.",
	  	"Equivalent search terms are grouped together, for instance: “proposta de Bolsonaro” and “proposta Bolsonaro” appear as “proposta”"
	  ],
	  common: 'common'
	},

	orbit: {
	  title: "Who orbits the candidate",
	  description: "How often celebrities and other politicians appear in the candidate related searches. The center proximity indicates a bigger correlated search volume between the candidate and the celebrity.",
	  highlight: '',
	  legend: "Personalities in the candidate's related search, in values ​​from 0 to 100, indexed by Google Trends",
	  button: "Learn more",
	  more: [
	  	"The initial data gathered presented a relevant amount of celebrities names on the candidates related search.",
	  	"The image measures the volume of these searches, displaying the names accordingly their relevance, where the most frequent searches appear near the center."
	  ],
	  empty: "The candidate did not have enough searches to generate the view"
	},
	
  search: {
    input: 'Search for topic or category',
  },

  footer:{
  	share: "Share this project",
 		project: {
			title: "The project",
			columnLeft: [
				"“Searching for a candidate” is a project created by Brazilian designers and programmers with Google News Initiative. We gathered and analyzed search interest data on Google Trends related to the 2018's election campaign.",
				"We try to understand what catches the interest of Brazilian voters about the candidates running for presidency.",
			],
			columnRight: [
				"We will track the results until the election month, on Oct.2018",
				"Google Trends analyzes a random sample of Google searches in a specific time period and indexes them from 0 to 100,",
				"where 100 is the most searched interest. All the other values are set in comparison."
			]
		},

		team: {
		  title: "Team",
		  list: [
		  	{
		  		title: "Carol Cavaleiro",
		  		name: "Art director and design",
					link: "https://carolcavaleiro.com/portfolio/"
		  	},
		  	{
		  		title: "Thais Viana",
		  		name: "hub | Data Comprehension",
				link: "https://hub9.co/"
		  	},
		  	{
		  		title: "Tainá Simões",
		  		name: "Grama | Criative Coding",
				link: "https://grama.cc/"
		  	},
		  	{
		  		title: "Google News Lab",
		  		name: "Marco Túlio Pires e Simon Rogers"
		  	},
		  	{
		  		title: "Project Consultant",
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