/* eslint-disable import/no-cycle */
import React, {useContext} from 'react';

import {GlobalContext} from '../App';

// とりあえず認証済みユーザーの名前やメールアドレスを表示
export const Home: React.FC = () => {
  const {isSignedIn, currentUser} = useContext(GlobalContext);

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h2>メールアドレス: {currentUser?.email}</h2>
          <h2>名前: {currentUser?.name}</h2>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
