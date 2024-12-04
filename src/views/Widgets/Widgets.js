import React from "react";
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Weekend from "@material-ui/icons/Weekend";
import Home from "@material-ui/icons/Home";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import FormatQuote from "@material-ui/icons/FormatQuote";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Timeline from "components/Timeline/Timeline.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardText from "components/Card/CardText.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AssignmentIcon from "@material-ui/icons/Assignment";
import GroupIcon from '@material-ui/icons/Group';

import { Router, Route, Switch, Redirect } from "react-router-dom";
import ReactDOM from "react-dom";
import UserProfile from "views/Pages/UserProfile.js";
import { NavLink } from "react-router-dom";
import { createBrowserHistory } from "history";

import { widgetStories, bugs, website, server } from "variables/general.js";

import image from "assets/img/faces/card-profile1-square.jpg";

import {
  cardTitle,
  roseColor
} from "assets/jss/material-dashboard-pro-react.js";

const styles = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0"
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem"
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px"
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px"
    }
  },
  iconRose: {
    color: roseColor
  },
  marginTop30: {
    marginTop: "30px"
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px"
    }
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999"
  }
};

  // return window.location.pathname !== "/admin/full-screen-maps";
//   const hist = createBrowserHistory();
// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/liz" component={UserProfile} />
//       <Redirect from="/" to="UserProfile"/>
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );


const useStyles = makeStyles(styles);

export default function Widgets() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={11}>
              <Card testimonial>
                <div className={classes.testimonialIcon}>
                  <i
                    class="fa fa-file"
                    aria-hidden="true"
                    style={{ fontSize: "90px", color: "#43D9D3" }}
                  ></i>
                </div>
                <CardBody>
                  <h3 className={classes.cardTestimonialDescription}>
                    PODER GENERAL
                  </h3>
                  <p>Concede poder de algún patrimonio a otra persona.</p>
                </CardBody>
                <CardFooter testimonial>
                  <button type="button" class="btn btn-secondary mx-4 my-3">
                    Requisitos
                  </button>
                  <button type="button" class="btn btn-secondary my-3">
                    Crear documento
                  </button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={11}>
              <Card testimonial>
                <div className={classes.testimonialIcon}>
                  <i
                    class="fa fa-bell"
                    aria-hidden="true"
                    style={{ fontSize: "90px", color: "#43D9D3" }}
                  ></i>
                </div>
                <CardBody>
                  <h3 className={classes.cardTestimonialDescription}>
                    MATRIMINIO
                  </h3>
                  <p>Solicitud para efectuar un matrimonio.</p>
                </CardBody>
                <CardFooter testimonial>
                  <NavLink type="button" class="btn btn-secondary mx-4 my-3"  to="/admin/formulario" tag={Link}>
                    Vista notario
                  </NavLink>
                  <NavLink type="button" class="btn btn-secondary mx-4 my-3"  to="/admin/document" tag={Link}>
                    Vista notario
                  </NavLink>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={11}>
              <Card testimonial>
                <div className={classes.testimonialIcon}>
                  <i
                    class="fa fa-cart-arrow-down"
                    aria-hidden="true"
                    style={{ fontSize: "90px", color: "#43D9D3" }}
                  ></i>
                </div>
                <CardBody>
                  <h3 className={classes.cardTestimonialDescription}>
                    COMPRA VENTA
                  </h3>
                  <p>Solicitud para efectuar una compraventa.</p>
                </CardBody>
                <CardFooter testimonial>
                  <button type="button" class="btn btn-secondary mx-4 my-3">
                    Requisitos
                  </button>
                  <button type="button" class="btn btn-secondary my-3">
                    Crear documento
                  </button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={11}>
              <Card testimonial>
                <div className={classes.testimonialIcon}>
                  <i
                    class="fa fa-key"
                    aria-hidden="true"
                    style={{ fontSize: "90px", color: "#43D9D3" }}
                  ></i>
                </div>
                <CardBody>
                  <h3 className={classes.cardTestimonialDescription}>
                  CANCELACIÓN DE HIPOTECA
                  </h3>
                  <p>Solicitud para efectuar una cancelación de hipoteca</p>
                </CardBody>
                <CardFooter testimonial>
                  <button type="button" class="btn btn-secondary mx-4 my-3">
                    Vista notario
                  </button>
                  <button type="button" class="btn btn-secondary my-3">
                    Vista cliente
                  </button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
