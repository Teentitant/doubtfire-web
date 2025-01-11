import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss'],
})
export class PortfoliosComponent implements OnInit {
  activeTabIndex: number = 0;
  tabs = [
    { title: 'Select Student', seq: 0 },
    { title: 'View Progress', seq: 1 },
    { title: 'View Portfolio', seq: 2 },
    { title: 'Assess Portfolio', seq: 3 },
  ];

  portfolioFilter: string = 'allStudents';
  studentFilter: string = 'allStudents';
  search: string = '';
  allStudents: any[] = [];
  filteredStudents: any[] = [];
  selectedStudent: any = null;
  sortOrder: string = 'name';
  reverse: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    // Placeholder for API call to fetch students
    this.allStudents = [
      { studentId: 'S001', name: 'John Doe', tutorName: 'Mr. Smith', grade: 'A', hasPortfolio: true },
      { studentId: 'S002', name: 'Jane Doe', tutorName: 'Ms. Johnson', grade: 'B', hasPortfolio: false },
    ];
    this.filterStudents();
  }

  filterStudents(): void {
    // Apply filters to students list
    this.filteredStudents = this.allStudents.filter((student) => {
      return (
        (this.portfolioFilter === 'allStudents' || student.hasPortfolio) &&
        (this.studentFilter === 'allStudents' || student.tutorName === 'Mr. Smith') &&
        (!this.search || student.name.toLowerCase().includes(this.search.toLowerCase()))
      );
    });
  }

  setPortfolioFilter(filter: string): void {
    this.portfolioFilter = filter;
    this.filterStudents();
  }

  setStudentFilter(filter: string): void {
    this.studentFilter = filter;
    this.filterStudents();
  }

  setSortOrder(order: string): void {
    if (this.sortOrder === order) {
      this.reverse = !this.reverse;
    } else {
      this.sortOrder = order;
      this.reverse = false;
    }
    this.sortStudents();
  }

  sortStudents(): void {
    this.filteredStudents.sort((a, b) => {
      let comparison = 0;
      if (a[this.sortOrder] < b[this.sortOrder]) {
        comparison = -1;
      } else if (a[this.sortOrder] > b[this.sortOrder]) {
        comparison = 1;
      }
      return this.reverse ? comparison * -1 : comparison;
    });
  }

  selectStudent(student: any): void {
    this.selectedStudent = student;
  }

  assignGrade(grade: string): void {
    if (this.selectedStudent) {
      this.selectedStudent.grade = grade;
    }
  }
}
