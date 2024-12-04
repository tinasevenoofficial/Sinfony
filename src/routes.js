import ProyectosDashboard from 'views/Proyectos/Dashboard.js'
import MiRadicacion from 'views/Radicacion/MisRadicaciones/MiRadicacion.js'
import Liquidar from 'views/LiquidacionEscritura/LiquidarEscritura'
import RadicacionList from 'views/Radicacion'
import DepositoList from 'views/Depositos/ListaDepositos/ListDepositos'
import MisProyectos from 'views/Proyectos/CrearMisProyectos/MisProyectos'

import CrearDocumentoAgil from 'views/Digitacion/CrearDocumentoAgil.js'
import Documents from 'views/Digitacion/Documents'
import Plantillas from 'views/Digitacion/Plantillas'

import SeleccionDocumento from 'views/SeleccionDocumento/SeleccionDocumento.js'
import AdminUsers from 'views/Usuarios/AdminUsers.js'
import AdminProjects from 'views/Usuarios/AdminProjects.js'
// import EstadoTramites from 'views/Maps/EstadoTramites.js'
import Tramites from 'views/SeleccionDocumento/Tramites.js'
import Solicitud from 'views/Maps/Solicitud.js'
import LogoutPage from 'views/Pages/LogoutPage'
import Departamentos from 'views/Lugares/Departamentos'
import Municipios from 'views/Lugares/Municipios'
import EstadosCiviles from 'views/Usuarios/EstadosCiviles'
import Roles from 'views/Usuarios/Roles'
import TipoResponsabilidades from 'views/Usuarios/TipoResponsabilidades'
import TipoRegimenes from 'views/Usuarios/TipoRegimenes'
import TipoOrganizaciones from 'views/Usuarios/TipoOrganizaciones'
import TipoPersona from 'views/Usuarios/TipoPersona'
import EstadoEscrituras from 'views/Radicacion/EstadoEscrituras'
import TipoOtorgantes from 'views/Radicacion/TipoOtorgantes'
import Edicto from 'views/Utilidades/Edicto'
import { Consultation } from 'views/Portfolio'
import NominaElectronica from 'views/FacturacionElectronica/NominaElectronica'
import FacturacionElectronica from 'views/FacturacionElectronica/FacturacionElectronica'
import CrearRadicacionExpress from 'views/CrearExpress/CrearRadicacionExpress'
import CrearSeguimientoExpress from 'views/CrearExpress/CrearSeguimientoExpress'
// @material-ui/icons
import HowToReg from '@material-ui/icons/HowToReg'
import Description from '@material-ui/icons/Description'
import RateReview from '@material-ui/icons/RateReview'
import CardTravelIcon from '@material-ui/icons/CardTravel'
import Receipt from '@material-ui/icons/Receipt'
import ExitToApp from '@material-ui/icons/ExitToApp'
import TipoDepositos from 'views/Depositos/SelectTipoDeposito'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import ReceiptIcon from '@material-ui/icons/Receipt'
import Descargues from 'views/Descargues/Descargues'
import { CreateProcess } from 'views/Process'
import AsignarHorariosySabados from "views/Utilidades/AsignarHorariosySabados";

const dashRoutes = [
  {
    collapse: true,
    name: 'Escrituración',
    icon: Receipt,
    state: 'radicacionCollapse',
    permisosView: ['1', '2', '49', '5', '6', '78', '69', '70', '73'],
    views: [
      {
        path: '/proyectos',
        name: 'Mis proyectos',
        mini: 'P',
        component: ProyectosDashboard,
        layout: '/admin',
        permisos: '69',
      },
      {
        path: '/mis-proyectos',
        name: 'Crear Mis Proyectos',
        mini: 'P',
        component: MisProyectos,
        layout: '/admin',
        permisos: '70',
      },

      {
        path: '/tipos-otorgantes',
        name: 'Tipos otorgantes',
        mini: 'TO',
        component: TipoOtorgantes,
        layout: '/admin',
        permisos: '49',
      },
      {
        path: '/misRadicaciones',
        name: 'Mis radicaciones',
        mini: 'MR',
        component: MiRadicacion,
        layout: '/admin',
        permisos: '73',
      },
      {
        path: '/radicaciones',
        name: 'Radicaciones',
        mini: 'R',
        component: RadicacionList,
        layout: '/admin',
        permisos: '6',
      },
      {
        path: '/liquidaciones',
        name: 'Liquidar Escritura',
        mini: 'L',
        component: Liquidar,
        layout: '/admin',
        permisos: '9',
      },
      {
        path: '/radiExpress',
        name: 'Crear radicación Express',
        mini: 'RE',
        component: CrearRadicacionExpress,
        layout: '/admin',
        permisos: '78',
      },
      {
        path: '/seguimientoExpress',
        name: 'Crear seguimiento Express',
        mini: 'SE',
        component: CrearSeguimientoExpress,
        layout: '/admin',
        permisos: '78',
      },
    ],
  },
  {
    collapse: true,
    name: 'Configuración',
    icon: HowToReg,
    state: 'clientCollapse',
    permisosView: ['25', '53', '29', '33', '37', '41', '45', '49', '17', '21', '9'],
    views: [
      {
        path: '/user-page',
        name: 'Administrador de Usuarios',
        mini: 'AU',
        component: AdminUsers,
        layout: '/admin',
        permisos: '25',
      },
      {
        path: '/project-page',
        name: 'Administrador de Proyectos',
        mini: 'AU',
        component: AdminProjects,
        layout: '/admin',
        permisos: '2',
      },
      {
        path: '/estados-escrituras',
        name: 'Estados escrituras',
        mini: 'E',
        component: EstadoEscrituras,
        layout: '/admin',
        permisos: '53',
      },
      {
        path: '/roles',
        name: 'Roles',
        mini: 'R',
        component: Roles,
        layout: '/admin',
        permisos: '29',
      },
      {
        path: '/estados-civiles',
        name: 'Estados civiles',
        mini: 'EC',
        component: EstadosCiviles,
        layout: '/admin',
        permisos: '33',
      },
      {
        path: '/tipo-responsabilidades',
        name: 'Tipo de responsabilidades',
        mini: 'TE',
        component: TipoResponsabilidades,
        layout: '/admin',
        permisos: '37',
      },
      {
        path: '/tipo-regimenes',
        name: 'Tipos de regimen',
        mini: 'TR',
        component: TipoRegimenes,
        layout: '/admin',
        permisos: '41',
      },
      {
        path: '/tipo-organizaciones',
        name: 'Tipo de organizaciones',
        mini: 'TO',
        component: TipoOrganizaciones,
        layout: '/admin',
        permisos: '45',
      },
      {
        path: '/tipo-persona',
        name: 'Tipo de persona',
        mini: 'TP',
        component: TipoPersona,
        layout: '/admin',
        permisos: '49',
      },
      {
        path: '/departamentos',
        name: 'Departamentos',
        mini: 'D',
        component: Departamentos,
        layout: '/admin',
        permisos: '17',
      },
      {
        path: '/municipios',
        name: 'Municipios',
        mini: 'M',
        component: Municipios,
        layout: '/admin',
        permisos: '21',
      },
    ],
  },
  {
    collapse: true,
    name: 'Trámites',
    rtlName: 'صفحات',
    icon: Description,
    state: 'documentoCollapse',
    permisosView: ['61', '62'],
    views: [
      {
        path: '/seleccionDocumento',
        name: 'Nuevo Trámite',
        mini: 'NT',
        rtlMini: 'و',
        component: SeleccionDocumento,
        layout: '/admin',
        permisos: '62',
      },
      {
        path: '/EstadoTramites',
        name: 'Tramites',
        mini: 'ET',
        rtlMini: 'زم',
        component: CreateProcess,
        permisos: '87',
        layout: '/admin',
      },
      {
        path: '/ver-solicitudes',
        name: 'Ver solicitudes',
        rtlName: 'خرائط جوجل',
        mini: 'VS',
        component: Solicitud,
        permisos: '87',
        layout: '/admin',
      },{
        path: '/ver-tramites',
        name: 'Consultar tramites',
        rtlName: 'خرائط جوجل',
        mini: 'VS',
        component: Tramites,
        permisos: '85',
        layout: '/admin',
      },
    ],
  },
  //{
  //   collapse: true,
  //   name: "Pasos",
  //   rtlName: "صفحات",
  //   icon: Description,
  //   state: "pasosCollapse",
  //   permisosView: ["6"],
  //   views: [
  //     {
  //       path: "/pasos/:id(\\d+)?",
  //       name: "Pasos",
  //       mini: "PA",
  //       rtlMini: "و",
  //       component: RadicacionView,
  //       layout: "/admin",
  //       permisos: "6",
  //     },
  //   ],
  // },
  {
    collapse: true,
    name: 'Documentos Agiles',
    rtlName: 'صفحات',
    icon: RateReview,
    state: 'documentAgilesCollapse',
    permisosView: ['66', '65'],
    views: [
      {
        path: '/crearDocumentoAgil',
        name: 'Crear Documento',
        mini: 'CD',
        component: CrearDocumentoAgil,
        layout: '/admin',
        permisos: '66',
      },
      {
        path: '/documents',
        name: 'Documentos',
        mini: 'D',
        component: Documents,
        layout: '/admin',
        permisos: '65',
      },
      {
        path: '/plantillas',
        name: 'Plantillas',
        mini: 'P',
        component: Plantillas,
        layout: '/admin',
        permisos: '65',
      },
    ],
  },
  {
    collapse: true,
    name: 'Facturación',
    rtlName: 'صفحات',
    icon: ReceiptIcon,
    state: 'facturacionState',
    permisosView: ['25', '53', '29', '33', '37', '41', '45', '49', '17', '21', '9'],
    views: [
      {
        path: '/facElectronica',
        name: 'Fac. Electrónica',
        mini: 'FE',
        component: FacturacionElectronica,
        layout: '/admin',
        permisos: '2',
      },
      {
        path: '/nominaElectronica',
        name: 'Nomina Electrónica',
        mini: 'NE',
        component: NominaElectronica,
        layout: '/admin',
        permisos: '2',
      },
    ],
  },
  {
    collapse: true,
    name: 'Utilidades',
    rtlName: 'utl',
    icon: CardTravelIcon,
    state: 'utilidadesCollapse',
    permisosView: ['66', '65'],
    views: [
      {
        path: '/edictos',
        name: 'Edictos',
        mini: 'E',
        component: Edicto,
        layout: '/admin',
        permisos: '65',
      },
      {
        path: "/asignarHorarios",
        name: "Horarios y Sabados",
        mini: "H",
        component: AsignarHorariosySabados,
        layout: "/admin",
        permisos: "65",
      },
    ],
  },
  {
    collapse: true,
    name: 'Cartera',
    rtlName: 'Car',
    icon: AccountBalanceWalletIcon,
    state: 'carteraCollapse',
    permisosView: ['66', '65'],
    views: [
      {
        path: '/cartera',
        name: 'Consultar',
        mini: 'C',
        component: Consultation,
        layout: '/admin',
        permisos: '65',
      },
      {
        path: '/Depositos',
        name: 'Deposito',
        mini: 'D',
        rtlMini: 'و',
        component: TipoDepositos,
        layout: '/admin',
        permisos: '81',
      },
      {
        path: '/misDepositos',
        name: 'Mis depositoss',
        mini: 'MD',
        component: DepositoList,
        layout: '/admin',
        permisos: '73',
      },
      {
        path: '/descargues',
        name: 'Descargues',
        mini: 'Des',
        rtlMini: 'و',
        component: Descargues,
        layout: '/admin',
        permisos: '87',
      },
    ],
  },
  {
    path: '/logout-page',
    name: 'Cerrar Sesión',
    icon: ExitToApp,
    component: LogoutPage,
    layout: '/admin',
    permisos: '57',
  },
]
export default dashRoutes
