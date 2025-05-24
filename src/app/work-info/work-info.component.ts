import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-work-info',
  standalone: true,
  imports: [],
  templateUrl: './work-info.component.html',
  styleUrl: './work-info.component.css'
})
export class WorkInfoComponent {
  details: any;

  work = [
    {
      id: 0,
      name: 'iSeller Commerce',
      address: 'Kelapa Gading, Jakarta, Indonesia',
      from_date: 'Nov 2024',
      to_date: 'Present',
      overview: 'A commerce technology company providing a platform for omnichannel retail solutions.',
      role: 'Web Engineer',
      my_role: `As a Web Engineer at iSeller Commerce, I contributed to the development and maintenance of high-performance web applications. I worked primarily on backend services using .NET Core and ASP.NET, ensuring scalability and reliability of core business logic. Collaborated closely with cross-functional teams to build efficient systems for e-commerce solutions.`,
      projects: [],
      skillsAcquired: [
        { name: ".NET Architecture", image: "assets/img/dotnet.svg" },
        { name: ".NET Core", image: "assets/img/dotnetcore.svg" },
        { name: ".NET Framework", image: "assets/img/dotnetframework.svg" },
        { name: "ASP.NET", image: "assets/img/aspnet.svg" },
        { name: "Back-End Web Development", image: "assets/img/backend.svg" },
        { name: "Microsoft SQL Server", image: "assets/img/sqlserver.svg" },
        { name: "Language Integrated Query (LINQ)", image: "assets/img/linq.svg" }
      ],
      impact: 'This role helped sharpen my expertise in .NET technologies and enhanced my ability to deliver robust backend solutions under enterprise-grade demands.'
    },
    {
      id: 1,
      name: 'PT Digital Agensi Nusantara',
      address: 'Bandung, West Java, Indonesia',
      from_date: 'Sep 2024',
      to_date: 'Present',
      overview: 'A digital agency providing freelance-based IT solutions to clients.',
      role: 'Back End Developer',
      my_role: `As a freelance Backend Developer, I worked remotely on building RESTful APIs and deploying Laravel-based web applications. I supported DevOps workflows and contributed to server management and CI/CD pipelines.`,
      projects: [],
      skillsAcquired: [
        { name: "Laravel", image: "assets/img/laravel.svg" },
        { name: "DevOps", image: "assets/img/devops.svg" },
        { name: "REST APIs", image: "assets/img/api.svg" }
      ],
      impact: 'Contributed to agile development pipelines and improved backend reliability and performance across multiple client projects.'
    },
    {
      id: 2,
      name: 'Charitas Hospital Palembang',
      address: 'Palembang, South Sumatra, Indonesia',
      from_date: 'Feb 2023',
      to_date: 'Oct 2024',
      overview: 'A leading private hospital in Palembang focusing on patient care and medical systems integration.',
      role: 'Programmer',
      my_role: `At Charitas Hospital, I worked on various internal systems, including patient management and health records systems. I developed using Java, PHP (CodeIgniter, Laravel Lumen), and integrated multiple databases including SQL Server, MariaDB, and MySQL. I also supported frontend development and RESTful APIs.`,
      projects: [],
      skillsAcquired: [
        { name: "Java", image: "assets/img/java.svg" },
        { name: "CodeIgniter", image: "assets/img/codeigniter.svg" },
        { name: "Microsoft SQL Server", image: "assets/img/sqlserver.svg" },
        { name: "Front-End Development", image: "assets/img/frontend.svg" },
        { name: "ASP.NET", image: "assets/img/aspnet.svg" },
        { name: "MySQL", image: "assets/img/mysql.svg" },
        { name: "Laravel Lumen", image: "assets/img/laravel.svg" },
        { name: "PHP", image: "assets/img/php.svg" },
        { name: "REST APIs", image: "assets/img/api.svg" },
        { name: "MariaDB", image: "assets/img/mariadb.svg" },
        { name: "Back-End Web Development", image: "assets/img/backend.svg" },
        { name: "JavaScript", image: "assets/img/javascript.svg" },
        { name: "Node.js", image: "assets/img/nodejs.svg" },
        { name: "Apache Phoenix", image: "assets/img/apache.svg" },
        { name: "Team Building", image: "assets/img/team.svg" }
      ],
      impact: 'Developed mission-critical systems that supported hospital operations and improved digital workflows for staff.'
    },
    {
      id: 3,
      name: 'PT Sistem Manajemen Dewa Rangga',
      address: 'Bekasi, West Java, Indonesia',
      from_date: 'Feb 2023',
      to_date: 'May 2023',
      overview: 'An IT consulting company offering digital solutions to local clients.',
      role: 'Web Developer',
      my_role: `I worked remotely as a Web Developer to deliver full-stack solutions using Java and Node.js. Participated in design discussions and implemented scalable modules for client projects.`,
      projects: [],
      skillsAcquired: [
        { name: "Java", image: "assets/img/java.svg" },
        { name: "Node.js", image: "assets/img/nodejs.svg" },
        { name: "Team Building", image: "assets/img/team.svg" }
      ],
      impact: 'Improved my experience with server-side technologies while delivering high-quality freelance work.'
    },
    {
      id: 4,
      name: 'Dewa Rangga Group',
      address: 'Bekasi, West Java, Indonesia',
      from_date: 'Feb 2023',
      to_date: 'Mar 2023',
      overview: 'A business group focusing on various technology and consulting services.',
      role: 'Freelancer',
      my_role: `Worked as a freelancer on short-term projects, primarily contributing to development sprints and code reviews.`,
      projects: [],
      skillsAcquired: [
        { name: "Team Building", image: "assets/img/team.svg" }
      ],
      impact: 'Gained freelance experience and adapted quickly to project needs in a short time frame.'
    },
    {
      id: 5,
      name: 'PT. Kognitif Skema Indonesia (Schema.id)',
      address: 'Jakarta, Indonesia',
      from_date: 'Apr 2022',
      to_date: 'Jan 2023',
      overview: 'A digital certification and competency testing company.',
      role: 'Freelance Web Developer',
      my_role: `Worked on developing web applications using Laravel Lumen, CodeIgniter, and Spring Framework. Also contributed to backend development with PHP and Java, and database integration with Oracle and MariaDB.`,
      projects: [],
      skillsAcquired: [
        { name: "Laravel Lumen", image: "assets/img/laravel.svg" },
        { name: "PHP", image: "assets/img/php.svg" },
        { name: "CodeIgniter", image: "assets/img/codeigniter.svg" },
        { name: "Microsoft SQL Server", image: "assets/img/sqlserver.svg" },
        { name: "MariaDB", image: "assets/img/mariadb.svg" },
        { name: "Front-End Development", image: "assets/img/frontend.svg" },
        { name: "Back-End Web Development", image: "assets/img/backend.svg" },
        { name: "MySQL", image: "assets/img/mysql.svg" },
        { name: "JavaScript", image: "assets/img/javascript.svg" },
        { name: "Team Building", image: "assets/img/team.svg" },
        { name: "Java", image: "assets/img/java.svg" },
        { name: "Spring Framework", image: "assets/img/spring.svg" },
        { name: "Hibernate", image: "assets/img/hibernate.svg" },
        { name: "Oracle Database", image: "assets/img/oracle.svg" }
      ],
      impact: 'Expanded full-stack web development knowledge and worked with enterprise-level data platforms.'
    }
  ];



  constructor(
    @Inject(MAT_DIALOG_DATA) public companyId: number,  // Receive companyId as data
    private dialogRef: MatDialogRef<WorkInfoComponent>   // Inject MatDialogRef to close the dialog
  ) {
    // Find the company based on the passed companyId
    this.details = companyId;
  }

  onClose(): void {

    this.dialogRef.close(); // Closes the dialog
  }
}
