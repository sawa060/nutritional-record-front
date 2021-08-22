import {Flex} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {index} from 'src/lib/api/patient';

import {CommonLayout} from '../components/layouts/common_layout';
import {Card} from '../features/patient/components/card';

export const Patients = (): JSX.Element => {
  const breadCrumbs = [
    {
      href: '/',
      text: 'ホーム',
    },
    {
      text: '患者一覧',
      isCurrent: true,
    },
  ];

  // const [patientList, setPatientList] = useState<PatientList>()

  useEffect(() => {
    const fetchPatientList = async () => {
      const res = await index();
      /* eslint-disable no-console */
      console.log(res.data.index);
    };

    fetchPatientList();
  }, []);

  return (
    <CommonLayout breadCrumbs={breadCrumbs}>
      <Flex wrap="wrap">
        <Card birthDay="1999/09/09" name="sample" number="123456" sex="male" />
        <Card birthDay="1999/09/09" name="sample" number="123456" sex="male" />
        <Card birthDay="1999/09/09" name="sample" number="123456" sex="male" />
        <Card birthDay="1999/09/09" name="sample" number="123456" sex="male" />
        <Card birthDay="1999/09/09" name="sample" number="123456" sex="male" />
      </Flex>
    </CommonLayout>
  );
};
