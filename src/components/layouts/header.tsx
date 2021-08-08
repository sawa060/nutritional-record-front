/* eslint-disable import/no-cycle */

import {Box, Button, Flex, Heading} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {GlobalContext} from '../../App';
import {signOut} from '../../lib/api/auth';

export const Header = (): JSX.Element => {
  const {isSignedIn, setIsSignedIn, currentUser} = useContext(GlobalContext);

  const history = useHistory();

  // TODO 後でhooksに切り出す
  const handleSignOut = async () => {
    try {
      const res = await signOut();

      /* eslint-disable no-console */
      if (res.data.success) {
        Cookies.remove('_access_token');
        Cookies.remove('_client');
        Cookies.remove('_uid');

        setIsSignedIn(false);
        history.push('/login');
      }
    } catch (error) {
      // TODO error handling
      console.log(error);
    }
  };

  const AuthButtons = () => {
    /** 認証完了後はサインアウトのボタンを表示
     * も認証時は認証用のボタンを表示
     */
    if (isSignedIn) {
      return (
        <Button colorScheme="white" size="sm" variant="ghost" onClick={handleSignOut}>
          ログアウト
        </Button>
      );
    }
    return (
      <Button colorScheme="white" component={Link} size="sm" to="/login" variant="ghost">
        ログイン
      </Button>
    );
  };

  return (
    <Flex
      align="center"
      as="nav"
      bgColor="teal.500"
      color="white"
      justify="space-between"
      padding={4}
      w="100%"
      wrap="wrap"
    >
      <Heading as="p" fontSize={{base: 'md', md: '2xl'}} fontWeight="bold">
        Nutrition Record
      </Heading>
      <Flex align="center" ml="auto">
        <Box as="p" mr={2}>
          {currentUser?.name}
        </Box>
        <Box>{AuthButtons()}</Box>
      </Flex>
    </Flex>
  );
};
