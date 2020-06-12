import { makeStyles } from '@material-ui/core/styles';
import { Droppable } from 'react-beautiful-dnd';

import TaskCard from './taskCard';

const useStyle = makeStyles({
  taskArea: {
    background: 'rgba(50, 50, 50, 0.5)',
    borderRadius: 10,
    minHeight: 30,
    padding: 5,
    marginTop: 10,
    width: '100%'
  }
});

export default ({ listId, tasks }) => {
  const styles = useStyle();

  const renderTasks = () => {
    return Object.keys(tasks).map((id, index) => (
      <TaskCard key={id} taskId={id} taskDetail={tasks[id]} index={index} />
    ))
  }

  return (
    <Droppable droppableId={listId}>
      {provided => (
        <div
          className={styles.taskArea}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          { renderTasks() }
          { provided.placeholder }
        </div>
      )}
    </Droppable>
  )
}