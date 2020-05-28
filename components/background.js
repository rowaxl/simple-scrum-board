export default () => {
  return (
    <div id="background">
      <img src="/static/background.png" alt="Background" />
  
      <style jsx>{`
        #background {
          width: 101vw;
          height: 101vh;
          position: fixed;
          z-index: -1;
        }
        #background > img {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  )
}