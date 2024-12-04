
import React, {  useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from 'html2canvas';
import {Modal,Button} from "react-bootstrap"
import LogoDoble from "../../components/Logos/LogoDoble"
import { useReactToPrint } from 'react-to-print';
import './generarQR.css';
import domtoimage from 'dom-to-image';
import { jsPDF } from "jspdf";

const GenerarQr = (props)=>{
    console.log(props.data)
    var URLdomain = window.location.host;
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const image = () => {
        window.scrollTo(0,0) 
        
        html2canvas( document.getElementById('figuras')).then(function(canvas){
            let pngUrl = canvas.toDataURL("image/jpeg")
            let downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download =num;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });        
    }


    
    const PDF = () => {
        const input = document.getElementById('figuras');
            const pdf = new jsPDF('p', 'mm', [130, 90]);
            if (pdf) {
              domtoimage.toPng(input)
                .then(imgData => {
                  pdf.addImage(imgData, 'PNG', 10, 10);
                  
                  pdf.save(num+'.pdf');
                });
            }   
    }
    var num = '#'+props.numero;
    var URL = 'http://' + URLdomain + '/auth/seguimiento/' + props.data;

    return(
    <Modal show={props.showQr} onHide={()=>props.setShowQr(!props.showQr)} class="modal-sm">
        <Modal.Header closeButton>
            <Modal.Title>
                    Descargue el QR de seguimiento
            </Modal.Title>                    
        </Modal.Header>
        <Modal.Body  >
            <center class="modal-body">
                <div class="etiqueta" id="figuras" ref={componentRef}>
                    <LogoDoble></LogoDoble>
                    <a style={{ fontSize: 20}}>Radicación</a>
                    <div><a style={{ fontSize: 20}}>{num}</a></div>
                    
                    <QRCode                       
                        value={URL}
                        size={200}
                        level={"H"}
                        includeMargin={true}
                    />  
                    <p></p>
                </div>
            </center>
            {/* <Button variant="primary" href={URL}>Terminar</Button>      */}              
        </Modal.Body>
        <Modal.Footer>
            <Button variant="success" onClick={()=> image()}>PNG</Button>
            <Button variant="success" onClick={()=> PDF()}>PDF</Button>
            <Button variant="primary" onClick={()=>props.salir()}>Terminar</Button>
        </Modal.Footer>
    </Modal>
    )
}
export default GenerarQr;
