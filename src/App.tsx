/** --------refactor-------- */
/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
/** ------------------------ */

import {ChakraProvider} from '@chakra-ui/react';
import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

import {CommonLayout} from './components/layouts/common_layout';
import {User} from './features/auth/auth_types';
import {getCurrentUser} from './lib/api/auth';
import {Home} from './pages/home';
import {Login} from './pages/login';
import {SignUp} from './pages/sign_up';

// グローバルで扱う変数、関数
export const GlobalContext = createContext(
  {} as {
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  },
);

export const App: React.FC = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  /** 認証済みユーザーの有無のチェック
   * 確認できたらそのユーザー情報を取得
   */
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.status === 200) {
        setIsSignedIn(true);
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
  }, []);

  /** ユーザーが認証済みかどうかでルーティングを決定
   * 未認証の場合はログインページへ飛ばす
   */
  const Private = ({children}: {children: React.ReactElement}) => {
    if (isSignedIn) {
      return children;
    }
    return <Redirect to="/login" />;
  };

  return (
    <ChakraProvider>
      <Router>
        <GlobalContext.Provider value={{isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
          <CommonLayout>
            <Switch>
              <Route exact component={Login} path="/login" />
              <Route exact component={SignUp} path="/signup" />
              <Private>
                <Switch>
                  <Route exact component={Home} path="/" />
                </Switch>
              </Private>
            </Switch>
          </CommonLayout>
        </GlobalContext.Provider>
      </Router>
    </ChakraProvider>
  );
};

/* eslint-disable import/no-default-export */
export default App;
