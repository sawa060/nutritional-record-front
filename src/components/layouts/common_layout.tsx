/* eslint-disable import/no-cycle */
import {Container, Grid} from '@chakra-ui/react';
import React from 'react';
import {Breadcrumb, BreadCrumbProps} from 'src/components/common/breadcrumb';

import {Header} from './header';

interface CommonLayoutProps {
  children: React.ReactElement;
  breadCrumbs: BreadCrumbProps['breadCrumbs'];
}

// 全てのページで共通となるレイアウト
export const CommonLayout = ({children, breadCrumbs}: CommonLayoutProps) => (
  <>
    <header>
      <Header />
      <Breadcrumb
        breadCrumbProps={{
          mt: 2,
          ml: 4,
        }}
        breadCrumbs={breadCrumbs}
      />
    </header>
    <main>
      <Container maxWidth="container.lg" mt={2}>
        <Grid container justifyContent="center">
          <Grid item>{children}</Grid>
        </Grid>
      </Container>
    </main>
  </>
);
