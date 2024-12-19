import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../core/interfaces/user.interface';
import { ApiService } from '../../../../core/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users: User[] = [];
  createUserForm: FormGroup;
  editUserForm: FormGroup;
  
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.createUserForm = this.formBuilder.group({
      firstname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]]
    });

    this.editUserForm = this.formBuilder.group({
      firstname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]],
      lastname: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(18),
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]]
    });
  }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  createUser() {
    const userData: User = this.createUserForm.value;
    this.apiService.createUser(userData).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while creating user:', err);
      },
      complete: () => {
        console.log('User creation completed.');
      }
    });
  }

  editUser(id: number) {
    const userUpdatedData: User = this.editUserForm.value;
    this.apiService.updateUser(id, userUpdatedData).subscribe({
      next: (response) => {
        console.log('User updated successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while updating user:', err);
      },
      complete: () => {
        console.log('User update completed.');
      }
    });

  }
  
  deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe({
      next: (response) => {
        console.log('User deleted successfully:', response);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error occurred while deleting user:', err);
      },
      complete: () => {
        console.log('User deletion completed.');
      }
    });
  }

}
