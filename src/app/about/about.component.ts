import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkInfoComponent } from '../work-info/work-info.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  constructor(private dialog: MatDialog) { }

  openPopup(companyId: any): void {
    console.log(companyId);
    const dialogWidth = window.innerWidth > 768 ? '800px' : '90%';

    this.dialog.open(WorkInfoComponent, {

      width: '80%',
      maxWidth: '1200px',
      data: companyId
    });
  }


  // Array of data
  aboutme: string = `I’m a Web & Backend Engineer who loves turning ideas into functional,
                     scalable solutions. From backend APIs to system architecture,
                     I enjoy solving problems, learning new tech, and exploring how things work
                     under the hood. Welcome to my tech journey—let’s build something awesome together! ✨`;



  work: Array<any> = [
    {
      id: 5,
      company: "Geek Garden Software House",
      position: "Freelancer Web Developer",
      time_period: "Jan 2023 - Feb 2023",
      place: "Wisma Abadi Jakarta, Indonesia",
      overview: "Geek Garden Software House is a technology provider serving the commerce, management system, ERP and etc like a vendor.",
      my_role:"As a Freelance Developer, Worked on developing web applications using CodeIgniter 4. Also contributed to backend development with PHP and database integration with MySQL",
      impact:"Expanded full-stack web development knowledge and worked with enterprise-level data platforms.",
      projects: [],
      fallback_summary: [
        "Worked as a freelance web developer, collaborating with clients to develop and deploy custom websites and web applications",
        "Developed responsive and user friendly front-end designs using HTML, CSS, Javascript",
        "Implemented back-end functionality using PHP and MySQL to support dynamic website features."

      ],
      tech: [
        {
          name: "Codeigniter",
          link: 'https://codeigniter.com/',
          image: 'assets/img/codeigniter.svg'
        },
        {
          name: "Mysql",
          link: 'https://www.mysql.com/',
          image: 'assets/img/mysql.svg'
        },
        {
          name: "HTML5",
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          image: 'assets/img/html5.svg'
        },
        {
          name: "CSS3",
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          image: 'assets/img/css3.svg'
        },
        {
          name: "JavaScript",
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          image: 'assets/img/js.svg'
        },
        {
          name: "jQuery",
          link: 'https://jquery.com/',
          image: 'assets/img/jquery.svg'
        },
      ]
    },
    {
      id: 6,
      company: "PT. Kognitif Skema Indonesia (Schema.id)",
      position: "Junior developer",
      time_period: "Apr 2022 - Jan 2023",
      place: "Wisma Abadi Jakarta, Indonesia",
      overview: "PT Kognitif Schema Indonesia is a technology provider serving the commerce, banking, and financial sectors.",
      my_role:"As a Jr. Developer, Worked on developing web applications using Laravel Lumen, CodeIgniter, and Spring Framework. Also contributed to backend development with PHP and Java, and database integration with Oracle and MariaDB.",
      impact:"Expanded full-stack web development knowledge and worked with enterprise-level data platforms.",
      projects: [
        {
          name: "SoloDigitalTechno",
          link: 'https://etraining.solodigitaltechnopark.co.id/',
          image: "assets/img/etraining.jpg",
        },
      ],
      fallback_summary: [],
      tech: [
        {
          name: "Laravel",
          link: 'https://laravel.com/',
          image: 'assets/img/laravel.svg'
        },
        {
          name: "Codeigniter",
          link: 'https://codeigniter.com/',
          image: 'assets/img/codeigniter.svg'
        },
        {
          name: "Mysql",
          link: 'https://www.mysql.com/',
          image: 'assets/img/mysql.svg'
        },
        {
          name: "HTML5",
          link: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          image: 'assets/img/html5.svg'
        },
        {
          name: "CSS3",
          link: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          image: 'assets/img/css3.svg'
        },
        {
          name: "JavaScript",
          link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          image: 'assets/img/js.svg'
        },
        {
          name: "jQuery",
          link: 'https://jquery.com/',
          image: 'assets/img/jquery.svg'
        },
        // {
        //   name: "Java",
        //   link: 'https://spring.io/projects/spring-boot',
        //   image: 'assets/img/java.svg'
        // },
        {
          name: "Oracle",
          link: 'https://www.oracle.com/',
          image: 'assets/img/oracle.svg'
        },
        {
          name: "Hibernate",
          link: 'https://hibernate.org/',
          image: 'assets/img/hibernate.svg'
        },
      ]
    }
  ]

  education: Array<any> = [
    {
      studied_at: "Manipal University Jaipur",
      qualified: "Bachelor of Computer Applications",
      time_period: "2024 - Present",
      place: "Online",
    },
    {
      studied_at: "NTTF Bangalore",
      qualified: "Computer Engineering &IT Infrastucture",
      time_period: "2019 - 2022",
      place: "Bangalore Karnataka India",
    },
    {
      studied_at: "GVHSS Sivapuram",
      qualified: "Plus Two Computer Science",
      time_period: "2017 - 2019",
      place: "Kozhikode Kerala",
    },
    {
      studied_at: "GHSS Balussery",
      qualified: "SSLC",
      time_period: "2016 - 2017",
      place: "Kozhikode Kerala",
    }
  ]
}
