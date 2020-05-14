import React from 'react';
import PropTypes from 'prop-types';
import Footer from './Footer';
import VisibleTodoList from '../containers/VisibleTodoList';

const MainSection = ({
  todosCount,
  completedCount,
  completeAllTodos,
  clearCompleted,
}) => (
  <section className="main">
    {!!todosCount && (
      <span>
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todosCount}
          readOnly
        />
        <label onClick={completeAllTodos} />
      </span>
    )}
    <VisibleTodoList />
    {!!todosCount && (
      <Footer
        completedCount={completedCount}
        activeCount={todosCount - completedCount}
        onClearCompleted={clearCompleted}
      />
    )}
  </section>
);

MainSection.propTypes = {
  todosCount: PropTypes.number.isRequired,
  completedCount: PropTypes.number.isRequired,
  completeAllTodos: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default MainSection;
