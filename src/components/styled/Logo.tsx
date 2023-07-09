import styled from 'styled-components';

const Logo = styled.h2<{ type: string; name: string }>`
  background-image: url(https://www.hyundai.com/static/images/logo_black.png);
  width: 150px;
  height: 20px;
  background-position: 50%;
  background-size: cover;
  position: relative;
  background-color: transparent;
  border: 0;
  margin: 30px 20px 0 40px;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
`;

export default Logo;
