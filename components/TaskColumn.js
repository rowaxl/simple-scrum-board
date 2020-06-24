import { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import Task from './Task';

const useStyle = makeStyles(theme => ({
  taskArea: {
    background: 'rgba(50, 50, 50, 0.5)',
    borderRadius: 10,
    minHeight: 10,
    padding: 5,
    width: '100%',
    transition: 'background 0.3s ease'
  },
  activeTaskArea: {
    background: 'rgba(100, 120, 200, 0.5)',
    borderRadius: 10,
    minHeight: 50,
    padding: 5,
    marginTop: 10,
    width: '100%',
    transition: 'background 0.3s ease'
  },
  columnTitle: {
    marginBottom: 15,
    textAlign: 'center'
  },
  taskColumn: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    background: 'rgba(200, 200, 200, 0.5)',
    minHeight: 100,
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  newTaskButton: {
    padding: 5,
    background: theme.palette.success.dark,
    color: '#fff',
    verticalAlign: 'center',
    textAlign: 'center',
    marginBottom: 10
  },
  columnWrap: {
    minWidth: 200,
    display: 'inline-block',
    marginLeft: 10,
    marginRight: 10,
  }
}));

const Columns = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
}

export default ({ column, index, tasks, onClickNewTask, onHandleUpdateTask }) => {
  const styles = useStyle();
  const [renderedTasks, setRenderedTasks] = useState(tasks);

  useEffect(() => {
    // do render whole tasks when index changed
    renderTasks();
  }, [tasks]);

  const renderTasks = () => {
    setRenderedTasks(
      tasks
        .filter(e => !e.archived)
        .map((task, index) =>
          <Task key={task.id} taskDetail={task} index={index} update={onHandleUpdateTask} />
        )
    );
  };

  const newTaskButton = column.id === Columns.TODO ? (
    <Card className={styles.newTaskButton}>
      <CardActionArea onClick={onClickNewTask}>
        <Typography variant="h6">Create New Task</Typography>
      </CardActionArea>
    </Card>
  ) : '';

  return (
    <Draggable draggableId={column.id} index={index}>
      {provided => (
        <div
          className={styles.columnWrap}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Grid item>
            <Typography className={styles.columnTitle} variant="h4" component="h4">{column.title}</Typography>
          </Grid>

          <div className={styles.taskColumn}>
            { newTaskButton }

            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <div
                  className={snapshot.isDraggingOver ? styles.activeTaskArea : styles.taskArea}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  { renderedTasks }
                  { provided.placeholder }
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  )
}