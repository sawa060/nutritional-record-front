import {Box} from '@chakra-ui/react';
import React from 'react';
import {Breadcrumb} from 'src/components/common/breadcrumb';

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

  return (
    <Box>
      <Breadcrumb breadCrumbs={breadCrumbs} />
    </Box>
  );
};
