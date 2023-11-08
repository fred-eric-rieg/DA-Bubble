import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DirectmessagesService } from 'src/app/shared/services/directmessages/directmessages.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-contactbox',
  templateUrl: './contactbox.component.html',
  styleUrls: ['./contactbox.component.scss']
})
export class ContactboxComponent {

  message = false;
  messageObject: any = {};

  constructor(
    public us: UserService,
    private renderer: Renderer2,
    private dms: DirectmessagesService,
    private router: Router
  ) {
    this.us.getContacts();
  }


  /**
   * Creates and renders a message to ask the user if he wants to start a direct message
   * with this contact.
   * @param event as MouseEvent
   */
  askDirectMessage(event: MouseEvent) {
    this.messageObject = document.body.appendChild(document.createElement('div'));
    this.messageObject.textContent = "Click to start a direct message";
    this.renderer.setStyle(this.messageObject, 'position', 'absolute');
    this.renderer.setStyle(this.messageObject, 'top', event.clientY + 'px');
    this.renderer.setStyle(this.messageObject, 'left', event.clientX + 'px');
    this.renderer.setStyle(this.messageObject, 'background-color', '#000');
    this.renderer.setStyle(this.messageObject, 'color', '#fff');
    this.renderer.setStyle(this.messageObject, 'padding', '0.5rem');
    this.renderer.setStyle(this.messageObject, 'width', 'fit-content');
    this.renderer.setStyle(this.messageObject, 'border-radius', '0.5rem');
    this.renderer.setStyle(this.messageObject, 'text-align', 'center');
    this.renderer.setStyle(this.messageObject, 'z-index', '999');
    this.renderer.setStyle(this.messageObject, 'cursor', 'pointer');
  }

  /**
   * Removes the message from the screen when the user moves the mouse out of the contact box.
   */
  removeMessage() {
    this.messageObject.remove();
  }


  async startDirectMessage(contact: any) {
    this.messageObject.remove();
    let dm = await this.dms.existsDirectMessage(contact.id);
    if ( dm ) {
      this.router.navigate(['/dashboard/directmessage/' + Object.keys(dm)[0]]);
      return;
    }
    let dmId = await this.dms.createDirectMessageChannel(contact.id);
    this.router.navigate(['/dashboard/directmessage/' + dmId]);
  }
}
