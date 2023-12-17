import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router,private toastController: ToastController) { }

  onRegister(formValue: any) {
    this.authService.register(formValue).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'User created successfully',
          duration: 2000
        });
        toast.present();
  
        this.router.navigate(['/login']);
      },
      error: async (error) => {
        const toast = await this.toastController.create({
          message: 'Registration error',
          duration: 2000
        });
        toast.present();
        console.error('Registration error:', error);
      }
    });
  }

}
