export interface IRequirementProject {
  categoryRequirementId?: number;     
  categoryRequirementName?: string;
  daysBeforeFpo?: number;
  deadline?: String;
  projectId?: number;
  projectRequirementInstanceId?: number;   
  projectRequirementRId?: number;    
  receivedDate?: string;
  remainingDays?: number;
  requirementId?: number;
  requirementName?: string;    
  requirementStatusId?: number;
  requirementStatusName?: string;     
}

export class RequirementProject implements IRequirementProject {
  constructor() { }
}
