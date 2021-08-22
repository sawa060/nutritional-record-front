import {Box, Flex, Image, Text} from '@chakra-ui/react';
import React, {forwardRef} from 'react';

import {patientSexMapper} from '../helpers/patient_sex_mapper';
import {PatientSex} from '../models/patient_sex';

interface CardProps {
  imageUrl?: string;
  name: string;
  sex: PatientSex;
  number: string;
  birthDay: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({imageUrl, name, sex, number, birthDay, ...props}, ref): JSX.Element => (
    <Flex
      ref={ref}
      m={1}
      p={2}
      {...props}
      border="1px solid"
      borderColor="gray.200"
      maxW={{base: '100%', md: '360px', lg: '510px'}}
    >
      <Image
        h="48px"
        mr={4}
        objectFit="contain"
        src={imageUrl || 'https://placehold.jp/158x158.png?text=NO IMAGE'}
        w="48px"
      />
      <Box>
        <Text fontSize="sm">{number}</Text>
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm">{birthDay}</Text>
        <Text fontSize="sm">{patientSexMapper(sex)}</Text>
      </Box>
    </Flex>
  ),
);
