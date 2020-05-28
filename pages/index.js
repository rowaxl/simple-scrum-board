import Head from '../components/head';
import Nav from '../components/nav';
import Background from '../components/background';
import { Container } from '@material-ui/core'


export default () => (
  <div>
    <Head title="Simple Scrum Simulator" />
    <Background />
    <Nav />

    <div className="app-wrap">
      <Container fixed>
        Hello Next.js
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
);
