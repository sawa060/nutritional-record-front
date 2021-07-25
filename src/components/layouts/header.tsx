/* eslint-disable import/no-cycle */

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Cookies from 'js-cookie';
import {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';

import {GlobalContext} from '../../App';
import {signOut} from '../../lib/api/auth';

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: 'inherit',
  },
  linkBtn: {
    textTransform: 'none',
  },
}));

export const Header = (): JSX.Element => {
  const {isSignedIn, setIsSignedIn} = useContext(GlobalContext);
  const classes = useStyles();
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
        history.push('/signin');
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
        <Button className={classes.linkBtn} color="inherit" onClick={handleSignOut}>
          サインアウト
        </Button>
      );
    }
    return (
      <Button className={classes.linkBtn} color="inherit" component={Link} to="/login">
        サインイン
      </Button>
    );
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.iconButton} color="inherit" edge="start">
          <MenuIcon />
        </IconButton>
        <Typography className="classes.title" component={Link} to="/" variant="h6">
          Sample
        </Typography>
        <AuthButtons />
      </Toolbar>
    </AppBar>
  );
};
