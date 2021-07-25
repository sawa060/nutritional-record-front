/* eslint-disable import/no-cycle */
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie';
import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

import {GlobalContext} from '../App';
import {AlertMessage} from '../components/utils/alert_message';
import {SignUpData} from '../features/auth';
import {signUp} from '../lib/api/auth';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: 'none',
  },
  header: {
    textAlign: 'center',
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400,
  },
}));

// サインアップ用ページ
export const SignUp: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const {setIsSignedIn, setCurrentUser} = useContext(GlobalContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: SignUpData = {
      name,
      email,
      password,
      passwordConfirmation,
    };

    try {
      const res = await signUp(data);

      if (res.status === 200) {
        // アカウント作成と同時にサインインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers.client);
        Cookies.set('_uid', res.headers.uid);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        history.push('/');
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="サインアップ" />
          <CardContent>
            <TextField
              fullWidth
              required
              label="名前"
              margin="dense"
              value={name}
              variant="outlined"
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              fullWidth
              required
              label="メールアドレス"
              margin="dense"
              value={email}
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              fullWidth
              required
              autoComplete="current-password"
              label="パスワード"
              margin="dense"
              type="password"
              value={password}
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
            <TextField
              fullWidth
              required
              autoComplete="current-password"
              label="パスワード（確認用）"
              margin="dense"
              type="password"
              value={passwordConfirmation}
              variant="outlined"
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
            <div style={{textAlign: 'right'}}>
              <Button
                className={classes.submitBtn}
                color="primary"
                disabled={!!(!name || !email || !password || !passwordConfirmation)}
                type="submit"
                variant="outlined"
                onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
      <AlertMessage // エラーが発生した場合はアラートを表示
        message="メールアドレスかパスワードが間違っています"
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
      />
    </>
  );
};
