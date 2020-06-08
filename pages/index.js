import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Head from '../components/head';
import Nav from '../components/nav';
import Background from '../components/background';
import TaskCard from '../components/TaskCard';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    background: 'rgba(255, 255, 255, 0.7)'
  },
  taskColumn: {
    padding: '10px 15px',
    border: '1px solid #ddd',
    background: 'rgba(200, 200, 200, 0.5)',
    height: 900,
    overflow: 'scroll'
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
  }

  const mapTaskCards = () => {
    return Object.keys(dummyTasks).map(id => (
      <Grid item key={id}>
        <TaskCard key={id} taskDetail={dummyTasks[id]} />
      </Grid>
    ))
  }

  return (
    <div>
      <Head title="Simple Scrum Board" />

      <Background />

      <Nav />

      <div className="app-wrap">
        <Container fixed>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            spacing={3}
          >

            <Grid
              item
              xs={12}
              md={4}
            >
              <Grid item>
                <Typography variant="h4" component="h4">TODO</Typography>
              </Grid>

              <div className={styles.taskColumn}>
                { mapTaskCards() }
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="h4" component="h4">DOING</Typography>
              </Grid>

              <Grid
                className={styles.taskColumn}
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Grid item xs={12} md={12}>
                <Typography variant="h4" component="h4">DONE</Typography>
              </Grid>

              <Grid
                className={styles.taskColumn}
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
              </Grid>
            </Grid>

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
