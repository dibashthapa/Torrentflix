import styled, {keyframes} from 'styled-components';

const defaultProps = {
  isLoading: false,
};
type DefaultProps = Readonly<typeof defaultProps>;

type LoaderProps = {
  className?: string;
} & DefaultProps;

const Loader: React.FC<LoaderProps> = props => {
  const {isLoading, className} = props;

  if (isLoading) {
    return <LoadingContainer className={className} />;
  }

  return null;
};

const loadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 18px;
  height: 18px;
  animation: ${loadingAnimation} 2s linear infinite;
`;

export default Loader;
