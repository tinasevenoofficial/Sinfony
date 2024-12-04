import React from "react";
import './Liquidacion.css';
import HeaderPDF from '..]/../assets/img/headPDF.png';
import QrPDF from '..]/../assets/img/qrPDF.png';
class PDF extends React.Component {

    data=this.props.dataFromParent
    
    render() {
        
        console.log(this.props)
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
                                    <a style= {{ fontWeight: 'bold', fontSize: 25} }>Liquidación</a>
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
							<div className="addresses">
								<div className="from">
                                    <table className="tabla">
                                        <tbody>
                                            <tr className="fila">
                                                <td className="item1"><a>Radicación No.:</a></td>
                                                <td className="item2" style= {{ fontWeight: 'bold'} }>{this.data.numeroRadicacion}</td>
                                            </tr>
                                        </tbody>
                                    </table>
								</div>
                                
							</div>
                            <br></br>
                            <table class="actos-table">
                                <thead>
                                    <tr class="actos-table-titulo"><th>Actos</th>
                                    <th>{this.data.fechaCreacion.substring(0, this.data.fechaCreacion.length - 3)}</th></tr>
                                </thead>
                                <tbody>
                                {this.data.actos.map(el => {
                                    return (
                                        <tr><td>{el.nombreActo}</td><td>{el.valor}</td></tr>
                                    );
                                })}
                                    
                                </tbody>
                            </table>
                            <br></br>
{/* 
 ######  ####### ######  #######  #####  #     # #######  #####     #     # ####### #######    #    ######  ###    #    #       #######  #####  
 #     # #       #     # #       #     # #     # #     # #     #    ##    # #     #    #      # #   #     #  #    # #   #       #       #     # 
 #     # #       #     # #       #       #     # #     # #          # #   # #     #    #     #   #  #     #  #   #   #  #       #       #       
 #     # #####   ######  #####   #       ####### #     #  #####     #  #  # #     #    #    #     # ######   #  #     # #       #####    #####  
 #     # #       #   #   #       #       #     # #     #       #    #   # # #     #    #    ####### #   #    #  ####### #       #             # 
 #     # #       #    #  #       #     # #     # #     # #     #    #    ## #     #    #    #     # #    #   #  #     # #       #       #     # 
 ######  ####### #     # #######  #####  #     # #######  #####     #     # #######    #    #     # #     # ### #     # ####### #######  #####  */}

                            <table class="tableizer-table">
                            <thead>
                                <tr class="tableizer-firstrow"><th className="col1">DERECHOS NOTARIALES</th><th className="col2 valor">VENDEDOR</th><th className="col3 valor">COMPRADOR</th><th className="col4 valor">TOTAL</th></tr></thead>
                                <tbody>
                                    {this.data.derechosNotariales.items.map(el => {
                                        return (                                        
                                            <tr><td>{el.nombreDerecho}</td><td className="valor">{el.vendedor}</td><td className="valor">{el.comprador}</td><td className="valor">{el.total}</td></tr>
                                        );
                                    })}
                                   
                                </tbody>
                            </table>
                            <table class="tabla-subtotal">
                                <tbody>
                                    <tr className="col1"><td className="subtotal">Subtotales</td><td className="subtotal-numero col2">{this.data.derechosNotariales.subtotal.vendedor}</td><td className="subtotal-numero col3">{this.data.derechosNotariales.subtotal.comprador}</td><td className="subtotal-numero col4">{this.data.derechosNotariales.subtotal.total}</td></tr>
                                </tbody>
                            </table>
                            <br></br>


{/* 
  #####  #     # ####### #     # #######    #     #####     ######  #######    ####### ######  ######  ####### #     # 
 #     # #     # #       ##    #    #      # #   #     #    #     # #          #     # #     # #     # #       ##    # 
 #       #     # #       # #   #    #     #   #  #          #     # #          #     # #     # #     # #       # #   # 
 #       #     # #####   #  #  #    #    #     #  #####     #     # #####      #     # ######  #     # #####   #  #  # 
 #       #     # #       #   # #    #    #######       #    #     # #          #     # #   #   #     # #       #   # # 
 #     # #     # #       #    ##    #    #     # #     #    #     # #          #     # #    #  #     # #       #    ## 
  #####   #####  ####### #     #    #    #     #  #####     ######  #######    ####### #     # ######  ####### #     # */}

                            
                            <table class="tableizer-table">
                            <thead>
                                <tr class="tableizer-firstrow"><th className="col1">CUENTAS DE ORDEN</th><th className="col2">VENDEDOR</th><th className="col3">COMPRADOR</th><th className="col4">TOTAL</th></tr></thead>
                                <tbody>

                                    {this.data.cuentasDeOrden.items.map(el => {
                                        return (                                        
                                            <tr><td>{el.nombreCuenta}</td><td className="valor">{el.vendedor}</td><td className="valor">{el.comprador}</td><td className="valor">{el.total}</td></tr>
                                        );
                                    })}
                                    
                                </tbody>
                            </table>
                            <table class="tabla-subtotal">
                                <tbody>
                                    <tr className="col1"><td className="subtotal">Subtotales</td><td className="subtotal-numero col2">{this.data.cuentasDeOrden.subtotal.vendedor}</td><td className="subtotal-numero col3">{this.data.cuentasDeOrden.subtotal.comprador}</td><td className="subtotal-numero col4">{this.data.cuentasDeOrden.subtotal.total}</td></tr>
                                </tbody>
                            </table>
                            <table class="tabla-total">
                                <tbody>
                                    <tr className="col1"><td className="total">Total a pagar en Notaría</td><td className="total-numero col2">{this.data.totalPagarNotaria.vendedor}</td><td className="total-numero col3">{this.data.totalPagarNotaria.comprador}</td><td className="total-numero col4">{this.data.totalPagarNotaria.total}</td></tr>
                                </tbody>
                            </table>
                            <br></br>




{/* 
 ####### ####### ######  #######  #####      #####     #     #####  ####### #######  #####  
 #     #    #    #     # #     # #     #    #     #   # #   #     #    #    #     # #     # 
 #     #    #    #     # #     # #          #        #   #  #          #    #     # #       
 #     #    #    ######  #     #  #####     #  #### #     #  #####     #    #     #  #####  
 #     #    #    #   #   #     #       #    #     # #######       #    #    #     #       # 
 #     #    #    #    #  #     # #     #    #     # #     # #     #    #    #     # #     # 
 #######    #    #     # #######  #####      #####  #     #  #####     #    #######  #####  */}


                            <table class="tableizer-table">
                            <thead>
                                <tr class="tableizer-firstrow"><th className="col1">OTROS GASTOS</th><th className="col2">VENDEDOR</th><th className="col3">COMPRADOR</th><th className="col4">TOTAL</th></tr></thead>
                                <tbody>
                                {this.data.otrosGastos.items.map(el => {
                                        return (                                        
                                            <tr><td>{el.nombreGasto}</td><td className="valor">{el.vendedor}</td><td className="valor">{el.comprador}</td><td className="valor">{el.total}</td></tr>
                                        );
                                    })}
                                
                                </tbody>
                            </table>
                            <table class="tabla-subtotal">
                                <tbody>
                                    <tr className="col1"><td className="subtotal">Subtotales</td><td className="subtotal-numero col2">{this.data.otrosGastos.subtotal.vendedor}</td><td className="subtotal-numero col3">{this.data.otrosGastos.subtotal.comprador}</td><td className="subtotal-numero col4">{this.data.otrosGastos.subtotal.total}</td></tr>
                                </tbody>
                            </table>
                            <table class="tabla-total">
                                <tbody>
                                    <tr className="col1"><td className="total">Costo Total </td><td className="total-numero col2">{this.data.costoTotal.vendedor}</td><td className="total-numero col3">{this.data.costoTotal.comprador}</td><td className="total-numero col4">{this.data.costoTotal.total}</td></tr>
                                </tbody>
                            </table>
                            
                            <br></br>
                           
							
                        
							
						</div>
					</div>
        </div>
      );
    }
  }
  
  
  export default PDF;
  
  
  