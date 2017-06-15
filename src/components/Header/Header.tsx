import * as React from 'react';

const Header: React.SFC<{}> = () => (
  <header
    className="mui-appbar mui-row mui--appbar-height mui--appbar-line-height mui--text-center mui--z2"
    style={{
      height: '6rem',
      width: '100%',
      position: 'fixed',
      top: 0,
      zIndex: 2,
    }}
  >
    <h2>Notes</h2>
  </header>
);

export default Header;
