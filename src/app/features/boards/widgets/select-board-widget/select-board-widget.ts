import {Component} from '@angular/core';
import {SelectBoardList} from '../../components/select-board-list/select-board-list';
import {BoardStore} from '../../board-store';

@Component({
    selector: 'app-select-board-widget',
    imports: [
        SelectBoardList
    ],
    template: `
        <app-select-board-list [boards]="store.getBoards()" (selected)="store.setSelectedBoard($event)"
                               [currentBoard]="store.getSelected()"/>
    `,
    styles: ``
})
export class SelectBoardWidget {
    constructor(public readonly store: BoardStore) {
    }
}
