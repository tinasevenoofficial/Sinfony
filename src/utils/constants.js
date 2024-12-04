import moment from "moment";

const API_TOKEN = "Bearer " + process.env.REACT_APP_TOKEN_API;

const API_BASE_URL = process.env.REACT_APP_URL_API + "/api/";

const EXTERNAL_API_PATHS = {
  start: process.env.REACT_APP_URL_API + "/api/iniciar?notaria=",
  facturaRadi: "/api/FacturaRadi?numero_radicacion=",
  radiFiltro:"/api/radiFiltro?token=",
  filtrosRadicacion:"/api/FiltrosRadicacion",
  factura:"/api/factura/",
  departamento: "/api/departamentos",
  municipio: "/api/municipios",
  estadoCivil: "/api/estadosCiviles",
  tipoRegimen: "/api/TiposRegimene",
  tipoOrganizacion: "/api/TiposOrganizacion",
  tipoResponsabilidad: "/api/TiposResponsabilidades",
  tipoPersona: "/api/TiposPersona",
  EstadoEscritura: "/api/estadosEscritura",
  tipoOtorgante: "/api/tiposOtorgantes",
  rol: "/api/UserRol",
  permiso: "/api/Permiso",
  rolPermiso: "/api/RolPermiso",
  permisosRoles: "/api/PermisosRoles",
  tipoDocIde: "/api/TiposDocumentosIdentificacion",
  persona: "/api/persona",
  usuario: "/api/usuario",
  banco: "/api/puc",
  cliente: "/api/clientes",
  deposito: "/api/depositos",
  proyecto: "/api/proyecto2",
  proyecto2: "/api/proyecto2",
  allprojects: "/api/Todosproyecto2",
  actos: "/api/actos",
  facturaLiq: "/api/facturaLiq",
  radicaciones: "/api/radi",
  radicaciones2: "/api/radi2",
  radi2Create: "/api/radi2Create",
  radicacionXNumero: "/api/radiNum",
  facturarDian: "/api/FacturarDian",
  edicto: "/api/edictos",
  facturacion: "/api/documents",
  seguiRadi2: "/api/seguiradi2",
  seguiradiCreate: "/api/seguiradiCreate",
  inmuebles: "/api/inmuebles",
  tipoInmueble: "/api/tipoInmueble",
  tramites: "/api/tramite",
  files: "/api/files",
  plantillaAgiles: "/api/PlantillaAgiles",
  documentosAgiles: "/api/documentosAgiles",
  plantillaDocumentos: "/api/plantillaDocumentos",
  descargues: "/api/descargues",
  conseDepo:"/api/conseDepo",
  totalesRadi:"/api/totalesRadi",
  depositosNumero:"/api/depositosNumero",
  documentsFiltros: "/api/documentsFiltros",
  pdfLiquidacion: "/api/pdfLiquidacion"
};

const PAYMENT_METHODS = [
  { name: "BONO", id: 1 },
  { name: "CHEQUE", id: 2 },
  { name: "CRÉDITO", id: 3 },
  { name: "DATAFONO", id: 4 },
  { name: "DEPÓSITO", id: 5 },
  { name: "EFECTIVO", id: 6 },
  { name: "MÚLTIPLE MEDIO DE PAGO", id: 8 },
  { name: "TRANSFERENCIA", id: 7 },
];

const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

const FILTER_DAYS = [
  {
    name: "Hoy",
    id: 1,
    fechaInicio: formatDate(moment()),
    fechaFin: formatDate(moment().add(1,"days")),
  },
  {
    name: "Ayer",
    id: 2,
    fechaInicio: formatDate(moment().subtract(1, "days")),
    fechaFin: formatDate(moment()),
  },
  {
    name: "Esta semana",
    id: 3,
    fechaInicio: formatDate(moment().startOf("week")),
    fechaFin: formatDate(moment()),
  },
  {
    name: "Semana pasada ",
    id: 4,
    fechaInicio: formatDate(moment().startOf("week").subtract(1, "week")),
    fechaFin: formatDate(moment().startOf("week")),
  },
  {
    name: "Este mes",
    id: 5,
    fechaInicio: formatDate(moment().startOf("month")),
    fechaFin: formatDate(moment()),
  },
  {
    name: "Mes pasado",
    id: 6,
    fechaInicio: formatDate(moment().startOf("month").subtract(1, "month")),
    fechaFin: formatDate(moment().startOf("week")),
  },
  {
    name: "Este año",
    id: 7,
    fechaInicio: moment().format("YYYY"),
  },
  {
    name: "Año pasado",
    id: 8,
    fechaInicio: moment().subtract(1, "year").format("YYYY"),
  },
  { name: "Todas", id: 9 },
];

const REQUIRED_METHODS = [1, 3, 5];

const STATES_RADICACION = {
  radicacion: 0,
  liquidacion: 1,
  facturacion: 2,
  finalizada: 3,
};

export const principalImages = {
  notaria: require('assets/img/LogosNotaria/LogoPrincipalNotadev.png'),
  Notadev: require('assets/img/LogosNotaria/LogoPrincipalNotadev.png'),
  Nota10bga: require('assets/img/LogosNotaria/LogoPrincipalNota10bga.png'),
  Nota26bta: require('assets/img/LogosNotaria/LogoPrincipalNota26bta.png'),
  Nota3bga: require('assets/img/LogosNotaria/LogoPrincipalNota3bga.png'),
  Nota14med: require('assets/img/LogosNotaria/LogoPrincipalNota14med.png'),
  Nota2bga: require('assets/img/LogosNotaria/LogoPrincipalNota2bga.png'),
  Nota51bta: require('assets/img/LogosNotaria/LogoPrincipalNota51bta.png'),
  Nota27bta: require('assets/img/LogosNotaria/LogoPrincipalNota27bta.png'),
  Nota27bta: require('assets/img/LogosNotaria/LogoPrincipalNota27bta.png'),
  Nota16bta: require('assets/img/LogosNotaria/LogoPrincipalNota16bta.png'),
  Nota2flo: require('assets/img/LogosNotaria/LogoPrincipalNota2flo.png'),
  Nota5bga: require('assets/img/LogosNotaria/LogoPrincipalNota5bga.png'),
  Nota1mon: require('assets/img/LogosNotaria/LogoPrincipalNota1mon.png'),
  Nota2rio: require('assets/img/LogosNotaria/LogoPrincipalNota2rio.png'),
  Nota72bta: require('assets/img/LogosNotaria/LogoPrincipalNota72bta.png'),
  Nota21cal: require('assets/img/LogosNotaria/LogoPrincipalNota21cal.png'),
  Nota2zip: require('assets/img/LogosNotaria/LogoPrincipalNota2zip.png'),
  Nota9bga: require('assets/img/LogosNotaria/LogoPrincipalNota9bga.png'),
  Nota35bta: require('assets/img/LogosNotaria/LogoPrincipalNota35bta.png'),
  Nota9cal: require('assets/img/LogosNotaria/LogoPrincipalNota9cal.png'),
  Nota5cal: require('assets/img/LogosNotaria/LogoPrincipalNota5cal.png'),
  Nota12cal: require('assets/img/LogosNotaria/LogoPrincipalNota12cal.png'),
  Nota4cal: require('assets/img/LogosNotaria/LogoPrincipalNota4cal.png'),
  Nota3env: require('assets/img/LogosNotaria/LogoPrincipalNota3env.png')
}

export const dualImages = {
  notaria: require('assets/img/LogosNotaria/LogoDualNotadev.png'),
  Notadev: require('assets/img/LogosNotaria/LogoDualNotadev.png'),
  Nota10bga: require('assets/img/LogosNotaria/LogoDualNota10bga.png'),
  Nota26bta: require('assets/img/LogosNotaria/LogoDualNota26bta.png'),
  Nota3bga: require('assets/img/LogosNotaria/LogoDualNota3bga.png'),
  Nota14med: require('assets/img/LogosNotaria/LogoDualNota14med.png'),
  Nota2bga: require('assets/img/LogosNotaria/LogoDualNota2bga.png'),
  Nota51bta: require('assets/img/LogosNotaria/LogoDualNota51bta.png'),
  Notax27bta: require('assets/img/LogosNotaria/LogoDualNota27bta.png'),
  Nota27bta: require('assets/img/LogosNotaria/LogoDualNota27bta.png'),
  Nota16bta: require('assets/img/LogosNotaria/LogoDualNota16bta.png'),
  Nota2flo: require('assets/img/LogosNotaria/LogoDualNota2flo.png'),
  Nota5bga: require('assets/img/LogosNotaria/LogoDualNota5bga.png'),
  Nota1mon: require('assets/img/LogosNotaria/LogoDualNota1mon.png'),
  Nota2rio: require('assets/img/LogosNotaria/LogoDualNota2rio.png'),
  Nota72bta: require('assets/img/LogosNotaria/LogoDualNota72bta.png'),
  Nota21cal: require('assets/img/LogosNotaria/LogoDualNota21cal.png'),
  Nota2zip: require('assets/img/LogosNotaria/LogoDualNota2zip.png'),
  Nota9bga: require('assets/img/LogosNotaria/LogoDualNota9bga.png'),
  Nota35bta: require('assets/img/LogosNotaria/LogoDualNota35bta.png'),
  Nota9cal: require('assets/img/LogosNotaria/LogoDualNota9cal.png'),
  Nota5cal: require('assets/img/LogosNotaria/LogoDualNota5cal.png'),
  Nota12cal: require('assets/img/LogosNotaria/LogoDualNota12cal.png'),
  Nota4cal: require('assets/img/LogosNotaria/LogoDualNota4cal.png'),
  Nota3env: require('assets/img/LogosNotaria/LogoDualNota3env.png')
}

export {
  API_TOKEN,
  API_BASE_URL,
  EXTERNAL_API_PATHS,
  PAYMENT_METHODS,
  REQUIRED_METHODS,
  STATES_RADICACION,
  FILTER_DAYS,
};
