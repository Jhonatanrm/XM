
export interface IStateRequirement {
  categoryRequirementId?: number;     
  categoryRequirementName?: string;     
  comment?: string;
  daysBeforeFpo?: number;
  deadline?: Date;
  projectId?: number;
  projectRequirementRId?: number;
  receivedDate?: Date;
  remainingDays?: number;
  requirementId?: number;
  requirementName?: string;
  requirementStatusId?: number;
  requirementStatusName?: string;
}

export class StateRequirement implements IStateRequirement {
  constructor() { }
}
