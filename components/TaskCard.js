import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, CardActionArea, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  activeTaskCards: {
    background: theme.palette.primary.light,
    minWidth: 275,
    border: '2px solid #444',
    marginTop: 10,
    marginBottom: 10,
    fontSize: '1.2em',
  },
  taskCards: {
    minWidth: 275,
    border: '2px solid #444',
    marginTop: 10,
    marginBottom: 10,
    fontSize: '1.2em',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '90%'
  },
}));

export default ({ taskDetail, index }) => {
  const styles = useStyles();

  return (
    <Draggable
      draggableId={taskDetail.id}
      index={index}
    >
      {(provided, snapshot) => (
        <Card
          className={snapshot.isDragging ? styles.activeTaskCards : styles.taskCards}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <CardContent>
            <Typography variant="h5">{taskDetail.title}</Typography>
            {taskDetail.description}
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}