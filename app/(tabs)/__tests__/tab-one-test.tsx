import { render } from '@testing-library/react-native';

import TabOneScreen from '../index';

describe('<TabOneScreen />', () => {
  test('Text renders correctly', () => {
    const { getByText } = render(<TabOneScreen />);

    getByText('Tab One');
  });
});
