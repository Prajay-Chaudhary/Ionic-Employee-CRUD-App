// add-employee-modal.component.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: 'add-employee-modal.component.html',
  styleUrls: ['add-employee-modal.component.scss'],
})
export class AddEmployeeModalComponent {
  constructor(private modalController: ModalController) {}

  addEmployee(employeeData: any) {
    // Handle adding employee logic here
    console.log('Adding employee:', employeeData);
    this.dismiss();
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
