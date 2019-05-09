import {Component, Input} from '@angular/core';

@Component({
    selector: 'avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
    @Input() avatarUrl:string = null;
    useAvatarFallback:boolean = false;
}
