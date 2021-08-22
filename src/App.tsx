/** --------refactor-------- */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/** ------------------------ */

import {ChakraProvider} from '@chakra-ui/react';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {useLogin} from './features/auth/hooks/use_is_login';
import {GlobalContextProvider, useGlobalContext} from './features/common/global_context';
import {getCurrentUser} from './lib/api/auth';
import {Home} from './pages/home';
import {Login} from './pages/login';
import {Patients} from './pages/patients';
import {SignUp} from './pages/sign_up';

export const App: React.FC = () => {
  const {setCurrentUser} = useGlobalContext();
  const isLogin = useLogin();

  /** 認証済みユーザーの有無のチェック
   * 確認できたらそのユーザー情報を取得
   */
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.status === 200) {
        setCurrentUser(res?.data.currentUser);
      } else {
        console.log('no current user');
        // TODO アラート処理
      }
    } catch (error) {
      console.log('error');
      // TODO error handling
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ユーザーが認証済みかどうかでルーティングを決定
   * 未認証の場合はログインページへ飛ばす
   */
  const Private = ({children}: {children: React.ReactElement}) => {
    if (isLogin) {
      return children;
    }
    return <Redirect to="/login" />;
  };

  return (
    <ChakraProvider>
      <Router>
        <GlobalContextProvider>
          <Switch>
            <Route exact component={Login} path="/login" />
            <Route exact component={SignUp} path="/signup" />
            <Private>
              <Switch>
                <Route exact component={Home} path="/" />
                <Route exact component={Patients} path="/patients" />
              </Switch>
            </Private>
          </Switch>
        </GlobalContextProvider>
      </Router>
    </ChakraProvider>
  );
};

/* eslint-disable import/no-default-export */
export default App;
