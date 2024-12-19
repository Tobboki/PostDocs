import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../core/interfaces/user.interface';
import { AvatarService } from '../../../../core/services/avatar.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user: User | null = null;
  userAvatarUrl: string = '';

  constructor(private avatarService: AvatarService) {}

  ngOnInit(): void {
    if (this.user) {
      this.userAvatarUrl = this.avatarService.generateAvatar(this.user.firstname + this.user.lastname);
    }
  }
}
