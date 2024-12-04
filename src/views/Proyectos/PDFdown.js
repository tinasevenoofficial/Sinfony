import React from "react";
import './Radicacion.css';
import HeaderPDF from '..]/../assets/img/headPDF.png';
import QrPDF from '..]/../assets/img/qrPDF.png';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
/* import { Button } from '@progress/kendo-react-buttons';
import { PDFExport } from '@progress/kendo-react-pdf';
import { DropDownList } from '@progress/kendo-react-dropdowns'; */

import { useRef, useState} from 'react';

export default function PDFdown() {
	const pdfExportComponent = useRef(null);
	const [layoutSelection, setLayoutSelection] = useState({ text: "A4", value: "size-a4"});
	
	const ddData = [{ text: "A4", value: "size-a4" },
	                { text: "Letter", value: "size-letter" },
									{ text: "Executive", value: "size-executive" }
								 ];

	const handleExportWithComponent = (event) => {
    pdfExportComponent.current.save();
  }

	const updatePageLayout = (event) => {
		setLayoutSelection(event.target.value);
	}

  return(
    <div id="example">
			<div className="box wide hidden-on-narrow">
				<div class="box-col">
					<h4>Selecciona tamaño de papel</h4>
					{/* <DropDownList
							data={ddData}
							textField="text"
							dataItemKey="value"
							value={layoutSelection}
							onChange={updatePageLayout}
					>
					</DropDownList> */}
				</div>
				<div className="box-col">
					<h4>Exportar PDF</h4>
	    	  {/* <Button primary={true} onClick={handleExportWithComponent}>Exportar</Button> */}
				</div>
			</div>
			{/* <div className="page-container hidden-on-narrow">
				<PDFExport ref={pdfExportComponent}>
					<div className={ `pdf-page ${ layoutSelection.value }` }>
						<div className="inner-page">
							<div className="pdf-header">
								<span className="company-logo">                                    
									<img className="header" src={HeaderPDF} />                                     
								</span>
								<span> <img className="qr" src={QrPDF} /></span>
							</div>
                            <div className="">
                                <GridContainer>
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
                                </GridContainer>
                                
                            </div>
							<div className="addresses">
								<div className="for">
									<table className="tabla">
                                        <tbody>
                                            <tr className="fila">
                                                <td className="item1"><a>Firma:</a></td>
                                                <td className="item2" >16/27/2021</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1"><a>Proyecto:</a></td>
                                                <td className="item2">DC CONTRUCTORES URBANOS SA</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1">Dirección</td>
                                                <td className="item2">CARRERA 7C No. 2A-30 APTO 504 INT 2 - GIRÓN, SANTANDER</td>
                                            </tr>
                                            <tr className="fila">
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
                                            </tr>
                                        </tbody>
                                    </table>
								</div>

								<div className="from">
                                    <table className="tabla">
                                        <tbody>
                                            <tr className="fila">
                                                <td className="item1"><a>Radicación No.:</a></td>
                                                <td className="item2" style= {{ fontWeight: 'bold'} }>785145</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1"><a>Fecha:</a></td>
                                                <td className="item2">12/20/2021</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1">Radica:</td>
                                                <td className="item2">ALFONSO</td>
                                            </tr>
                                            <tr className="fila">
                                                <td className="item1">Escritura No.:</td>
                                                <td className="item2" style= {{ fontWeight: 'bold'} }>7554</td>
                                            </tr>
                                        </tbody>
                                    </table>
								</div>
							</div>
                            <div>
                                <table className="tabla2" cellSpacing={0} border={0}>
                                    <colgroup span={4} width={100} />
                                    <colgroup width={100} />
                                    <colgroup width={100} />
                                    <colgroup width={50} />
                                    <colgroup width={50} />
                                    <tbody>
                                        <tr>
                                            <td className="tabla-titulo" colSpan={5} rowSpan={3} height={30} align="center" valign="middle">01250000 - COMPRAVENTA DE BIENES INMUEBLES</td>
                                            <td className="tabla-titulo" align="left" valign="bottom">Cuantia:</td>
                                            <td className="tabla-data" align="left" valign="bottom">UJJ</td>
                                        </tr>
                                        <tr>
                                            <td className="tabla-titulo" align="left" valign="bottom">Adq:</td>
                                            <td className="tabla-data" align="left" valign="bottom">IKK</td>
                                        </tr>
                                        <tr>
                                            <td className="tabla-titulo" align="left" valign="bottom">Matricula:</td>
                                            <td className="tabla-data" align="left" valign="bottom">LLL</td>
                                        </tr>
                                        <tr>
                                            <td className="tabla-titulo" height={10} align="left" valign="bottom">Tipo</td>
                                            <td className="tabla-titulo" align="left" valign="bottom">ID</td>
                                            <td className="tabla-titulo" align="left" valign="bottom">Expedida en</td>
                                            <td className="tabla-titulo" width={300} align="left" valign="bottom">Otorgante</td>
                                            <td className="tabla-titulo" align="left" valign="bottom">Telefono</td>
                                            <td className="tabla-titulo" align="left" valign="bottom">Direccion</td>
                                            <td className="tabla-titulo" align="left" valign="bottom">Correo</td>
                                        </tr>
                                        <tr>
                                            <td className="tabla-data" height={20} align="left" valign="bottom">DE</td>
                                            <td className="tabla-data" align="left" valign="bottom">665565665</td>
                                            <td className="tabla-data" align="left" valign="bottom">BOGOTA DC</td>
                                            <td className="tabla-data"  width={300} align="left" valign="bottom">AGUIRRE PEÑA CRISTIAN LEONARDO</td>
                                            <td className="tabla-data" align="left" valign="bottom">3165555244</td>
                                            <td className="tabla-data" align="left" valign="bottom">CARRERA 7C  No. 23-45 APTO 702..</td>
                                            <td className="tabla-data" align="left" valign="bottom">fiduciaria123@constructora.com</td>
                                        </tr>
                                        <tr>
                                            <td className="tabla-data" height={20} align="left" valign="bottom">DE</td>
                                            <td className="tabla-data" align="left" valign="bottom">665565665</td>
                                            <td className="tabla-data" align="left" valign="bottom">BOGOTA DC</td>
                                            <td className="tabla-data"  width={300} align="left" valign="bottom">AGUIRRE PEÑA CRISTIAN LEONARDO</td>
                                            <td className="tabla-data" align="left" valign="bottom">3165555244</td>
                                            <td className="tabla-data" align="left" valign="bottom">CARRERA 7C  No. 23-45 APTO 702..</td>
                                            <td className="tabla-data" align="left" valign="bottom">fiduciaria123@constructora.com</td>
                                        </tr>
                                    </tbody>
                                </table>
							</div>
						</div>
					</div>
				</PDFExport>
			</div> */}
		</div>
  );
}

