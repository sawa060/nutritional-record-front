/* eslint-disable import/no-cycle */
import {Container, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';

import {Header} from './header';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: '3rem',
  },
}));

interface CommonLayoutProps {
  children: React.ReactElement;
}

// 全てのページで共通となるレイアウト
export const CommonLayout = ({children}: CommonLayoutProps) => {
  const classes = useStyles();

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container className={classes.container} maxWidth="lg">
          <Grid container justifyContent="center">
            <Grid item>{children}</Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
};
