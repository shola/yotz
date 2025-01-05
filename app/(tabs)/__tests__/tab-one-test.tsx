import { render } from '@testing-library/react-native';

import CurrentGameScreen from '../index';

describe('<CurrentGameScreen />', () => {
  test('Text renders correctly', () => {
    const { getByText } = render(<CurrentGameScreen />);

    getByText('Current Game');
  });
});
