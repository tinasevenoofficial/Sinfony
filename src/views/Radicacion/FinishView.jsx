import React from "react";
import PropTypes from "prop-types";
import "animate.css";

// material ui core components
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// local
import useStyles from "./styles/FinishViewStyles";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

const FinishView = (props) => {
  const classes = useStyles();
  const { numRad, message } = props;

  return (
    <Grid container justify="center">
      <Grid item>
        <Card className={classes.card}>
          <CardBody>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item xs={12} align="center">
                <Avatar className={classes.icon}>
                  <DoneOutlineIcon />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  {`Radicacion No. ${numRad}`}
                </Typography>
                <Typography variant="h6" align="center">
                  {message}
                </Typography>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </Grid>
    </Grid>
  );
};

FinishView.defaultProps = {
  message: "Pendiente de enviar a la DIAN",
};

FinishView.propTypes = {
  numRad: PropTypes.number.isRequired,
  message: PropTypes.string,
};

FinishView.displayName = "FinishView";
export default FinishView;
