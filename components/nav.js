import Link from 'next/link';

const Nav = () => (
  <div id="navi">
    <h2 id="app-title">Simple Scrum Board</h2>
    <span>
      <Link href={'//github.com/rowaxl/simple_scrum_simulator'}>
        <a>{'Repository'}</a>
      </Link>
    </span>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: Roboto;
      }
      #navi {
        width: 100%;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 1000;
      }
      a {
        color: #044dd7;
        text-decoration: none;
        font-size: 16px;
      }
      #app-title {
        display: inline;
        color: #044dd7;
        margin: 10px 20px;
        height: 30px;
      }
    `}</style>
  </div>
);

export default Nav;
