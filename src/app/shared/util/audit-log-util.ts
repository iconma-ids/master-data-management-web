import { Injectable } from '@angular/core';
import { AuditLog, IAuditLog } from '../model/audit-log';

@Injectable({ providedIn: 'root' })
export class AuditLogUtil {
  constructor() {}

  createAuditLogForm(
    loadInfoId: any,
    type: any,
    data: any,
    jsonObj: any
  ): IAuditLog {
    return {
      ...new AuditLog(),
      currentValue: jsonObj['currentValue'],
      previousValue: jsonObj['previousValue'],
      type: type,
      typeId: data.id,
      loadInfoId: loadInfoId,
    };
  }
}
