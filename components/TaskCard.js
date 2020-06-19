import { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Fade,
  TextField,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  Edit as EditIcon,
  Check as CheckIcon,
  SaveAlt as SaveIcon,
  Clear as ClearIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-beautiful-dnd';
import ReactMarkdown from 'react-markdown';

const useStyles = makeStyles((theme) => ({
  activeTaskCards: {
    background: theme.palette.grey[400],
    opacity: 0.9,
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
    color: theme.palette.grey[500],
  },
  discardButton: {
    color: theme.palette.grey[500],
    width: '50%',
    marginLeft: 10,
    marginRight: 10
  },
  saveButton: {
    color: theme.palette.text.primary,
    width: '50%',
    marginLeft: 10,
    marginRight: 10
  },
  titleForm: {
    width: '100%',
    marginTop: 10
  },
  descriptionForm: {
    width: '100%',
    marginTop: 20
  },
  buttonWrap: {
    display: 'inline-flex',
    width: '100%',
    marginTop: 20
  },
  cardMenuHide: {
    display: 'none',
    position: 'absolute',
    right: 0,
    top: 0
  },
  cardMenuActive: {
    display: 'block',
    position: 'absolute',
    right: 0,
    top: 0
  },
  descriptionView: {
    fontSize: '1.1em',
    width: '100%',
    fontFamily: "roboto",
  }
}));

export default ({ taskDetail, index, update }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [editMode, setEditMode] = useState(false);

  const [curTask, setCurTask] = useState(taskDetail);

  const styles = useStyles();

  const onMenuClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    setEditMode(!editMode);
    setAnchorEl(null);
  };

  const handleArchive = () => { };

  const handleDiscard = () => {
    setEditMode(false);
  };

  const handleSave = () => {
    update(curTask);
    setEditMode(false);
  };

  const onChangeTitle = ({ target }) => {
    setCurTask({
      ...curTask,
      title: target.value
    });
  };

  const onChangeDescrption = ({ target }) => {
    setCurTask({
      ...curTask,
      description: target.value
    });
  };

  const renderTask = () => {
    if (editMode) {
      return (
        <CardContent>
          <TextField
            label="Title"
            className={styles.titleForm}
            autoFocus={true}
            color="secondary"
            variant="outlined"
            size="medium"
            defaultValue={taskDetail.title}
            onChange={onChangeTitle}
          />

          <TextField
            label="Description"
            className={styles.descriptionForm}
            multiline={true}
            color="secondary"
            variant="outlined"
            size="medium"
            defaultValue={taskDetail.description}
            onChange={onChangeDescrption}
          />

          <div className={styles.buttonWrap}>
            <Button
              className={styles.discardButton}
              variant="contained"
              color="default"
              startIcon={<ClearIcon />}
              onClick={handleDiscard}
            >
              Discard
            </Button>

            <Button
              className={styles.saveButton}
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>

        </CardContent>
      );
    }

    return (
      <CardContent>
        <Typography variant="h5">{taskDetail.title}</Typography>

        <div className="markdown-body">
          <ReactMarkdown className={styles.descriptionView} source={taskDetail.description} />
        </div>
      </CardContent>
    );
  }

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
          <div className={editMode ? styles.cardMenuHide : styles.cardMenuActive}>
            <IconButton
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
          </div>

          { renderTask() }
        </Card>
      )}
    </Draggable>
  )
}