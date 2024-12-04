import React, { useRef, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import './Radicacion.css'
import HeaderPDF from '..]/../assets/img/headPDF.png'
import QrPDF from '..]/../assets/img/qrPDF.png'
import axios from 'axios'
import { Loading } from 'components'
class PDF extends React.Component {
  data = this.props.dataFromParent

  render() {
    return (
      <div>
        <div className={`pdf-page`}>
          <div className="inner-page">
            <div className="pdf-header">
              <span className="company-logo">
                <img className="header" src={HeaderPDF} />
              </span>
              {/* <span className="company-logo">
									
								</span> */}
              <span>
                {' '}
                <img className="qr" src={QrPDF} />
              </span>
            </div>
            <div className="">
              <div className="grid-container">
                <div className="linea-1">
                  <hr
                    style={{
                      margin: '10px 0px',
                      color: '#41A85F',
                      backgroundColor: '#41A85F',
                      height: 6,
                      borderColor: '#41A85F',
                    }}
                  />
                </div>
                <div className="nombre">
                  <a style={{ fontWeight: 'bold', fontSize: 25 }}>Radicación</a>
                </div>
                <div className="linea-2">
                  <hr
                    style={{
                      margin: '10px 10px',

                      color: '#41A85F',
                      backgroundColor: '#41A85F',
                      height: 6,
                      borderColor: '#41A85F',
                    }}
                  />
                </div>
              </div>
              {/*  <GridContainer>
                                    <GridItem md={6}>
                                        
                                        <hr  style={{
                                            margin: '10px 0px',
                                            color: '#41A85F',
                                            backgroundColor: '#41A85F',
                                            height: 6,
                                            borderColor : '#41A85F',
                                        }}/>
                                    </GridItem>
                                    <GridItem md={3}>
                                        <a style= {{ fontWeight: 'bold', fontSize: 18} }>Radicación</a>
                                    </GridItem>
                                    <GridItem md={3}>
                                        
                                        <hr  style={{
                                            margin: '10px 10px',
                                            
                                            color: '#41A85F',
                                            backgroundColor: '#41A85F',
                                            height: 6,
                                            borderColor : '#41A85F',
                                        }}/>
                                    </GridItem>
                                </GridContainer> */}
            </div>
            <div className="pdf-footer">
              <hr
                style={{
                  margin: '10px 10px',

                  color: '#41A85F',
                  backgroundColor: '#41A85F',
                  height: 6,
                  borderColor: '#41A85F',
                }}
              />
            </div>
            <div className="addresses">
              <div className="for">
                <table className="tabla">
                  <tbody>
                    <tr className="fila">
                      <td className="item1">
                        <a>Firma:</a>
                      </td>
                      <td className="item2">{this.data.fechaFirma}</td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">
                        <a>Proyecto:</a>
                      </td>
                      <td className="item2">{this.data.proyecto}</td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">Dirección</td>
                      <td className="item2">{this.data.direccion}</td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">Contacto:</td>
                      <td className="item2">{this.data.contacto}</td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">Digitador:</td>
                      <td className="item2">{this.data.digitador}</td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">Revisor</td>
                      <td className="item2">{this.data.revisor}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="from">
                <table className="tabla">
                  <tbody>
                    <tr className="fila">
                      <td className="item1">
                        <a>Radicación No.:</a>
                      </td>
                      <td className="item2" style={{ fontWeight: 'bold' }}>
                        {this.data.numeroRadicacion}
                      </td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">
                        <a>Fecha:</a>
                      </td>
                      <td className="item2">
                        {this.data.fechaCreacion.substring(0, this.data.fechaCreacion.length - 9)}
                      </td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">Radica:</td>
                      <td className="item2">{this.data.radica}</td>
                    </tr>
                    <tr className="fila">
                      <td className="item1">Escritura No.:</td>
                      <td className="item2" style={{ fontWeight: 'bold' }}>
                        {this.data.numeroEscritura}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <br></br>
            <div>
              {this.data.items.map((el, idx) => {
                return (
                  <table key={idx} className="tabla2" cellSpacing={0} border={0}>
                    <colgroup span={4} width={100} />
                    <colgroup width={100} />
                    <colgroup width={100} />
                    <colgroup width={50} />
                    <colgroup width={50} />
                    <tbody>
                      <tr>
                        <td className="tabla-titulo" colSpan={5} rowSpan={3} height={30} align="center" valign="middle">
                          {el.nombreRadicacion}
                        </td>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          Cuantia:
                        </td>
                        <td className="tabla-data" align="left" valign="bottom">
                          {el.cuantia}
                        </td>
                      </tr>
                      <tr>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          Adq:
                        </td>
                        <td className="tabla-data" align="left" valign="bottom">
                          {el.adq}
                        </td>
                      </tr>
                      <tr>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          Matricula:
                        </td>
                        <td className="tabla-data" align="left" valign="bottom">
                          {el.matricula}
                        </td>
                      </tr>
                      <tr>
                        <td className="tabla-titulo" height={10} align="left" valign="bottom">
                          Tipo
                        </td>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          ID
                        </td>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          Expedida en
                        </td>
                        <td className="tabla-titulo" width={300} align="left" valign="bottom">
                          Otorgante
                        </td>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          Telefono
                        </td>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          Direccion
                        </td>
                        <td className="tabla-titulo" align="left" valign="bottom">
                          Correo
                        </td>
                      </tr>
                      {el.otorgantes.map((ell, idy) => {
                        return (
                          <tr key={`${idx}-${idy}`}>
                            <td className="tabla-data" height={20} align="left" valign="bottom">
                              {ell.id}
                            </td>
                            <td className="tabla-data" align="left" valign="bottom">
                              665565665
                            </td>
                            <td className="tabla-data" align="left" valign="bottom">
                              BOGOTA DC
                            </td>
                            <td className="tabla-data" width={300} align="left" valign="bottom">
                              AGUIRRE PEÑA CRISTIAN LEONARDO
                            </td>
                            <td className="tabla-data" align="left" valign="bottom">
                              3165555244
                            </td>
                            <td className="tabla-data" align="left" valign="bottom">
                              CARRERA 7C No. 23-45 APTO 702..
                            </td>
                            <td className="tabla-data" align="left" valign="bottom">
                              fiduciaria123@constructora.com
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )
              })}
            </div>
            <br></br>
            <div className="documento-req">
              <a> DOCUMENTOS REQUERIDOS</a>
              <p></p>
              <div className="grid-container-doc-req">
                <div className="doc-req-1">
                  <ul>
                    <li>Fotocpia de documento deidentidad</li>
                    <li>Registro civiles autenticados</li>
                    <li>Copia de escrituras del inmueble</li>
                  </ul>
                </div>
                <div className="doc-req-2">
                  <ul>
                    <li>Fotocpia de documento deidentidad</li>
                    <li>Registro civiles autenticados</li>
                    <li>Copia de escrituras del inmueble</li>
                  </ul>
                </div>
              </div>
            </div>
            <br></br>
            <div className="documento-obs">
              <a> OBSERVACIONES</a>
              <p></p>
              <div className="grid-container-doc-obs">
                <div className="doc-obs-1">
                  <ul>
                    <li>
                      Fotocpia de documento deidentidad Fotocpia de documento deidentidad Fotocpia de documento
                      deidentidad Fotocpia de documento{' '}
                    </li>
                    <li>Registro civiles autenticados</li>
                    <li>
                      Copia de escrituras del inmueble Fotocpia de documento deidentidad Fotocpia de documento
                      deidentidad
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="pdf-chart">
								<Chart style={{ height: 280 }}>
									<ChartSeries>
										<ChartSeriesItem
												type="donut"
												data={sampleData}
												categoryField="product"
												field="share"
										>
											<ChartSeriesLabels
													color="#fff"
													background="none"
											/>
										</ChartSeriesItem>
									</ChartSeries>
								</Chart>
							</div> */}
            {/* <div className="pdf-body">
								<div id="grid"></div>
								<p className="signature">
									Signature: ________________ <br /><br />
									Date: 12.03.2014
								</p>
							</div> */}
          </div>
        </div>
      </div>
    )
  }
}

export default function PDFcreateRadicacion() {
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const [data, setData] = useState()
  const auth = useSelector(state => state.auth)
  let config = {
    method: 'get',
    url: process.env.REACT_APP_URL_API + '/api/pdfRadicacion?numero_radicacion=24',
    /* url:process.env.REACT_APP_URL_API+"/api/pdfLiquidacion?numero_radicacion=12", */
    headers: { Authorization: `Bearer ${auth.token}` },
    data: '',
  }
  useEffect(() => {
    const consultar = async () => {
      await axios(config)
        .then(response => {
          if (response.status == 201 || response.status == 200) {
            setData(response.data)
            console.log(response.data)
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
    consultar()
  }, [])

  return data == null ? (
    <div>
      <Loading />
    </div>
  ) : (
    <div>
      <button onClick={handlePrint}>Imprimir</button>
      <PDF ref={componentRef} dataFromParent={data} />
    </div>
  )
}
