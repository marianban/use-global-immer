import * as React from 'react';
import { createImmerStore } from '../src/createImmerStore';
import { GlobalImmerProvider } from '../src/GlobalImmerProvider';
import { useGlobalImmer } from '../src/useGlobalImmer';
import { renderHook, act } from '@testing-library/react-hooks';

const firstUserName = 'Claudia Keebler';
const store = createImmerStore({
  counter: 0,
  users: [
    {
      name: firstUserName,
    },
  ],
});

const makeWrapper = (store) => ({ children }) => (
  <GlobalImmerProvider store={store}>{children}</GlobalImmerProvider>
);

describe('useGlobalImmer', () => {
  it('can modify primitive value', () => {
    const { result } = renderHook(() => useGlobalImmer(store.counter), {
      wrapper: makeWrapper(store),
    });
    let counter, setCounter;
    [counter, setCounter] = result.current;
    expect(counter).toBe(0);
    act(() => {
      setCounter((value) => value + 1);
      setCounter((value) => value + 1);
    });
    [counter] = result.current;
    expect(counter).toBe(2);
  });
  it('can modify object value', () => {
    const { result } = renderHook(() => useGlobalImmer(store.users), {
      wrapper: makeWrapper(store),
    });
    let users, setUsers;
    [users, setUsers] = result.current;
    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty('name', firstUserName);
    const secondUserName = 'Berenice Graham';
    act(() => {
      setUsers((users) => void users.push({ name: secondUserName }));
    });
    [users] = result.current;
    expect(users).toHaveLength(2);
    expect(users[0]).toHaveProperty('name', firstUserName);
    expect(users[1]).toHaveProperty('name', secondUserName);
  });
});
