import styled from "styled-components";

const Flex = styled.div`
  display: flex;
`;

const FlexCenter = styled(Flex)`
  justify-content: center;
  align-items: center;
`;

export const Card = styled(Flex)`
  flex-direction: column;
  width: 700px;
  background-color: #fff;
  box-shadow: 0 2px 3px rgb(10 10 10 / 10%), 0 0 0 1px rgb(10 10 10 / 10%);
  color: #4a4a4a;
  border-radius: 10px;

  @media (max-width: 700px) {
    height: 100%;
    width: 100%;
  }
`;

export const CardHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.75rem 0;
  box-shadow: 0 1px 2px rgb(10 10 10 / 10%);
  min-height: 40 px;
`;

export const WeekColumn = styled(Flex)`
  flex-direction: column;
`;

export const DayLabelColumn = styled(WeekColumn)`
  background-color: white;
  margin-right: 10px;

  position: sticky;
  z-index: 1;
`;

export const DataContainer = styled(Flex)`
  overflow: scroll;
  padding: 5px;
  margin: 10px 0;
`;

export const Box = styled.div`
  width: 15px;
  height: 15px;
  margin: 3px;
  border-radius: 3px;
  background-color: #ebedf0;

  &[data-level="1"] {
    background-color: #c6e48b;
  }

  &[data-level="2"] {
    background-color: #7bc96f;
  }

  &[data-level="3"] {
    background-color: #196127;
  }
`;

export const CardContent = styled(FlexCenter)``;

export const LabelBox = styled(Flex)`
  text-align: left;
  padding: 1px;
  font-size: 13px;
  height: 20px;
`;
