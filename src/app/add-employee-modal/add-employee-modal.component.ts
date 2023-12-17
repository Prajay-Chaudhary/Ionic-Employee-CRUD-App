import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: 'add-employee-modal.component.html',
  styleUrls: ['add-employee-modal.component.scss'],
})
export class AddEmployeeModalComponent {
  constructor(
    private modalController: ModalController,
    private employeeService: EmployeeService
  ) {}

  addEmployee(employeeForm: NgForm) {
    if (employeeForm.valid) {
      const employeeData = employeeForm.value;
      const newEmployee = { ...employeeData, materialAssigned: [] };

      this.employeeService.addEmployee(newEmployee).subscribe(
        () => {
          console.log('Employee added successfully');
          this.dismiss({ createdEmployee: newEmployee });
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }

  dismiss(data?: any) {
    this.modalController.dismiss(data);
  }
}
