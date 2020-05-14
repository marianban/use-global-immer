import React from 'react';
import Link from '../components/Link';
import { useGlobalImmer } from 'use-global-immer';
import { store } from '../store';

const FilterLink = (props) => {
  const [filter, setFilter] = useGlobalImmer(store.filter);
  const active = props.filter === filter;
  return (
    <Link active={active} setFilter={() => setFilter(() => props.filter)}>
      {props.children}
    </Link>
  );
};

export default FilterLink;
