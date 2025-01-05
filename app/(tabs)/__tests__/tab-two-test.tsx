import { render } from '@testing-library/react-native';

import TabTwoScreen from '../two';

describe('<TabTwoScreen />', () => {
  test('Text renders correctly', () => {
    const { getByText } = render(<TabTwoScreen />);

    getByText('Tab Two');
  });
});
