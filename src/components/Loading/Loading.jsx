import React from 'react'
import ReactLoading from 'react-loading'
import logoSinfonyG from 'assets/img/sinfonyLogoG.png'

const LoadingS = () => (
  <div>
    <div className="loading-puntos">
      <center>
        <ReactLoading type="bubbles" color="#2d358c" height="20%" width="10%" />
      </center>
    </div>
    <div className="title">
      <center>
        <a>Cargando</a>
      </center>
    </div>
    <div className="loading-img">
      <center>
        <a>
          <img className="photoLogoSinfonyL" src={logoSinfonyG} alt="logoSinfonyG" />
        </a>
      </center>
    </div>
  </div>
)

export default LoadingS
