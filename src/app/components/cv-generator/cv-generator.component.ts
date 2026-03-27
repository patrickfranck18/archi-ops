import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cv-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cv-generator.component.html',
  styleUrl: './cv-generator.component.scss'
})
export class CvGeneratorComponent implements OnInit {
  profile = {
  fullName: 'Patrick Arthur FRANCK',
  title: 'Ingénieur Logiciel Fullstack',
  email: 'franckpatrick18@gmail.com',
  phone: '+221 71 143 51 59',
  summary: 'Expert en solutions Angular & Clean Architecture.',
};
skills: string = "Angular 18, TypeScript, Tailwind CSS";

  missions: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    
    const allTasks = this.storageService.getTasks();
    this.missions = allTasks.filter(t => t.completed);
  }

  printCV() {
  const originalTitle = document.title;
  document.title = `CV_${this.profile.fullName.replace(/ /g, '_')}`; 
  window.print();
  document.title = originalTitle; 
}

  educations = [
  {
    period: '2019 - 2021',
    degree: 'Master Génie Logiciel',
    school: 'École Polytech Internationale',
    description: 'Spécialisation Génie Logiciel & Systèmes d\'Information.'
  },
  {
    period: '2016 - 2019',
    degree: 'Licence appliquée en Informatique',
    school: 'École Polytech Internationale',
    description: 'Mention Très Bien.'
  }
];
today = new Date();

}