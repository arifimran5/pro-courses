import { extendTheme, theme as base } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#00bcd4',
  },
  fonts: {
    heading: `${base.fonts?.heading}`,
    body: `${base.fonts?.body}`,
  },
});

export default theme;
