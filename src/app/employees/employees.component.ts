import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { EditEmployeeModalComponent } from '../edit-employee-modal/edit-employee-modal.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AddEmployeeModalComponent } from '../add-employee-modal/add-employee-modal.component';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  @ViewChild('employeeForm') employeeForm!: NgForm;
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  addEmployee(employeeData: Employee) {
    const newEmployee = { ...employeeData, materialAssigned: [] };
    this.employeeService.addEmployee(newEmployee as Employee).subscribe(() => {
      this.loadEmployees();
      this.employeeForm.reset();
      this.presentToast('Employee added successfully');
    });
  }

  updateEmployee(employee: Employee) {
    this.employeeService.updateEmployee(employee).subscribe(() => {
      this.loadEmployees();
    });
  }

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      this.loadEmployees();
      this.presentToast('Employee deleted successfully');
    });
  }

  async editEmployee(employee: Employee) {
    const modal = await this.modalController.create({
      component: EditEmployeeModalComponent,
      componentProps: { employee },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.updatedEmployee) {
      this.updateEmployee(data.updatedEmployee);
      this.presentToast('Employee edited successfully');
    }
  }

  async logout() {
    this.authService.logout();

    this.presentToast('Logout successful');
    this.router.navigate(['/login']);
  }

  async openAddEmployeeModal() {
    const modal = await this.modalController.create({
      component: AddEmployeeModalComponent,
    });

    await modal.present();

    // Listen for the modal to close and handle any data returned
    const { data } = await modal.onWillDismiss();
    if (data?.createdEmployee) {
      console.log('Employee created:', data.createdEmployee);
      this.loadEmployees();
    }
  }

  // Present a toast with the specified message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }
}
