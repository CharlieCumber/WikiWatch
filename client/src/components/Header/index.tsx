import * as Styled from './styles';
import { ReactNode } from 'react';
import Content from '../Content';

type HeaderProps = {
  children: ReactNode;
};

const Header = (props: HeaderProps): JSX.Element => {
  const { children } = props;

  return (
    <Styled.Header>
      <Content>{children}</Content>
    </Styled.Header>
  );
};

export default Header;
