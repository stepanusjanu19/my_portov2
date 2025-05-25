import { Component } from '@angular/core';
import { environment } from './../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  readMore: Boolean = true;

  baseurl: string = environment.urlApi;

  iconSize: string = '1.75rem';
  iconSvgClass: string = 'w-5 h-5 md:w-6 md:h-6';

  visibleProjects: Array<any> = [];
  itemsPerPage = 4;

  projects: Array<any> = [
    {
      name: "My Portofolio",
      description: "A personal portfolio website designed to display my development skills and projects. This highlights my proficiency in React, and more.",
      image: `${this.baseurl}/myporto.webp`,
      github: "https://github.com/stepanusjanu19/my_porto",
      view: "https://stepanusjanuporto.vercel.app",
      status: false,
      date: "Sep 2021 - Okt 2024",
      demo: false,
      personal: true,
      tech: [
        {
          name: "React",
          image: `${this.baseurl}/reactjs.svg`,
        },
        {
          name: "Tailwind",
          image: `${this.baseurl}/tailwindcss.svg`,
        },
        {
          name: "Vite JS",
          image: `${this.baseurl}/vitejs.svg`,
        },
        {
          name: "Javascript",
          image: `${this.baseurl}/js.svg`,
        },
      ]
    },
    {
      name: "Employee System",
      description: "An Employee for system build use integration data employee and process from Attendance to Financial.",
      image: `${this.baseurl}/sig.jpg`,
      github: "https://github.com/stepanusjanu19/sistempegawai",
      view: false,
      status: false,
      date: "Jan 2020 - June 2020",
      demo: false,
      tech: [
         {
          name: "PHP",
          image: `${this.baseurl}/php.svg`,
        },
        {
          name: "Codeigniter",
          image: `${this.baseurl}/codeigniter.svg`,
        },
        {
          name: "Mysql",
          image: `${this.baseurl}/mysql.svg`,
        },
        {
          name: "Bootstrap",
          image: `${this.baseurl}/bootstrap.svg`,
        },
      ]
    },
    {
      name: "E-Training",
      description: "eTraining Solo Technopark is an online learning platform managed by Solo Technopark (Indonesia). The system is designed to provide training and skill development programs across multiple industry sectors, with the goal of improving workforce competency and promoting tech-based entrepreneurship.",
      image: `${this.baseurl}/etraining.webp`,
      github: false,
      view: "https://etraining.solodigitaltechnopark.co.id/",
      status: false,
      date: "April 2022 - Juli 2022",
      demo: false,
      tech: [
        {
          name: "PHP",
          image: `${this.baseurl}/php.svg`,
        },
        {
          name: "Codeigniter",
          image: `${this.baseurl}/codeigniter.svg`,
        },
        {
          name: "Firebase",
          image: `${this.baseurl}/firebase.svg`,
        },
        {
          name: "Mysql",
          image: `${this.baseurl}/mysql.svg`,
        },
        {
          name: "Bootstrap",
          image: `${this.baseurl}/bootstrap.svg`,
        },
      ]
    },
    {
      name: "BPJS Service from HIS Apps",
      description: "An a BPJS Service integration with existing system HIS Apps on Information System Management Hospital Core.",
      image: `${this.baseurl}/avicenna.webp`,
      github: false,
      view: false,
      status: false,
      date: "Apr 2023 - Jan 2024",
      demo: false,
      personal: false,
      tech: [
        {
          name: "C Sharp",
          image: `${this.baseurl}/csharp.svg`,
        },
        {
          name: ".NET",
          image: `${this.baseurl}/aspnet.svg`,
        },
        {
          name: "Microsoft SQL Server",
          image: `${this.baseurl}/mssql.svg`,
        },
        {
          name: "Node JS",
          image: `${this.baseurl}/nodejs.svg`,
        },
        {
          name: "PHP",
          image: `${this.baseurl}/php.svg`,
        },
      ]
    },
    {
      name: "Queue Dashboard with Mobile JKN",
      description: "An a queue dashboard integration with existing system HIS Apps on Information System Management Hospital Core and then third party on Mobile JKN (BPJS)",
      image: `${this.baseurl}/dashboardqueue.jpeg`,
      github: "https://github.com/stepanusjanu19/dashboard_antrian",
      view: false,
      status: false,
      date: "Jan 2024 - June 2024",
      demo: false,
      personal: false,
      tech: [
        {
          name: "C Sharp",
          image: `${this.baseurl}/csharp.svg`,
        },
        {
          name: ".NET",
          image: `${this.baseurl}/aspnet.svg`,
        },
        {
          name: "Microsoft SQL Server",
          image: `${this.baseurl}/mssql.svg`,
        },
        {
          name: "Node JS",
          image: `${this.baseurl}/nodejs.svg`,
        },
        {
          name: "PHP",
          image: `${this.baseurl}/php.svg`,
        },
        {
          name: "Laravel",
          image: `${this.baseurl}/laravel.svg`,
        },
      ]
    },
    {
      name: "Swap Up",
      description: "SwapUp is an Australian-based online thrift and consignment store specializing in high-quality secondhand women's and kids' fashion. Founded in Sydney, SwapUp aims to make secondhand shopping mainstream by offering a convenient, sustainable, and stylish alternative to fast fashion.",
      image: `${this.baseurl}/swapup.webp`,
      github: false,
      view: "https://swapup.com.au/",
      status: true,
      date: "Sep 2024 - Okt 2024",
      demo: true,
      personal: false,
      tech: [
                {
          name: "React",
          image: `${this.baseurl}/reactjs.svg`,
        },
        {
          name: "Tailwind",
          image: `${this.baseurl}/tailwindcss.svg`,
        },
        {
          name: "Vite JS",
          image: `${this.baseurl}/vitejs.svg`,
        },
        {
          name: "Javascript",
          image: `${this.baseurl}/js.svg`,
        },
        {
          name: "Mysql",
          image: `${this.baseurl}/mysql.svg`,
        },
        {
          name: "PHP",
          image: `${this.baseurl}/php.svg`,
        },
        {
          name: "Laravel",
          image: `${this.baseurl}/laravel.svg`,
        },
      ]
    },
  ]

  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    const next = this.projects.slice(this.visibleProjects.length, this.visibleProjects.length + this.itemsPerPage);
    this.visibleProjects = [...this.visibleProjects, ...next];
  }

  isDescriptionLong(text: string): string | boolean {
    return text && text.length > 160;
  }

  toggleReadMore(project: any) {
    this.readMore = !this.readMore;
  }
}
