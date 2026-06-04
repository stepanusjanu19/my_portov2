import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, ElementRef, HostListener, OnInit, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkInfoComponent } from '../work-info/work-info.component';
import { assetUrl } from '../shared/asset-url';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  constructor(private dialog: MatDialog) { }

  openPopup(companyId: any): void {
    if (!this.isBrowser) {
      return;
    }

    console.log(companyId);

    this.dialog.open(WorkInfoComponent, {

      width: '80%',
      maxWidth: '1200px',
      data: companyId
    });
  }

  
  isPaused = false;
  isInView = true;

  @ViewChild('marqueeContainer') marqueeContainer!: ElementRef;

  @HostListener('window:scroll', [])
  checkViewport(): void {
    if (!this.isBrowser) {
      return;
    }

    if (!this.marqueeContainer) return;

    const rect = this.marqueeContainer.nativeElement.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    this.isInView = isVisible;
  }

  ngOnInit(): void {
    this.checkViewport();
  }

  titleicons: string = `🔧 Backend Enthusiast.
                      💻 Web Engineer at Heart.
                      🚀 Always Building, Always Learning.`;


  // Array of data
  aboutme: string = `
                     I’m a Web & Backend Engineer who loves turning ideas into functional,
                     scalable solutions. From backend APIs to system architecture,
                     I enjoy solving problems, learning new tech, and exploring how things work
                     under the hood. My journey spans from Senior High School and then i am interesting for learn technology something like that.
                     Let's connect and embark on an exciting adventure through the fast universe of technology! 🚀.
                     `;



  work: Array<any> = [
    {
      id: 0,
      company: "iSeller Commerce",
      position: "Junior Web Engineer",
      time_period: "Nov 2024 - May 2025",
      place: "Kelapa Gading, Jakarta Utara",
      link_website: "https://www.isellercommerce.com/",
      overview: "iSeller Commerce is a technology provider serving the commerce, management system on product POS, Retail for target martketplace and other one.",
      my_role:"As a Junior Web Engineer, Worked on developing & maintance feature for business logic to Web Dashboard, POS, Retail and any product something need to marketplace and commerce",
      impact:"Have experience in the position of Junior Web Engineer on Backend Languange using ASP.NET with in SQL Server for database and then library like Rivets JS for this full web system.",
      projects: [],
      fallback_summary: [
        "Enhanced website performance by optimizing code and implementing responsive design techniques.",
        "Collaborated with cross-functional teams to develop and implement innovative web solutions for client projects.",
        "Stayed abreast of emerging web technologies, industry trends, and best practices to continuously improve skills and deliver cutting-edge solutions for clients",
        "Estimated work hours and tracked progress using Scrum methodology.",
        "Developing feature using .NET, .NET Core and within SQL Server for Web System, Rest API and then architecture MVVM on product."
      ],
      tech: [
        {
          name: "ASP.Net",
          link: 'https://dotnet.microsoft.com/en-us/apps/aspnet',
          image: assetUrl('aspnet.svg')
        },
        {
          name: "C#",
          link: 'https://dotnet.microsoft.com/en-us/languages/csharp',
          image: assetUrl('csharp.svg')
        },
        {
          name: "Microsoft SQL Server",
          link: 'https://www.microsoft.com/en/sql-server/',
          image: assetUrl('mssql.svg')
        },
        {
          name: "LINQ",
          link: 'https://learn.microsoft.com/en-us/dotnet/csharp/linq/',
          image: `https://miro.medium.com/v2/resize:fit:1400/1*eqrKSfWBIhAyVTEeTgxRxQ.jpeg`
        },

        
      ]
    },
    {
      id: 1,
      company: "PT Digital Agensi Nusantara",
      position: "Remote Backend Developer",
      time_period: "Sep 2024 - Present",
      place: "Bandung, West Java, Indonesia",
      link_website: "https://digyta.net/",
      overview: "PT Digital Agensi Nusantara is a technology provider serving the commerce, management system, ERP and etc like a vendor.",
      my_role:"As a Remote Backend Developer, Worked on developing business logic to API using Laravel and then integrated with third party like payment gateway, storage cloud, and then commerce platform with database integration with MySQL.",
      impact:"Have experience in the position of backend development in PHP (Laravel & Codeigniter) programming because it is also related to the field of this company.",
      projects: [
        {
          name: "Swap Up",
          link: '',
          image: assetUrl('swapup.webp'),
        },
      ],
      fallback_summary: [
        "Implemented a RESTfull API that allowed for automated data exchange between multiple applications.",
        "Developing Apps Laundry Retail using Laravel & React JS with integrated third party like payment gateway (Stripe), storage cloud (Consign Cloud), commerce platform (Shopify), and Delivery (Australian Pos) with queue of Redis Cache.",
        "Developing SIBAM Apps using Codeigniter with database integration MySQL"
      ],
      tech: [
        {
          name: "Laravel",
          link: 'https://laravel.com/',
          image: assetUrl('laravel.svg')
        },
        {
          name: "Codeigniter",
          link: 'https://codeigniter.com/',
          image: assetUrl('codeigniter.svg')
        },
        {
          name: "Mysql",
          link: 'https://www.mysql.com/',
          image: assetUrl('mysql.svg')
        },
        {
          name: "Redis",
          link: 'https://redis.io/',
          image: assetUrl('redis.svg')
        },
      ]
    },
    {
      id: 2,
      company: "Charitas Group Palembang",
      position: "Full Stack Developer",
      time_period: "Feb 2023 - Oktober 2024",
      place: "RS Charitas Hospital, Palembang",
      link_website: "https://charitashospital.com/",
      overview: "Charitas Group is one of the hospitals that has its own foundation that prioritizes patient health and has so far developed various technologies to facilitate efficiency and accuracy in health services.",
      my_role:"As a Full Stack Developer, Worked on developing business logic to services using PHP Framework, and then multi threading for message broker using Node JS & tools on Rabbit MQ as well as integrated traffice request from client Apps ERP & MIS health corporation using ASP.Net with database integration with Microsoft SQL Server.",
      impact:"Have experience in the position of full stack engineer in PHP, Node JS, C#, ASP.Net, & Laravel programming because it is also related to the field of this company.",
      projects: [
        {
          name: "SIM HIS RS",
          link: '',
          image: assetUrl('avicenna.jpeg'),
        },
        {
          name: "Queue Dashboard",
          link: '',
          image: assetUrl('dashboardqueue.jpeg'),
        },
      ],
      fallback_summary: [
        "Implemented a RESTfull API that allowed for automated data exchange between multiple applications.",
        "Maintance Apps with ASP.Net (C# & .NET) and then integrated for service Healthy Corporate (BPJS & Satu Sehat) and processing multi thread using Node JS message broker tools by Rabbit MQ of queue",
        "Developing Apps Order Diet Patient using Laravel with integrated for client Apps MIS healht corporation",
      ],
      tech: [
        {
          name: "ASP.Net",
          link: 'https://dotnet.microsoft.com/en-us/apps/aspnet',
          image: assetUrl('aspnet.svg')
        },
        {
          name: "Node JS",
          link: 'https://nodejs.org/en',
          image: assetUrl('nodejs.svg')
        },
        {
          name: "C#",
          link: 'https://dotnet.microsoft.com/en-us/languages/csharp',
          image: assetUrl('csharp.svg')
        },
        {
          name: "Laravel",
          link: 'https://laravel.com/',
          image: assetUrl('laravel.svg')
        },
        {
          name: "Codeigniter",
          link: 'https://codeigniter.com/',
          image: assetUrl('codeigniter.svg')
        },
        {
          name: "Express JS",
          link: 'https://expressjs.com/',
          image: assetUrl('expressjs.svg')
        },
        {
          name: "Sequelize",
          link: "https://sequelize.org/",
          image: assetUrl('sequelize.svg')
        },
        {
          name: "Knex JS",
          link: "https://knexjs.org/",
          image: assetUrl('knex.svg')
        },
        {
          name: "Mysql",
          link: 'https://www.mysql.com/',
          image: assetUrl('mysql.svg')
        },
        {
          name: "Microsoft SQL Server",
          link: 'https://www.microsoft.com/en/sql-server/',
          image: assetUrl('mssql.svg')
        },
      ]
    },
    {
      id: 3,
      company: "PT Sistem Manajemen DewaRangga",
      position: "Freelancer Web Developer",
      time_period: "Feb 2023 - May 2023",
      place: "",
      link_website: "",
      overview: "PT Sistem Manajemen DewaRangga is a technology provider serving like a vendor with variouse business including those in Digital Marketting, Application Development, and Cat-Related Retail.",
      my_role:"As a Freelance Developer, Worked on developing business logic to API using Node JS & Spring Boot Java with database integration with PostgreSQL.",
      impact:"Have experience in the position of backend engineer in Node JS & Spring Boot Java programming because it is also related to the field of this company.",
      projects: [],
      fallback_summary: [
        "Collaborated with clients to develop and implement custom web solutions, meeting their spesific requirements and objectives.",
        "Utilized Node JS and Spring Boot Java to implement back-end functionality, supporting dynamic website features.",
        "Provided ongoing maintance and support for existing websites, ensuring optimal perfomance and security",
        "Expanded developing REST API base on languange Spring Boot Java for Apps Store E-Commerce of electrical shop."
      ],
      tech: [
        {
          name: "Node JS",
          link: 'https://nodejs.org/en',
          image: assetUrl('nodejs.svg')
        },
        {
          name: "Express JS",
          link: 'https://expressjs.com/',
          image: assetUrl('expressjs.svg')
        },
        {
          name: "Sequelize",
          link: "https://sequelize.org/",
          image: assetUrl('sequelize.svg')
        },
        {
          name: "Knex JS",
          link: "https://knexjs.org/",
          image: assetUrl('knex.svg')
        },
        {
          name: "Java",
          link: 'https://www.java.com/en/',
          image: assetUrl('java.svg')
        },
        {
          name: "Spring Boot",
          link: 'https://spring.io/',
          image: assetUrl('springboot.svg')
        },
        {
          name: "Hibernate",
          link: 'https://hibernate.org/',
          image: assetUrl('hibernate.svg')
        },
        {
          name: "PostgreSQL",
          link: 'https://www.postgresql.org/',
          image: assetUrl('postgresql.svg')
        },
      ]
    },
    {
      id: 4,
      company: "Geek Garden Software House",
      position: "Freelancer Web Developer",
      time_period: "Jan 2023 - Feb 2023",
      place: "",
      link_website: "https://geekgarden.id/",
      overview: "Geek Garden Software House is a technology provider serving the commerce, management system, ERP and etc like a vendor.",
      my_role:"As a Freelance Developer, Worked on developing web applications using CodeIgniter 4. Also contributed to backend development with PHP and database integration with MySQL",
      impact:"Have experience in developing web system products for stock management for buying/selling gasoline for Pertamina & stock management web system using Codeigniter 4 technology which is focused on client vendors.",
      projects: [],
      fallback_summary: [
        "Worked as a freelance web developer, collaborating with clients to develop and deploy custom websites and web applications",
        "Developed responsive and user friendly front-end designs using HTML, CSS, Javascript",
        "Implemented back-end functionality using PHP and MySQL to support dynamic website features.",
        "Provided ongoing maintance and support for existing websites, ensuring optimal perfomance and security"
      ],
      tech: [
        {
          name: "Codeigniter",
          link: 'https://codeigniter.com/',
          image: assetUrl('codeigniter.svg')
        },
        {
          name: "Mysql",
          link: 'https://www.mysql.com/',
          image: assetUrl('mysql.svg')
        },
        {
          name: "HTML5",
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          image: assetUrl('html5.svg')
        },
        {
          name: "CSS3",
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          image: assetUrl('css3.svg')
        },
        {
          name: "JavaScript",
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          image: assetUrl('js.svg')
        },
        {
          name: "jQuery",
          link: 'https://jquery.com/',
          image: assetUrl('jquery.svg')
        },
      ]
    },
    {
      id: 5,
      company: "PT. Kognitif Skema Indonesia (Schema.id)",
      position: "Junior Web developer",
      time_period: "Apr 2022 - Jan 2023",
      place: "Wisma Abadi Jakarta, Indonesia",
      link_website: "https://schema.id/#/",
      overview: "PT Kognitif Schema Indonesia is a technology provider serving the commerce, banking, and financial sectors.",
      my_role:"As a Jr. Developer, Worked on developing web applications using Laravel Lumen, CodeIgniter, and Spring Framework. Also contributed to backend development with PHP and Java, and database integration with Oracle and MariaDB.",
      impact:"Expanded full-stack web development knowledge and worked with enterprise-level data platforms.",
      projects: [
        {
          name: "SoloDigitalTechno",
          link: 'https://etraining.solodigitaltechnopark.co.id/',
          image: assetUrl('etraining.jpg'),
        },
      ],
      fallback_summary: [
        "Developed and maintained backend functionality for web applications using PHP, JavaScript, and MySQL. (ELearning)",
        "Collaborated with crossfunctional teams to gather requirements and implement new features and enhancements.",
        "Optimized database queries and code performance to improve application speed and response time.",
        "Utilized version control systems, such as Git, to manage codebase and facilitate collaboration.",
        "Maintenance apps base languange for java from Mandiri Bank of Vendor Kognitif Schema Indonesia Co."
      ],
      tech: [
        {
          name: "Laravel",
          link: 'https://laravel.com/',
          image: assetUrl('laravel.svg')
        },
        {
          name: "Codeigniter",
          link: 'https://codeigniter.com/',
          image: assetUrl('codeigniter.svg')
        },
        {
          name: "Mysql",
          link: 'https://www.mysql.com/',
          image: assetUrl('mysql.svg')
        },
        {
          name: "HTML5",
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          image: assetUrl('html5.svg')
        },
        {
          name: "CSS3",
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          image: assetUrl('css3.svg')
        },
        {
          name: "JavaScript",
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          image: assetUrl('js.svg')
        },
        {
          name: "jQuery",
          link: 'https://jquery.com/',
          image: assetUrl('jquery.svg')
        },
        {
          name: "Spring Boot",
          link: 'https://spring.io/',
          image: assetUrl('springboot.svg')
        },
        {
          name: "Oracle",
          link: 'https://www.oracle.com/',
          image: assetUrl('oracle.svg')
        },
        {
          name: "Hibernate",
          link: 'https://hibernate.org/',
          image: assetUrl('hibernate.svg')
        },
      ]
    }
  ]

  education: Array<any> = [
    {
      studied_at: "Multi Data Palembang University",
      qualified: "Bachelor of Information Science",
      time_period: "Sep 2017 - Jun 2021",
      place: "Palembang. Indonesia",
    },
    {
      studied_at: "Xaverius 3 Senior High School",
      qualified: "Social Science",
      time_period: "Jun 2014 - Jun 2017",
      place: "Palembang. Indonesia",
    },
  ]

  skills: Array<any> = [
    { name: 'Laravel', image: assetUrl('laravel.svg')},
    { name: '.NET', image: assetUrl('aspnet.svg')},
    { name: 'Java', image: assetUrl('java.svg') },
    { name: 'Spring Boot', image: assetUrl('springboot.svg') },
    { name: 'Swipper', image: assetUrl('swipper.svg') },
    { name: 'Redis Cache', image: assetUrl('redis.svg') },
    { name: 'PostgreSQL', image: assetUrl('postgresql.svg') },
    { name: 'C Sharp', image: assetUrl('skills/csharp.svg') },
    { name: 'Codeigniter', image: assetUrl('skills/codeigniter.svg') },
    { name: 'Rabbit MQ', image: assetUrl('skills/rabbitmq.svg') },
    { name: 'Linux', image: assetUrl('skills/linux.svg') },
    { name: 'CSS', image: assetUrl('css3.svg') },
    { name: 'Tailwind UI', image: assetUrl('skills/tailwind.svg') },
    { name: 'React JS', image: assetUrl('skills/react.svg') },
    { name: 'Free BSD', image: assetUrl('skills/freebsd.svg') },
    { name: 'Microsft SQL Server', image: assetUrl('mssql.svg') },
    { name: 'Node JS', image: assetUrl('nodejs.svg') },
    { name: 'Vue JS', image: assetUrl('vuejs.svg') },
    { name: 'Vite JS', image: assetUrl('vitejs.svg') },
    { name: 'TypeScript', image: assetUrl('typescript.svg') },
    { name: 'PHP', image: assetUrl('php.svg') },
    { name: 'Oracle', image: assetUrl('oracle.svg') },
    { name: 'MySQL', image: assetUrl('mysql.svg') },
    { name: 'Jira', image: assetUrl('jira.svg') },
    { name: 'Javascript', image: assetUrl('js.svg') },
    { name: 'JQuery', image: assetUrl('jquery.svg') },
    { name: 'FlowBite', image: assetUrl('flowbite.svg') },
    { name: 'Docker', image: assetUrl('docker.svg') },
    { name: 'Hibernate', image: assetUrl('hibernate.svg') },
    { name: 'Knex JS', image: assetUrl('knex.svg') },
    { name: 'AWS Cloud', image: assetUrl('aws.svg') },
    { name: 'Github', image: assetUrl('github.svg') },
    { name: 'Angular', image: assetUrl('angular17.svg') },
    { name: 'API Dog Client', image: assetUrl('apidog-icon.svg') },
    { name: 'Sequelize', image: assetUrl('sequelize.svg') },
    { name: 'Mongo DB', image: assetUrl('skills/mongodb.svg') },
    { name: 'Next JS', image: assetUrl('nextjs2.svg') },
    { name: 'Python', image: assetUrl('skills/python.svg') },
    { name: 'Golang', image: assetUrl('go.svg') },
    { name: 'Fiber', image: assetUrl('gofiber.svg') },
    { name: 'Nix Lang', image: assetUrl('nix.svg') },
    { name: 'Microsoft Azure', image: assetUrl('azure.svg') },
    { name: 'Apache Httpd', image: assetUrl('apache.svg') },
    { name: 'Apache Kafka', image: assetUrl('kafka.svg') },
    { name: 'Jenkins', image: assetUrl('jenkins.svg') },
    { name: 'Reverb', image: assetUrl('reverb.svg') },
    { name: 'Nest JS', image: assetUrl('nestjs.svg') },
  ];
}
