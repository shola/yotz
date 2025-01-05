import * as React from 'react';
import { render } from '@testing-library/react-native';

import { MonoText } from '../StyledText';

/**
 * Taken from expo router docs:
 * Deep links always work, for every page. This makes it possible to share links
 * to any content in the app, which is great for promoting your app, collecting
 * bug reports, E2E testing, automating screenshots, and so on.
 */  

describe('StyledText', () => {
  test('renders correctly', () => {
    const tree = render(<MonoText>Snapshot test!</MonoText>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
