import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { nanoid } from 'nanoid';

import Head from '../components/head';
import Nav from '../components/nav';
import Background from '../components/background';
import TaskColumn from '../components/TaskColumn';

const Columns = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
}

export default () => {
  const initialColumns = {
    [Columns.TODO]: {
      id: Columns.TODO,
      title: 'TO DO',
      taskIds: []
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

  const [columnOrder, setColumnOrder] = useState([Columns.TODO, Columns.DOING, Columns.DONE]);

  const [tasks, setTasks] = useState({});

  const [columns, setColumns] = useState(initialColumns);

  const onClickNewTask = () => {
    const newTask = {
      id: nanoid(),
      column: Columns.TODO,
      title: 'New Task',
      description: '### Description\n- Edit this card\n- Make a plan to process this task',
      archived: false,
    };

    setTasks({
      [newTask.id]: newTask,
      ...tasks,
    });

    const newTaskIds = Array.from(columns[Columns.TODO].taskIds);

    newTaskIds.splice(0, 0, newTask.id);

    const newColumns = {
      ...columns,
      [Columns.TODO]: {
        ...columns[Columns.TODO],
        taskIds: newTaskIds,
      }
    };

    setColumns(newColumns);
  }

  const onDragEnd = result => {
    const { source, destination, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;  // when user returned to original place
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setColumnOrder(newColumnOrder);
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
      return;
    }

    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(source.index, 1);

    const newSourceColumn = {
      ...sourceColumn,
      taskIds: sourceTaskIds,
    };

    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.splice(destination.index, 0, draggableId);

    const newDestinationColumn = {
      ...destinationColumn,
      taskIds: destinationTaskIds,
    };

    setColumns({
      ...columns,
      [sourceColumn.id]: newSourceColumn,
      [destinationColumn.id]: newDestinationColumn,
    });
  }

  const onHandleUpdateTask = updated => {
    setTasks({
      ...tasks,
      [updated.id]: updated
    });
  };

  const renderColumns = columnOrder.map((id, index) => {
    const column = columns[id];

    return (
      <TaskColumn
        key={column.id}
        column={column}
        index={index}
        tasks={column.taskIds.map(taskId => tasks[taskId])}
        onClickNewTask={onClickNewTask}
        onHandleUpdateTask={onHandleUpdateTask}
      />
    );
  });

  useEffect(() => {
    const columns = localStorage.getItem('columns');
    const columnOrder = localStorage.getItem('columnOrder');
    const tasks = localStorage.getItem('tasks');

    if (columns) {
      setColumns(JSON.parse(columns));
    }

    if (columnOrder) {
      setColumnOrder(JSON.parse(columnOrder));
    }

    if (tasks) {
      setTasks(JSON.parse(tasks));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
    localStorage.setItem('columnOrder', JSON.stringify(columnOrder));
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });

  return (
    <div>
      <Head title="Simple Scrum Board" />

      <Background />

      <Nav />

      <div className="app-wrap">

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns-wrap" direction="horizontal" type="column">
          {provided => (
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={3}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              { renderColumns }
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
        
      </DragDropContext>

      </div>
    

      <style jsx>{`
      .app-wrap {
        height: 100vh;
        width: 100vw;
        min-width: 900px;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1001;
        color: #fff;
        padding-top: 60px;
        padding-right: 20px;
        padding-left: 20px;
      }
    `}</style>
    </div>
  )
};
