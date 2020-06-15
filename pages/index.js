import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd';

import Head from '../components/head';
import Nav from '../components/nav';
import Background from '../components/background';
import TaskList from '../components/taskList';

const Columns = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
}

export default () => {
  const dummyTasks = {
    'task-1': { id: 'task-1', column: Columns.TODO, title: 'TODO1', description: 'Initialize project' },
    'task-2': { id: 'task-2', column: Columns.TODO, title: 'TODO2', description: 'Design application' },
    'task-3': { id: 'task-3', column: Columns.TODO, title: 'TODO3', description: 'Set development environment' },
    'task-4': { id: 'task-4', column: Columns.TODO, title: 'TODO4', description: 'Make first commit' },
    'task-5': { id: 'task-5', column: Columns.TODO, title: 'TODO5', description: 'Test' },
    'task-6': { id: 'task-6', column: Columns.TODO, title: 'TODO6', description: 'Deploy and release first version' },
  };

  const initialColumns = {
    [Columns.TODO]: {
      id: Columns.TODO,
      title: 'TO DO',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5', 'task-6']
    },
    [Columns.DOING]: {
      id: Columns.DOING,
      title: 'DOING',
      taskIds: []
    },
    [Columns.DONE]: {
      id: Columns.DONE,
      title: 'DONE',
      taskIds: []
    },
  };

  const initialColumnOrder = [Columns.TODO, Columns.DOING, Columns.DONE];

  const [tasks, setTasks] = useState(dummyTasks);

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    } // user returned to original place

    const column = columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);

    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newColumns = {
      ...columns,
      [newColumn.id]: newColumn,
    };

    setColumns(newColumns);
  }

  const renderColumns = initialColumnOrder.map(id => {
    const column = columns[id];

    return (
      <TaskList key={column.id} column={column} tasks={column.taskIds.map(taskId => tasks[taskId])} />
    );
  })

  return (
    <div>
      <Head title="Simple Scrum Board" />

      <Background />

      <Nav />

      <div className="app-wrap">
        <Container>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={3}
          >
            <DragDropContext onDragEnd={onDragEnd}>
              { renderColumns }
            </DragDropContext>
          </Grid>

        </Container>
      </div>
    

      <style jsx>{`
      .app-wrap {
        height: 100vh;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1001;
        color: #fff;
        padding-top: 60px;
      }
    `}</style>
    </div>
  )
};
