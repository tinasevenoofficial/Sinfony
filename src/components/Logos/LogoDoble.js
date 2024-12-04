import React from 'react'
import { dualImages } from 'utils/constants'
import { useTenancyContext } from 'context/TenancyContext'
import ReactLoading from 'react-loading'

import './logoDoble.css'

const LogoDoble = () => {
  const { loading, name } = useTenancyContext()

  return (
    <div>
      <div className="loading-img">
        <center>
          <a>
            {loading ? (
              <ReactLoading type="bubbles" color="#2d358c" height="20%" width="20%" />
            ) : (
              <img className="photoLogoSinfonyDual" src={dualImages[name]} alt="..." />
            )}
          </a>
        </center>
      </div>
    </div>
  )
}

export default LogoDoble
