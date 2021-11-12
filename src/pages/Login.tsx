import { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import useStore from "../hooks/useStore";
import { useInput } from "../hooks/useInput";

const Container = styled.div`
  background-color: lightcoral;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

const Title = styled.p`
  margin: 20px auto 5px;
  font-weight: bold;
  font-size: 2.25rem;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 3px solid black;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  color: #ffffff;
  height: 3.4375rem;
  background-color: ${(props) => props.theme.main.bluePurple};

  &:disabled {
    background-color: ${(props) => props.theme.main.warmGrey};
  }
`;

const LoginPanel = styled.div`
  width: 40rem;
  margin-top: 5.625rem;
  padding: 2rem 8.75rem;
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 1.2rem;
  background-color: white;
`;

const FormContainer = styled.div`
  padding-right: 5.9375rem;
  width: 26.4375rem;
`;

export const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login, setUser } = useStore();
  const [token, TokenInput] = useInput();

  const history = useHistory();

  const loginUser = async () => {
    try {
      setLoading(true);
      const data = await login(token);

      if (data) {
        history.push("/");
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const isButtonEnabled = !token || loading;

  return (
    <Container>
      <LoginPanel>
        <Title>Enter your personal token to continue:</Title>
        <FormContainer>
          {TokenInput}

          <LoginButton disabled={isButtonEnabled} onClick={loginUser}>
            Login
          </LoginButton>
        </FormContainer>
      </LoginPanel>
    </Container>
  );
};
