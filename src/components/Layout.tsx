import * as React from 'react';
import type { ReactNode } from 'react';
import {
  Box,
} from '@chakra-ui/react'
import { Header } from './Header';
import { Footer } from './Footer';
import { MainContent } from './MainContent';
import { siteMetadata } from "../lib/useSiteMetadata"

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const { siteTitle } = siteMetadata;
  return (
    <Box minH="100vh" >
      <Header siteTitle={siteTitle} />
        <MainContent >
          {children}
        </MainContent>
      <Footer />
    </Box>
  );
};

export default Layout;
