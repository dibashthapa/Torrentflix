import styled from 'styled-components';

const InternalError: React.FC = props => {
  return (
    <ErrorContainer>
      <ErrorInner>
        <h1>Oops! We encountered an unexpected error</h1>
        {props.children}
        <SendButton>Report Error</SendButton>
      </ErrorInner>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorInner = styled.div`
  background-color: #fff;
  padding: 40px;
  margin-top: 30px;
`;

const SendButton = styled.button`
  border: transparent;
  padding: 10px;
  border-radius: 4px;
`;
export default InternalError;
