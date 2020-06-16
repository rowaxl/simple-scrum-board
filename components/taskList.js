import { Grid, Typography, Card, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';

import TaskCard from './taskCard';

const useStyle = makeStyles(theme => ({
  taskArea: {
    background: 'rgba(50, 50, 50, 0.5)',
    borderRadius: 10,
    minHeight: 50,
    padding: 5,
    marginTop: 10,
    width: '100%'
  },
  activeTaskArea: {
    background: 'rgba(100, 120, 200, 0.5)',
    borderRadius: 10,
    minHeight: 50,
    padding: 5,
    marginTop: 10,
    width: '100%'
  },
  columnTitle: {
    marginBottom: 15,
    textAlign: 'center'
  },
  taskColumn: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    background: 'rgba(200, 200, 200, 0.5)',
    minHeight: 90
  },
  newTaskButton: {
    padding: 5,
    background: theme.palette.success.dark,
    color: '#fff',
    verticalAlign: 'center',
    textAlign: 'center'
  }
}));

const Columns = {
  TODO: 'TODO',
  DOING: 'DOING',
  DONE: 'DONE'
}

export default ({ column, tasks, onClickNewTask }) => {
  const styles = useStyle();

  const renderTasks = () => {
    if (tasks.length < 1) return;

    console.log(tasks)

    return tasks.map((task, index) => <TaskCard key={task.id} taskDetail={task} index={index} />)
  };

  const newTaskButton = column.id === Columns.TODO ? (
    <Card className={styles.newTaskButton}>
      <CardActionArea onClick={onClickNewTask}>
        <Typography variant="h6">Create New Task</Typography>
      </CardActionArea>
    </Card>
  ) : '';

  return (
    <Grid
      item
      xs={12}
      md={4}
    >
      <Grid item>
        <Typography className={styles.columnTitle} variant="h4" component="h4">{column.title}</Typography>
      </Grid>

      <div className={styles.taskColumn}>
        { newTaskButton }

        <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              className={snapshot.isDraggingOver ? styles.activeTaskArea : styles.taskArea}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              { renderTasks() }
              { provided.placeholder }
            </div>
          )}
        </Droppable>
      </div>
    </Grid>
  )
}