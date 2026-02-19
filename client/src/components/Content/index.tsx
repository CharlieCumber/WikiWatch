import { ReactNode } from 'react';
import * as Styled from './styles';

type ContentProps = {
  children: ReactNode;
};

const Content = (props: ContentProps): JSX.Element => {
  const { children } = props;
  return (
    <Styled.OuterWrapper>
      <Styled.InnerWrapper>{children}</Styled.InnerWrapper>
    </Styled.OuterWrapper>
  );
};

export default Content;
