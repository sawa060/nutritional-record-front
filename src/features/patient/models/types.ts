import {PatientSex} from './patient_sex';

export interface PatientData {
  id: number;
  name: string;
  sex: PatientSex;
  email: string | null;
  phone_number: string | null;
  number: string;
  birthday: string;
}

export type PatientList = PatientData[];
