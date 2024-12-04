import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import './Factura.css';
import HeaderPDF from '..]/../assets/img/headPDF.png';
import QrPDF from '..]/../assets/img/qrPDF.png';
class PDF extends React.Component {
    render() {
      return (
        <div >
            <div className={ `pdf-page` }>
						<div className="inner-page">
							<div className="pdf-header">
								<span className="company-logo">
                                    
									<img className="header" src={HeaderPDF} /> 

                                    
								</span>
								{/* <span className="company-logo">
									
								</span> */}
								<span> <img className="qr" src={QrPDF} /></span>
							</div>
                            <div className="">

                            <div class="grid-container">
                                <div class="linea-1">
                                    <hr  style={{
                                        margin: '10px 0px',
                                        color: '#41A85F',
                                        backgroundColor: '#41A85F',
                                        height: 6,
                                        borderColor : '#41A85F',
                                    }}/>
                                </div>
                                <div class="nombre">
                                    <a style= {{ fontWeight: 'bold', fontSize: 25} }>Radicación</a>
                                </div>
                                <div class="linea-2">
                                    <hr  style={{
                                        margin: '10px 10px',
                                        
                                        color: '#41A85F',
                                        backgroundColor: '#41A85F',
                                        height: 6,
                                        borderColor : '#41A85F',
                                    }}/>
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
                                <hr  style={{
                                    margin: '10px 10px',
                                    
                                    color: '#41A85F',
                                    backgroundColor: '#41A85F',
                                    height: 6,
                                    borderColor : '#41A85F',
                                }}/>
							</div>
                            <br></br>
							<div className="addresses">
								<div className="for" id="tabla-cliente-border">
									<table className="tabla-cliente">
                                        <tbody>
                                            <tr className="fila">
                                                <td className="item1-cliente"><a>Cliente: </a></td>
                                                <td className="item2-cliente" ></td>
                                            </tr>
                                            <tr className="fila">
                                                
                                                <td  colspan="2" className="item2-cliente">850.513.213</td>
                                            </tr>
                                            <tr className="fila">
                                                
                                                <td  colspan="2" className="item2-cliente">DC CONTRUCTORES URBANOS SA</td>
                                            </tr>
                                            <tr className="fila">
                                                
                                                <td  colspan="2" className="item2-cliente">CARRERA 29 45 25 B. SOTOMAYOR, BUCARAMANGA SANTANDER</td>
                                            </tr>
                                            {/* <tr className="fila">
                                                <td className="item1">Contacto:</td>
                                                <td className="item2">55656556</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1">Digitador:</td>
                                                <td className="item2">CONTACTO</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1">Revisor</td>
                                                <td className="item2">CONTACTO</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
								</div>

								<div className="from">
                                    <table className="tabla">
                                        <tbody>
                                            <tr className="fila">
                                                <td className="item1"><a>Factura Electronica<br />de venta Nro. ESC - </a></td>
                                                <td className="item2" style= {{ fontWeight: 'bold', fontSize: '17pt'} }>3755</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1"><a>Fecha:</a></td>
                                                <td className="item2">16/12/2021 10:31 AM</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1"><a>Validación DIAN:</a></td>
                                                <td className="item2">16/12/2021 10:31 AM</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1"><a>Escritura Nro.:</a></td>
                                                <td className="item2" style= {{ fontWeight: 'bold', fontSize: '12pt'} }>6525</td>
                                            </tr>

                                            <tr className="fila">
                                                <td className="item1">Radicación Nro.:</td>
                                                <td className="item2">7554</td>
                                            </tr>
                                        </tbody>
                                    </table>
								</div>
							</div>
                            <br></br>
                            <table class="tabla-otorgantes">
                                <thead>
                                    <tr class="tabla-otorgantes-titulo"><th>OTORGANTES</th><th>&nbsp;</th><th>&nbsp;</th><th>&nbsp;</th></tr></thead><tbody>
                                    <tr><td>860.563.555</td><td>BANCO CAJA SOCIAL</td><td>860.563.555</td><td>BANCO CAJA SOCIAL</td></tr>
                                    <tr><td>860.563.555</td><td>GOMEZ TRIANA GLORIA LEOOR</td><td>860.563.555</td><td>GOMEZ TRIANA GLORIA LEOOR</td></tr>
                                </tbody>
                            </table>
                            <br></br>
                            <table class="tableizer-table">
                                <thead>
                                <tr class="tableizer-firstrow"><th className="col1">ACTOS</th><th className="col2">CUANTIA</th><th className="col3">AVALUO</th></tr></thead>
                                <tbody>
                                    <tr><td>CANCELACIÓN DE HIPOTECA EN MAYOR EXTENSIÓN - LIBERACIÓN DE UNIDADES PRIVADAS...</td><td className="valor">310235</td><td className="valor">310235</td></tr>
                                    <tr><td>COMPRAVENTA DE BIENES INMUEBLES</td><td className="valor">0</td><td className="valor">49870</td></tr>
                                    <tr><td>HIPOTECA SISTEMA ESPECIALIZADO FINANCIACIÓN 70% LEY 546 DE 1999 CON SUBSIDIO</td><td className="valor">0</td><td className="valor">434329</td></tr>       
                                </tbody>
                            </table>
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
                                            <li>Fotocpia de documento deidentidad Fotocpia de documento deidentidad Fotocpia de documento deidentidad Fotocpia de documento </li>
                                            <li>Registro civiles autenticados</li>
                                            <li>Copia de escrituras del inmueble Fotocpia de documento deidentidad Fotocpia de documento deidentidad</li>
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
      );
    }
  }
  
  export default function PDFcreateFactura ()  {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
    return (
      <div>
        <button onClick={handlePrint}>Imprimir</button>
        <PDF ref={componentRef} />
      </div>
    );
  };
  