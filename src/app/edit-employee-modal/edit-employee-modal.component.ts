import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../models/employee.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.scss'],
})
export class EditEmployeeModalComponent  implements OnInit {

  @Input() employee!: Employee;
  
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onSubmit(form: NgForm) {
    // Close the modal and pass the updated employee back
    this.modalController.dismiss({
      updatedEmployee: this.employee
    });
  }

}
