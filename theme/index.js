import { extendTheme, theme as base } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#5B89FF',
    primary_dark: '#303030',
  },
  fonts: {
    heading: `Inter,${base.fonts?.heading}`,
    body: `Inter,${base.fonts?.body}`,
  },
});

export default theme;
