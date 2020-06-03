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
    minWidth: 275,
    border: '2px solid #444'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '90%'
  },
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
            spacing={1}
          >

            <Grid
              item
              xs={12}
              md={4}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item>
                  <Typography variant="h4" component="h4">TODO</Typography>
                </Grid>

                <Grid item>
                  <Card className={styles.taskCards}>
                    <CardContent>
                      <Typography variant="h5">Task1</Typography>
                      Make Something
                    </CardContent>
                    <CardActionArea>
                      <FormControl className={styles.formControl}>
                        <InputLabel id="label-select-resource">Resource</InputLabel>
                        <Select labelId="label-select-resource" defaultValue="" variant="standard">
                          <MenuItem value="">None</MenuItem>
                          <MenuItem value="p_1">JOHN DOE</MenuItem>
                          <MenuItem value="p_2">JANE DOE</MenuItem>
                          <MenuItem value="p_3">JACK DOE</MenuItem>
                        </Select>
                      </FormControl>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={12} md={12}>
                  <Typography variant="h4" component="h4">DOING</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              md={4}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={1}
              >
                <Grid item xs={12} md={12}>
                  <Typography variant="h4" component="h4">DONE</Typography>
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
