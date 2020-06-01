import Head from '../components/head';
import Nav from '../components/nav';
import Background from '../components/background';
import { Container, Grid, Card, CardHeader, CardContent, FormControl, InputLabel, MenuItem, Select, CardActionArea, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    background: 'rgba(255, 255, 255, 0.7)'
  },
  taskCards: {
    minWidth: 300,
    border: '2px solid #444'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  }
}));

export default () => {
  const styles = useStyles();

  return (
    <div>
      <Head title="Simple Scrum Simulator" />

      <Background />

      <Nav />

      <div className="app-wrap">
        <Container fixed>

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >

            <Grid
              item
              xs={12}
              md={4}
              justify="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={12} md={12}>
                  <Typography>TODO</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              justify="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={12} md={12}>
                  <Typography>DOING</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
              justify="center"
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={12} md={12}>
                  <Typography>DONE</Typography>
                </Grid>
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
