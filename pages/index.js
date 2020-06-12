import { Container, Grid, Typography, Card, CardActionArea } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext } from 'react-beautiful-dnd';

import Head from '../components/head';
import Nav from '../components/nav';
import Background from '../components/background';
import TaskList from '../components/taskList';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    background: 'rgba(255, 255, 255, 0.7)'
  },
  taskColumn: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    background: 'rgba(200, 200, 200, 0.5)',
    minHeight: 900
  },
  columnTitle: {
    marginBottom: 15,
    textAlign: 'center'
  },
  newTaskButton: {
    padding: 5,
    background: theme.palette.success.light,
    color: '#555',
    verticalAlign: 'center',
    textAlign: 'center'
  }
}));

export default () => {
  const styles = useStyles();

  const dummyTasks = {
    0: { title: 'TODO1', description: 'Initialize project' },
    1: { title: 'TODO2', description: 'Design application' },
    2: { title: 'TODO3', description: 'Set development environment' },
    3: { title: 'TODO4', description: 'Make first commit' },
    4: { title: 'TODO5', description: 'Test' },
    5: { title: 'TODO6', description: 'Deploy and release first version' },
  };

  const onDragEnd = e => {
    console.log(e);
  }

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
              <Grid
                item
                xs={12}
                md={4}
              >
                <Grid item>
                  <Typography className={styles.columnTitle} variant="h4" component="h4">TODO</Typography>
                </Grid>

                  
                <div className={styles.taskColumn}>
                  <Card className={styles.newTaskButton}>
                    <CardActionArea>
                      <Typography variant="h6">Create New Task</Typography>
                    </CardActionArea>
                  </Card>
                  <TaskList listId="TODO" tasks={dummyTasks} />
                </div>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
              >
                <Grid item xs={12} md={12}>
                  <Typography className={styles.columnTitle} variant="h4" component="h4">DOING</Typography>
                </Grid>

                <Grid
                  className={styles.taskColumn}
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <TaskList listId="DOING" tasks={[]} />
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                md={4}
              >
                <Grid item xs={12} md={12}>
                  <Typography className={styles.columnTitle} variant="h4" component="h4">DONE</Typography>
                </Grid>

                <Grid
                  className={styles.taskColumn}
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  spacing={1}
                >
                  <TaskList listId="DONE" tasks={[]} />
                </Grid>
              </Grid>
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
