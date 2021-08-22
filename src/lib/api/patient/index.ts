import {PatientList} from 'src/features/patient/models/types';

import {axiosClient} from '../client';

interface Index {
  index: PatientList;
  total: number;
}

// index
export const index = (
  fields?: string[],
  limit?: number,
  offset?: number,
  simple_search?: string,
) => {
  const fieldsText = fields ? fields.join('%2C') : '';
  const limitText = limit ? `&limit=${String(limit)}` : '';
  const offsetText = offset ? `&offset=${String(offset)}` : '';
  const simpleSearchText = simple_search ? `&simple_search=${simple_search}` : '';

  return axiosClient.get<Index>(
    `/patients/${
      fieldsText && `?fields=${fieldsText}`
    }${limitText}${offsetText}${simpleSearchText}`,
  );
};

// show
