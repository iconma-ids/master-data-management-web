import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
// import { IColumnConfiguration } from "src/app/shared/model/column-configuration.model";

// import { AppEventManager } from "src/app/shared/service/app-event-manager";
import { ColumnConfigurationService } from "./column-configuration.service";
import { IColumnConfiguration } from "../../shared/shared/column-configuration.model";
import { AppEventManager } from "../../shared/service/app-event-manager";





@Component({
    templateUrl: './column-configuration-delete-dialog.component.html',
  })
  export class ColumnConfigurationDeleteDialogComponent {
    columnConfiguration?: IColumnConfiguration;

    constructor(protected  columnConfigurationService: ColumnConfigurationService, public activeModal: NgbActiveModal,protected eventManager: AppEventManager) {}
  
    cancel(): void {
      this.activeModal.dismiss();
    }
  
    confirmDelete( columnConfiguration: any): void {
      this. columnConfigurationService.delete(columnConfiguration.id).subscribe(() => {
        this.eventManager.broadcast('columnConfigurationListModification');
        this.activeModal.close();
      });
    }
  }
