import { Card, CardContent, IconButton, Menu, MenuItem, ListItemIcon, Typography, Fade } from '@material-ui/core'
import { Menu as MenuIcon, Edit as EditIcon, Check as CheckIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';


const useStyles = makeStyles((theme) => ({
  activeTaskCards: {
    background: theme.palette.success.light,
    minWidth: 275,
    border: '2px solid #444',
    marginTop: 10,
    marginBottom: 10,
    fontSize: '1.2em',
    position: 'relative'
  },
  taskCards: {
    minWidth: 275,
    border: '2px solid #444',
    marginTop: 10,
    marginBottom: 10,
    fontSize: '1.2em',
    position: 'relative'
  },
  cardButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  editButton: {
    color: theme.palette.success.dark,
  },
  archiveButton: {
    color: theme.palette.grey[500]
  }
}));

export default ({ taskDetail, index, update }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const styles = useStyles();

  const onMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => { };
  const handleArchive = () => { };

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
          <IconButton
            className={styles.cardButton}
            aria-label="more"
            aria-haspopup="true"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="card-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={onMenuClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleUpdate}>
              <ListItemIcon>
                  <EditIcon className={styles.editButton} color="inherit" />
                </ListItemIcon>
                <ListItemIcon>
                  <Typography className={styles.editButton} fontSize="small">Update</Typography>
              </ListItemIcon>
            </MenuItem>

            <MenuItem onClick={handleArchive}>
              <ListItemIcon>
                <CheckIcon className={styles.archiveButton} color="inherit" />
              </ListItemIcon>
              <ListItemIcon>
                <Typography className={styles.archiveButton} fontSize="small">Archive</Typography>
              </ListItemIcon>
            </MenuItem>
          </Menu>

          <CardContent>
            <Typography variant="h5">{taskDetail.title}</Typography>
            {taskDetail.description}
          </CardContent>
        </Card>
      )}
    </Draggable>
  )
}