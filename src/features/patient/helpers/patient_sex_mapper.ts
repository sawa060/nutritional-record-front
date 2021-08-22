import {FEMALE, MALE, OTHER, PatientSex} from '../models/patient_sex';

const mapper: Record<PatientSex, string> = {
  [MALE]: '男',
  [FEMALE]: '女',
  [OTHER]: 'その他',
};

export const patientSexMapper = (key?: PatientSex) => (key ? mapper[key] : undefined);
