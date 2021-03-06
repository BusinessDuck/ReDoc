// import { transparentize } from 'polished';

import { UnderlinedHeader } from '../../common-elements';
import styled from '../../styled-components';
import { ResponseTitle } from './ResponseTitle';

export const StyledResponseTitle = styled(ResponseTitle)`
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 4px;
  line-height: 1.5em;
  background-color: #f8f8f8;
  cursor: pointer;

  color: ${props => props.theme.colors.responses[props.type].color};

  ${props =>
    (props.empty &&
      `
cursor: default;
&::before {
  content: "—";
  font-weight: bold;
  width: 1.5em;
  text-align: center;
  display: inline-block;
}
`) ||
    ''};
`;

export const ResponseDetailsWrap = styled.div``;

export const HeadersCaption = styled(UnderlinedHeader.withComponent('caption'))`
  text-align: left;
  margin-top: 1em;
  caption-side: top;
`;
