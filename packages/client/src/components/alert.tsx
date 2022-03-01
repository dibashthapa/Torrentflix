import styled from 'styled-components';
import {ErrorIcon, InfoIcon, WarningIcon} from './SVGIcons';

/**
 * Base Alert Component to reuse in other Alert Components
 **/
const BaseAlert = styled.div`
    line-height: 24px;
    margin-bottom: 15px;
    position: relative;
    padding: 10px 16px;
    padding-right: 50px;
    display:flex;
    align-items:center;
    gap:10px;
    border-radius: 6px;
}
`;

const AlertError = styled(BaseAlert)`
  background-color: #ffe9e9;
  color: #de5959;
`;

const AlertWarning = styled(BaseAlert)`
  background-color: #fbfadd;
  color: #8f872e;
`;

const AlertInfo = styled(BaseAlert)`
  background-color: #e9f7fe;
  color: #3184ae;
`;

const STATUSES = {
  info: {icon: InfoIcon, component: AlertInfo},
  warning: {icon: WarningIcon, component: AlertWarning},
  error: {icon: ErrorIcon, component: AlertError},
};
export type AlertStatus = keyof typeof STATUSES;

interface AlertProps {
  status: AlertStatus;
}

export const Alert: React.FC<AlertProps> = props => {
  const {status, children} = props;

  const AlertComponent = STATUSES[status].component;
  const AlertIcon = STATUSES[status].icon;

  return (
    <AlertComponent>
      <AlertIcon />
      {children}
    </AlertComponent>
  );
};
