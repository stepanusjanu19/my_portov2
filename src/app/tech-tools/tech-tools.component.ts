import { environment } from './../../environments/environment';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tech-tools',
  standalone: true,
  imports: [],
  templateUrl: './tech-tools.component.html',
  styleUrl: './tech-tools.component.css'
})
export class TechToolsComponent {

  tools: string = `I actively use a diverse set of cutting-edge technologies and tools in my daily work. 
                  From modern frameworks and languages to powerful platforms,
                  my toolkit ensures high-quality and efficient development. 🚀 🌟`
  items: Array<any> = [
    {
      name: "PostgreSQL",
      description: "PostgreSQL is a powerful, open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.",
      link: 'https://www.postgresql.org',
      image: `${environment.urlApi}/postgresql.svg`
    },
    {
      name: "Redis Cache",
      description: "Redis is an in-memory key-value database, used as a distributed cache and message broker, with optional durability.[10] Because it holds all data in memory and because of its design, Redis offers low-latency reads and writes, making it particularly suitable for use cases that require a cache. Redis is the most popular NoSQL database, and one of the most popular databases overall.",
      link: 'https://redis.io/',
      image: `${environment.urlApi}/redis.svg`
    },
    {
      name: "Rabbit MQ",
      description: "RabbitMQ is an open-source message-broker software (sometimes called message-oriented middleware) that originally implemented the Advanced Message Queuing Protocol (AMQP) and has since been extended with a plug-in architecture to support Streaming Text Oriented Messaging Protocol (STOMP), MQ Telemetry Transport (MQTT), and other protocols.",
      link: 'https://www.rabbitmq.com/',
      image: `${environment.urlApi}/skills/rabbitmq.svg`
    },
    {
      name: "Golang",
      description: "Go is a high-level general purpose programming language that is statically typed and compiled. It is known for the simplicity of its syntax and the efficiency of development that it enables by the inclusion of a large standard library supplying many needs for common projects.",
      link: 'https://go.dev/',
      image: `${environment.urlApi}/go.svg`
    },
    {
      name: "Mongo DB",
      description: "MongoDB is a source-available, cross-platform, document-oriented database program. Classified as a NoSQL database product, MongoDB uses JSON-like documents with optional schemas.",
      link: 'https://www.mongodb.com/',
      image: `${environment.urlApi}/mongodb.svg`
    },
    {
      name: "Python",
      description: "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.",
      link: 'https://www.python.org/',
      image: `${environment.urlApi}/skills/python.svg`
    },
    {
      name: "Angular JS",
      description: "Angular is a TypeScript-based free and open-source single-page web application framework. It is developed by Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.",
      link: 'https://angular.dev/',
      image: `${environment.urlApi}/angular17.svg`
    },
    {
      name: "Knex JS",
      description: "Knex.js batteries included SQL query builder for PostgreSQL, CockroachDB, MSSQL, MySQL, MariaDB, SQLite3, Better-SQLite3, Oracle, and Amazon Redshift designed to be flexible, portable, and fun to use.",
      link: 'https://knexjs.org/',
      image: `${environment.urlApi}/knex.svg`
    },
    {
      name: "Next JS",
      description: "Next.js is an open-source web development framework created by the private company Vercel providing React-based web applications with server-side rendering and static rendering.",
      link: 'https://nextjs.org/',
      image: `${environment.urlApi}/nextjs2.svg`
    },
    {
      name: "Apache Httpd",
      description: "The Apache HTTP Server Project is an effort to develop and maintain an open-source HTTP server for modern operating systems including UNIX and Windows. The goal of this project is to provide a secure, efficient and extensible server that provides HTTP services in sync with the current HTTP standards.",
      link: 'https://httpd.apache.org/',
      image: `${environment.urlApi}/apache.svg`
    },
    {
      name: "C Sharp",
      description: "C# is a modern, innovative, open-source, cross-platform object-oriented programming language and one of the top 5 programming languages on GitHub.",
      link: 'https://learn.microsoft.com/en-us/dotnet/csharp/',
      image: `${environment.urlApi}/csharp.svg`
    },
    {
      name: "Apache Kafka",
      description: "Apache Kafka is an open-source distributed event streaming platform used by thousands of companies for high-performance data pipelines, streaming analytics, data integration, and mission-critical applications.",
      link: 'https://kafka.apache.org/',
      image: `${environment.urlApi}/kafka.svg`
    },
    {
      name: "Nix",
      description: "The Nix language is designed for conveniently creating and composing derivations – precise descriptions of how contents of existing files are used to derive new files. It is a domain-specific, purely functional, lazily evaluated, dynamically typed programming language.",
      link: 'https://nix.dev/tutorials/nix-language.html',
      image: `${environment.urlApi}/nix.svg`
    },
    {
      name: "Nest JS",
      description: "Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).",
      link: 'https://nestjs.com/',
      image: `${environment.urlApi}/nestjs.svg`
    },
    {
      name: "Jenkins",
      description: "Jenkins is an open source automation server. It helps automate the parts of software development related to building, testing, and deploying, facilitating continuous integration, and continuous delivery.",
      link: 'https://www.jenkins.io/',
      image: `${environment.urlApi}/jenkins.svg`
    },
    {
      name: "ASP.NET",
      description: "ASP.NET is a free, open-source web framework from Microsoft for building modern web apps and services with .NET. It's a server-side web application framework that allows developers to create dynamic web pages, applications, and services.",
      link: 'https://dotnet.microsoft.com/en-us/apps/aspnet',
      image: `${environment.urlApi}/aspnet.svg`
    },
    {
      name: "Java",
      description: "Java is a high-level, general-purpose, memory-safe, object-oriented programming language.",
      link: 'https://www.java.com/en/',
      image: `${environment.urlApi}/java.svg`
    },
    {
      name: "Spring Boot",
      description: "Spring Boot is an open-source Java framework used for programming standalone, production-grade Spring-based applications with a bundle of libraries that make project startup and management easier.",
      link: 'https://spring.io/projects/spring-boot/',
      image: `${environment.urlApi}/springboot.svg`
    },
    {
      name: "Hibernate",
      description: "Hibernate ORM is an object–relational mapping tool for the Java programming language.",
      link: 'https://hibernate.org/',
      image: `${environment.urlApi}/hibernate.svg`
    },
    {
      name: "Node JS",
      description: "Node.js is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.",
      link: 'https://nodejs.org/en',
      image: `${environment.urlApi}/nodejs.svg`
    },
    {
      name: "Express JS",
      description: "Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js, released as free and open-source software under the MIT License.",
      link: 'https://expressjs.com/',
      image: `${environment.urlApi}/expressjs.svg`
    },
    {
      name: "Microsoft Azure",
      description: "Microsoft Azure is a cloud computing platform, which you can think of as a giant digital toolbox with a seemingly endless supply of resources.",
      link: 'https://azure.microsoft.com/en-us/',
      image: `${environment.urlApi}/azure.svg`
    },
    {
      name: "Codeigniter",
      description: "CodeIgniter is a powerful PHP framework with a very small footprint, built for developers who need a simple and elegant toolkit to create full-featured web applications.",
      link: 'https://www.codeigniter.com/',
      image: `${environment.urlApi}/codeigniter.svg`
    },
    {
      name: "Laravel",
      description: 'Laravel is a PHP framework designed for building web applications. It follows the MVC pattern and offers robust tools for modern web development.',
      link: 'https://laravel.com/',
      image: `${environment.urlApi}/laravel.svg`
    },
    {
      name: "PHP",
      description: 'PHP is a popular general-purpose scripting language that is especially suited for web development.',
      link: 'https://www.php.net/',
      image: `${environment.urlApi}/php.svg`
    },
    {
      name: "Angular",
      description: 'Angular is a platform and framework for building single-page client applications using HTML and TypeScript.',
      link: 'https://angular.io',
      image: `${environment.urlApi}/angular17.svg`
    },
    {
      name: "Splade",
      description: 'Splade provides a super easy way to build Single Page Applications (SPA) using standard Laravel Blade templates, enhanced with renderless Vue 3 components. ',
      link: 'https://splade.dev/',
      image: `${environment.urlApi}/splade.svg`
    },
    {
      name: "Tailwind CSS",
      description: 'Tailwind CSS is a utility-first CSS framework for creating custom designs without having to leave your HTML.',
      link: 'https://tailwindcss.com/',
      image: `${environment.urlApi}/tailwindcss.svg`
    },
    {
      name: "Bootstrap",
      description: 'Bootstrap is a popular open-source CSS framework for developing responsive and mobile-first websites.',
      link: 'https://getbootstrap.com/',
      image: `${environment.urlApi}/bootstrap.svg`
    },
    {
      name: "Flowbite",
      description: 'Flowbite is a popular UI component library designed for Tailwind CSS, providing a set of accessible and customizable components for building modern web applications.',
      link: 'https://flowbite.com/',
      image: `${environment.urlApi}/flowbite.svg`
    },
    {
      name: "HTML5",
      description: 'HTML5 is the latest version of HyperText Markup Language, the standard for creating web pages and applications.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
      image: `${environment.urlApi}/html5.svg`
    },
    {
      name: "CSS3",
      description: 'CSS3 is the latest standard for Cascading Style Sheets, adding new features and improvements over previous versions.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
      image: `${environment.urlApi}/css3.svg`
    },
    {
      name: "JavaScript",
      description: 'JavaScript is a programming language that enables you to create dynamically updating content, control multimedia, and much more.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      image: `${environment.urlApi}/js.svg`
    },
    {
      name: "jQuery",
      description: 'jQuery is a fast, small, and feature-rich JavaScript library that simplifies things like HTML document traversal and manipulation.',
      link: 'https://jquery.com/',
      image: `${environment.urlApi}/jquery.svg`
    },
    {
      name: "Vite",
      description: 'Vite is a modern build tool that provides a fast development environment and optimized builds.',
      link: 'https://vitejs.dev/',
      image: `${environment.urlApi}/vitejs.svg`
    },
    {
      name: "MySQL",
      description: 'MySQL is an open-source relational database management system based on SQL (Structured Query Language).',
      link: 'https://www.mysql.com/',
      image: `${environment.urlApi}/mysql.svg`
    },
    {
      name: "GitHub",
      description: 'GitHub is a platform for version control and collaboration, allowing multiple people to work on projects simultaneously.',
      link: 'https://github.com/',
      image: `${environment.urlApi}/github.svg`
    },
    {
      name: "Bitbucket",
      description: 'Bitbucket is a Git-based source code repository hosting service owned by Atlassian.',
      link: 'https://bitbucket.org/',
      image: `${environment.urlApi}/bitbucket.svg`
    },
    {
      name: "Jira",
      description: 'Jira is a tool developed by Atlassian used for issue tracking and project management.',
      link: 'https://www.atlassian.com/software/jira',
      image: `${environment.urlApi}/jira.svg`
    },
    {
      name: "Figma",
      description: 'Figma is a powerful, collaborative design tool for teams. Explore ideas and gather feedback, build realistic prototypes.',
      link: 'https://www.figma.com',
      image: `${environment.urlApi}/figma.svg`
    },
    {
      name: "Postman",
      description: 'Postman is a powerful tool for API development, testing, and monitoring, used by developers to streamline their workflow.',
      link: 'https://www.postman.com/',
      image: `${environment.urlApi}/postman.svg`
    },
    {
      name: "ApiDog",
      description: 'ApiDog offers tools and services for testing and monitoring APIs to ensure their functionality and performance.',
      link: 'https://apidog.com/',
      image: `${environment.urlApi}/apidog-icon.svg`
    },
    {
      name: "AWS",
      description: 'Amazon Web Services (AWS) offers a comprehensive suite of cloud services for computing, storage, and networking.',
      link: 'https://aws.amazon.com/',
      image: `${environment.urlApi}/aws.svg`
    },
    {
      name: "Linux",
      description: 'Linux is a free and open-source operating system kernel used in many distributions for servers, desktops, and embedded systems.',
      link: 'https://ubuntu.com/',
      image: `${environment.urlApi}/linux.svg`
    },
    {
      name: "Ubuntu",
      description: 'Ubuntu is a popular free and open-source Linux-based operating system, is used for a wide range of purposes, including powering desktops, servers, cloud platforms.',
      link: 'https://www.kernel.org/',
      image: `${environment.urlApi}/ubuntu.svg`
    },
    {
      name: "Visual Studio Code",
      description: 'Visual Studio Code is a source-code editor developed by Microsoft with support for debugging, syntax highlighting, and version control.',
      link: 'https://code.visualstudio.com/',
      image: `${environment.urlApi}/vscode.svg`
    },
    {
      name: "ChatGPT",
      description: 'ChatGPT is an AI chatbot developed by OpenAI, is used for content writing, and assisting with coding, all through natural language processing.',
      link: 'https://chatgpt.com/',
      image: `${environment.urlApi}/openai.svg`
    },
    {
      name: "Atlassian",
      description: 'Atlassian provides software products for project management, software development, and team collaboration.',
      link: 'https://www.atlassian.com/',
      image: `${environment.urlApi}/atlassian.svg`
    },
    {
      name: "Spatie",
      description: 'Spatie is a web development company that provides a wide range of open-source packages for Laravel and other PHP projects.',
      link: 'https://spatie.be/',
      image: `${environment.urlApi}/spatie.svg`
    }, 
    {
      name: "Vercel",
      description: 'Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web',
      link: 'https://vercel.com',
      image: `${environment.urlApi}/vercel-icon-dark.svg`
    },
    {
      name: "TypeScript",
      description: 'TypeScript is a superset of JavaScript that compiles to plain JavaScript and provides static types.',
      link: 'https://www.typescriptlang.org/',
      image: `${environment.urlApi}/typescript.svg`
    },
    {
      name: "Swiper",
      description: 'Swiper is the most modern free and open source mobile touch slider with hardware accelerated transitions and amazing native behavior.',
      link: 'https://swiperjs.com/',
      image: `${environment.urlApi}/swipper.svg`
    },
    {
      name: "API-Ninjas",
      description: 'API Ninjas is a data company that enables you to build real applications using real data. API Ninjas maintains 78 APIs',
      link: 'https://api-ninjas.com/',
      image: `${environment.urlApi}/ninja.png`
    },
    {
      name: "Laravel Reverb",
      description: 'Reverb is a first-party WebSocket server for Laravel applications, bringing real-time communication between client and server directly to your fingertips.',
      link: 'https://reverb.laravel.com/',
      image: `${environment.urlApi}/reverb.svg`
    },
    {
      name: "Laravel Pulse",
      description: 'Laravel Pulse is a real-time application performance monitoring tool and dashboard for your Laravel application. ',
      link: 'https://pulse.laravel.com/',
      image: `${environment.urlApi}/pulse.svg`
    },
    {
      name: "Contentful",
      description: 'Contentful is a cloud-based content management system (CMS) that allows users to create, store, and manage content for websites, mobile apps, and other platforms. ',
      link: 'https://www.contentful.com/',
      image: `${environment.urlApi}/contentful.png`
    },
    {
      name: "Daily.Dev",
      description: 'Daily.dev is a professional network for developers, designed to help them improve their skills, collaborate with like-minded individuals, and grow within the developer community. ',
      link: 'https://daily.dev',
      image: `${environment.urlApi}/dailydev.svg`
    },
    {
      name: "Microsoft Loop",
      description: 'Loop is a note-taking platform that helps users organize, collaborate, and manage their notes efficiently.',
      link: 'https://loop.cloud.microsoft/learn',
      image: `${environment.urlApi}/loop.svg`
    },
    {
      name: "Affine",
      description: 'AFFiNE is an open-source, all-in-one workspace that combines the features of note-taking, project management, and collaboration tools like Notion',
      link: 'https://affine.pro',
      image: `${environment.urlApi}/affine.svg`
    },
    {
      name: "Docker",
      description: 'Docker is a software platform that facilitates building, testing, and deploying applications efficiently by packaging them into standardized units called containers.',
      link: 'https://www.docker.com',
      image: `${environment.urlApi}/docker.svg`
    },

  ];
}
