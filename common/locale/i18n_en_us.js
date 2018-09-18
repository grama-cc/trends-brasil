export const i18n_en_us = {

	share: {
		text: "In search for the candidate: What are Brazilians googling about on the 2018 elections?"
	},

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
    title: "In search for the",
    highlight: "candidate",
    description: [
    	"During 2018 elections, millions of Brazilians are using Google in searches on candidates running for presidency.",
    	"Which are the topics that arouse the most interest? How can the searches related to the presidential candidates compare?",
    	"What are tendencies over time? Discover 2018 Brazilian elections through Google Trends lenses."
    ]
  },

  keywords: {
	  title: "Most popular",
	  description: "The larger the bubble, the greater the interest search over the last 24 hours. The word cloud shows the most searched terms on each candidate over the last seven days. Use the arrows to navigate through the candidates or choose the picture directly.",
	  highlight: "The more frequent the search, the bigger the candidate and terms are.",
	  legend: "Related words",
	  button: 'Learn more',

	  more: [
	  	"The circle graphic represents the Google search interest on the presidency candidates in the last 24 hours. The word cloud shows the most frequent terms searched on Google for each candidate in the last seven days. The most frequent terms and candidates are the largest."
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
    title: 'Interest over time',
		description: 'Check out the interest level in the candidates since the beginning of the presidential campaign.',
		highlight: "",
		legend: "Search interest for each candidate, from 0 to 100, indexed by Google Trends",
		button: 'Learn more',
		more: [
			"Google Trends makes the information of overtime interest for each candidate available and they are indexed in amounts from 0 to 100, where 100 is the highest point in the graph.",
			"All other amounts are calculated in comparison to the highest point of the graph for that period.",
			"Check out the evolution of searches on each candidate within monthly and weekly timeframes.",
			"The filter “week” shows data related to the last seven days. The filter “month” shows data related to the last thirty days."
		]
  },

  category: {
    title: 'Predominant topics',
    description: "Take a look at the comparison of the most popular terms divided into five categories that dominated the researches.",
		highlight: "",
		legend: "Percentage of each researched category (%) for each candidate",
		button: 'Learn more',
		more: [
			"Each candidate triggers the interest in different topics and subjects of his course.",
			"Each subject brings together different searches made along with each candidate.. There are celebrities, biography curiosities, associations to political figures, ideology issues and media issues."
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
	  	}
	  ]
  },

  radar: {
	  title: "Subject distribution",
	  description: "The graph shows how interest shifts in each of the five different categories that dominated the searches",
	  highlight: "",
	  legend: "Theme percentage (%) of the search interest made on each candidate",
	  button: "Learn more",
	  more: [
	  	"The distance from the center reveals the importance of each topic in candidate searches.",
			"The filter “week” shows data related to the last seven days. The filter “month” shows data related to the last thirty days."
	  ],

	  names:[
	  	"Political figures",
	  	"Media",
	  	"Ideology",
	  	"Celebrities",
	  	"Biography"
	  ],
	  empty: "The candidate did not have enough searches to generate the view"
	},

  relationship: {
	  title: 'Compare the candidates',
	  description: 'Choose two candidates and find out which are the most common search topics between them.',
	  highlight: '',
	  button: "Learn more",
	  more: [
	  	"The topic comparison highlights the connections between different aspects of candidate profiles and can reveal opposite points of view. In order to avoid redundancies,  searches like “candidate's X proposal” and “proposal of the candidate X” were all grouped into “proposal”."
	  ],
	  common: 'common'
	},

	orbit: {
	  title: "In the orbit of the candidate ",
	  description: "The frequency in which important figures appear in searches along with each candidate.",
	  highlight: '',
	  legend: "Personalities in the candidate's related search, in values ​​from 0 to 100, indexed by Google Trends",
	  button: "Learn more",
	  more: [
	  	"The nearer to the center, the higher the level of interest is in the personality in relation to the candidate. The data analysis revealed a large amount of important personalities associated to the candidates.", 
			"The filter “week” shows data related to the last seven days. The filter “month” shows data related to the last thirty days." 
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
				"“In search for the candidate” is a project by Brazilian designers and programmers in collaboration with Google News Initiative. We analyze Google’s search data related to 2018’s election race to display the interest of Brazilian voters on the candidates running for presidency.",
				"We will track the results until the end of election, on Oct.2018.",
				"Google Trends analyzes a random sample of searches using Google's search engine in a specific time period and indexes them from 0 to 100, where 100 is the most searched interest. All the other values are set in comparison to the most searched."
			],
			columnRight: [
			]
		},

		contact: {
			title: "Contact",
			column: [
				"If you have any questions or suggestions, send us an email.",
				"Google News Initiative supported the project “In search for the candidate” providing data, edition and technical questions about Google Trends. For more info about Google Trends, contact newslabtrends@google.com"
		  ],
		},

		central: {
			title: "Google Trends’ Election Center",
		  column: [
		  	"Check Google Trends data at Google’s data center made specially for 2018 presidential election. Go to:"
		  ],
		  link: "g.co/trendseleicoes2018"
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
	  		title: "Google Trends’ Election Center",
	  		text: "Check Google Trends data at Google’s data center made specially for 2018 presidential election. Go to: g.co/trendseleicoes2018"
	  	},
	  	{
	  		title: "",
	  		text: ""
	  	},
	  	{
	  		title: "",
	  		text: ""
	  	}
	  ]
	}
  }

}