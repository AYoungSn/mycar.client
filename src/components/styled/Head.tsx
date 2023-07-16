import styled from 'styled-components';
export const Head = styled.header`
  width: 100%;
  height: 100px;
  background-color: #DDD;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
`;

export const HeaderWrap = styled.div`
  position: relative;
  padding-bottom: 100px;
`;

export const Triangle = styled.div<{ $isOpen: boolean }>`
  border-top: ${(props) => (!props.$isOpen ? '7px solid #000' : 0)}; // 위
  border-bottom: ${(props) => (props.$isOpen ? '7px solid #000' : 0)}; // 아래
  border-right: 5px solid transparent;
  border-left: 5px solid transparent;
  margin-left: 18px;
  display: inline-block;
  vertical-align: middle;
`;

export const MenuBtn = styled.button`
  position: relative;
  cursor: pointer;
  background: transparent;
  color: #000000;
  font-family: 'HyundaiSansHeadKRR';
  font-size: 16px;
  margin: 32px 0 0 20px;
  border: 0;
  vertical-align: top;
`;