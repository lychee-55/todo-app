import {
  faBaby,
  faBeer,
  faCubesStacked,
  faHockeyPuck,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
const BgDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6c584c;
  /* background: linear-gradient(#6d3c7f, #93674c, #7f362b); */
  /* background: linear-gradient(#6d3c7f, #cecfb1); */
  background: linear-gradient(to right, #a57f56, #6c584c);
  border-radius: 10px;
  text-align: center;
  padding: 10px 20px;
`;

const HeaderH1 = styled.h1`
  /* background-color: #6c584c; */
  margin: 0;
  padding: 0;
  color: #fffdee;
`;

const ModeDiv = styled.div`
  /* background-color: #6c584c; */
  position: relative;
  color: #fffdee;
`;
// const HeaderH1 = styled.h1`
//   margin: 0;
//   padding: 10px;
//   background-color: #3d8463;
//   color: white;
//   border-radius: 10px;
//   text-align: center;
// `;

export default function Header() {
  return (
    <BgDiv>
      <HeaderH1>
        Todo App <FontAwesomeIcon icon={faCubesStacked} />
      </HeaderH1>
      {/* <ModeDiv>다크모드</ModeDiv> */}
    </BgDiv>
  );
}
