import { Injectable } from '@angular/core';
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  constructor() {}

  generateAvatar(seed: string): string {
    // Generate avatar using the seed value
    const avatar = createAvatar(lorelei, {
      seed: seed, // This could be a username or unique user identifier
    });

    // Convert the SVG to a Data URI for rendering in an <img> tag
    return avatar.toDataUri();
  }
}
