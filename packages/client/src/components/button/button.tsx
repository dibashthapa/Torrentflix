import styled from 'styled-components';
import {forwardRef} from 'react';
import Loader from '../loader';

interface ButtonOptions {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * children , to wrap inside button
   *  @type React.Children | React.ReactNode
   */
  children?: React.ReactChild | React.ReactChildren | React.ReactNode;
}

export interface ButtonProps extends ButtonOptions {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {isLoading, isDisabled, children} = props;

  return (
    <StyledButton disabled={isDisabled || isLoading} ref={ref}>
      {isLoading && <Loader isLoading={true} />}
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  );
});

const StyledButton = styled.button`
  outline: 0;
  padding: 12px 18px;
  border: 1px solid transparent;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  align-items: center;
  background-color: var(--primary-light);
  color: #fff;
  font-weight: 450;
  &:hover {
    background-color: var(--primary-dark);
  }
`;

const ButtonText = styled.span`
  text-align: center;
  width: 100%;
`;
