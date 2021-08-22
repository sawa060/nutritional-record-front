/* eslint-disable import/no-cycle */
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles, Theme} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useGlobalContext} from 'src/features/common/global_context';
import {LocalStorageAdapter} from 'src/lib/local_storage/local_storage_adapter';
import {TokenStorage} from 'src/lib/token_storage/token_storage';

import {AlertMessage} from '../components/utils/alert_message';
import {SignInData} from '../features/auth';
import {signIn} from '../lib/api/auth';

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
  box: {
    marginTop: '2rem',
  },
  link: {
    textDecoration: 'none',
  },
}));

// ログイン用ページ
export const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const {setCurrentUser} = useGlobalContext();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: SignInData = {
      email,
      password,
    };

    try {
      const res = await signIn(data);

      if (res.status === 200) {
        // 成功した場合はCookieに各値を格納
        TokenStorage.setAccessToken(res.headers['access-token']);
        TokenStorage.setClient(res.headers.client);
        TokenStorage.setUid(res.headers.uid);

        LocalStorageAdapter.set('currentUser', res.data.data);

        setCurrentUser(res.data.data);

        history.replace('/');
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
          <CardHeader className={classes.header} title="サインイン" />
          <CardContent>
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
              placeholder="6文字以上"
              type="password"
              value={password}
              variant="outlined"
              onChange={(event) => setPassword(event.target.value)}
            />
            <div style={{textAlign: 'right'}}>
              <Button
                className={classes.submitBtn}
                color="primary"
                disabled={!!(!email || !password)}
                type="submit"
                variant="outlined"
                onClick={handleSubmit}
              >
                送信
              </Button>
            </div>
            <Box className={classes.box} textAlign="center">
              <Typography variant="body2">
                まだアカウントをお持ちでない方は
                <Link className={classes.link} to="/signup">
                  こちら
                </Link>
                から作成してください。
              </Typography>
            </Box>
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
