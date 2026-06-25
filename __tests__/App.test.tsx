/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  jest.useFakeTimers();
  let tree: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(async () => {
    tree = ReactTestRenderer.create(<App />);
    await Promise.resolve();
  });

  await ReactTestRenderer.act(async () => {
    jest.runOnlyPendingTimers();
    await Promise.resolve();
  });

  await ReactTestRenderer.act(async () => {
    tree?.unmount();
  });

  jest.useRealTimers();
});
