/* eslint-disable import/no-cycle */
import {Box, Flex} from '@chakra-ui/react';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {useLogin} from 'src/features/auth/hooks/use_is_login';
// import {useGlobalContext} from 'src/features/common/global_context';

export const Home: React.FC = () => {
  // const {currentUser} = useGlobalContext();
  const history = useHistory();
  const isLogin = useLogin();

  return (
    <>
      {isLogin ? (
        <Flex justifyContent="center" wrap="wrap">
          <Flex
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            align="center"
            border="1px solid gray"
            borderRadius="16px"
            h={100}
            justifyContent="center"
            m={2}
            w={300}
          >
            <Box as="p">指導を開始する</Box>
          </Flex>
          <Flex
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            align="center"
            border="1px solid gray"
            borderRadius="16px"
            h={100}
            justifyContent="center"
            m={2}
            w={300}
          >
            <Box as="p">履歴を見る</Box>
          </Flex>
          <Flex
            _hover={{
              cursor: 'pointer',
              opacity: 0.8,
            }}
            align="center"
            border="1px solid gray"
            borderRadius="16px"
            h={100}
            justifyContent="center"
            m={2}
            w={300}
            onClick={() => history.push('/patients')}
          >
            <Box as="p">患者一覧</Box>
          </Flex>
        </Flex>
      ) : (
        <Box>ログイン失敗</Box>
      )}
    </>
  );
};
