/////////////////////////////////////////
////////////    Importations  ///////////
/////////////////////////////////////////

// Angular Core
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Models
import { UnitModel } from '../../models/unit.model';
import { FileModel } from '../../models/unit-files.model';

// Components
import { UnitFilesComponent } from '../unit-files/unit-files.component';



@Component({
  selector: 'app-unit',
  standalone: true,
  imports: [CommonModule, UnitFilesComponent],
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent {

// Input Props
@Input() diskUnit!: UnitModel;

// Attributes
toggleUnitWindow: boolean = false;    // Toggle the window unit
dataFiles: FileModel[] = [];  // Data files of the disk unit
selectedDiskId?: number;    // Selected disk id



  /**
   * 
   * Methode used to open the window unit when user click on a disk
   * 
   * @param id 
   */
  openUnitWindow(id: number): void {

    // Get the id of the clicked disk
    this.selectedDiskId = id;

    // Toggle the window unit
    this.toggleUnitWindow = !this.toggleUnitWindow

  }



  /**
   * 
   * Methode used to close the window unit when user click on the close button. it reveive the state of the window unit from the child component
   * 
   * @param newState 
   */
  onChildWindowClose(newState: boolean) {
    this.toggleUnitWindow = newState;
  }
}
