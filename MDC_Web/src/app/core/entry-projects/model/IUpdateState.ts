
export interface IUpdateState {
  projectId?: number;     
  projectRequirementId?: number;     
  statusId?: number;
  justification?: string;
}

export class UpdateState implements IUpdateState {
  constructor() { }
}
