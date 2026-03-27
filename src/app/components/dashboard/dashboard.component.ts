import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { RouterModule } from '@angular/router';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
  category: string;
}
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';

  constructor(private storageService: StorageService) {}

 ngOnInit(): void {
  const savedTasks = this.storageService.getTasks();
  this.tasks = this.storageService.getTasks();
  
  this.tasks = savedTasks.map(t => ({
    ...t,
    createdAt: new Date(t.createdAt)
  }));
}
newTaskDescription: string = '';

addTask() {
  if (this.newTaskTitle.trim()) {
    const newTask = {
      id: Date.now(),
      title: this.newTaskTitle,
      description: this.newTaskDescription, 
      completed: false,
      category: this.selectedCategory,
      createdAt: new Date()
    };
    this.tasks.push(newTask);
    this.storageService.saveTasks(this.tasks);
    
    
    this.newTaskTitle = '';
    this.newTaskDescription = '';
  }
  this.storageService.saveTasks(this.tasks);
}

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.save();
    this.storageService.saveTasks(this.tasks);
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
    this.storageService.saveTasks(this.tasks);
  }

  private save(): void {
    this.storageService.saveTasks(this.tasks);
  }

  
get totalTasks(): number {
  return this.tasks.length;
}

get completedTasks(): number {
  return this.tasks.filter(t => t.completed).length;
}

get completionPercentage(): number {
  if (this.totalTasks === 0) return 0;
  return Math.round((this.completedTasks / this.totalTasks) * 100);
}


  
  selectedCategory: string = 'Professionnel';
  
  categories = [
    { name: 'Professionnel', color: 'bg-blue-500/20 text-blue-400 border-blue-500/50' },
    { name: 'Personnel', color: 'bg-purple-500/20 text-purple-400 border-purple-500/50' },
    { name: 'Urgent', color: 'bg-red-500/20 text-red-400 border-red-500/50' },
    { name: 'Apprentissage', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' }
  ];


  
  getCategoryClass(categoryName: string): string {
    return this.categories.find(c => c.name === categoryName)?.color || '';
  }
  
  
searchTerm: string = '';


get filteredTasks(): Task[] {
  return this.tasks.filter(task => 
    task.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    task.category.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}


isDarkMode: boolean = true; 

toggleTheme(): void {
  this.isDarkMode = !this.isDarkMode;
}
resetSystem() {
  if (confirm("Voulez-vous vraiment supprimer toutes vos missions ? Cette action est irréversible.")) {
    this.storageService.clearAllData();
    this.tasks = [];
  }
}
}