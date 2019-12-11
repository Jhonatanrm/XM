import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export interface IPromoter {
  PromoterRID?: number;
  PromoterInstanceId?: number;
  PromoterNIT?: string;
  PromoterName?: string;
  PromoterAddress?: string;
  PromoterPhone?: string;
  IsAgent?: number;
  ValidFrom?: NgbDateStruct;
  ValidTo?: NgbDateStruct;
  VersionComments?: string;
  UserName?: string;
  id?: string;
  }
