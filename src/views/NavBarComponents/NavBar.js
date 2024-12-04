/*eslint-disable*/
import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// CSS Custom Steps
import "./NavBar.css";

//  antd design
import { Steps, Button, message } from 'antd';
import { CalculatorOutlined, SolutionOutlined, DollarOutlined, SmileOutlined } from '@ant-design/icons';

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

// Componentes de Uso
import LiquidarTables from "views/LiquidacionEscritura/LiquidarEscritura.js"



const styles = {
    cardTitle,
    pageSubcategoriesTitle: {
        color: "#3C4858",
        textDecoration: "none",
        textAlign: "center",
    },
    cardCategory: {
        margin: "0",
        color: "#999999",
    },
};

const { Step } = Steps;
const useStyles = makeStyles(styles);


export default function NavBar() {

    const classes = useStyles();
    const steps = [
        {
            title: 'Radicación',
            content: <Card styles={{ marginTop: '0px' }}>
                <CardHeader>
                    <h4 className={classes.cardTitle}>
                        Description about product
</h4>
                    <p className={classes.cardCategory}>
                        More information here
</p>
                </CardHeader>
                <CardBody>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C
                    users after installed base benefits.
<br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <br /><br />
                    <br />
                    <br />
                    <br />
vv
s
Dramatically visualize customer directed convergence
without revolutionary ROI.
</CardBody>
            </Card>,
            icon: <SolutionOutlined style={{ verticalAlign: '0.125em' }} />,
        },
        {
            title: 'Liquidación',
            content: <LiquidarTables />,
            icon: <CalculatorOutlined style={{ verticalAlign: '0.125em' }} />
        },
        {
            title: 'Facturación',
            content: <Card styles={{ marginTop: '0px' }}>
                <CardHeader>
                    <h4 className={classes.cardTitle}>
                        Description about product
</h4>
                    <p className={classes.cardCategory}>
                        More information here
</p>
                </CardHeader>
                <CardBody>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C
                    users after installed base benefits.
<br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <br /><br />
                    <br />
                    <br />
                    <br />
vv
s
Dramatically visualize customer directed convergence
without revolutionary ROI.
</CardBody>
            </Card>,
            icon: <DollarOutlined style={{ verticalAlign: '0.125em' }} />,
        },
        {
            title: 'Completado',
            content: <Card styles={{ marginTop: '0px' }}>
                <CardHeader>
                    <h4 className={classes.cardTitle}>
                        Description about product
</h4>
                    <p className={classes.cardCategory}>
                        More information here
</p>
                </CardHeader>
                <CardBody>
                    Collaboratively administrate empowered markets via
                    plug-and-play networks. Dynamically procrastinate B2C
                    users after installed base benefits.
<br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <br /><br />
                    <br />
                    <br />
                    <br />
vv
s
Dramatically visualize customer directed convergence
without revolutionary ROI.
</CardBody>
            </Card>,
            icon: <SmileOutlined style={{ verticalAlign: '0.125em' }} />,
        },
    ];

    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    return (
        <div>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <Steps current={current} style={{ alignItems: 'center' }}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => next()}>
                                Siguiente
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                                Terminar
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                Anterior
                            </Button>
                        )}
                    </div>
                    {/* <NavPills
                        color="warning"
                        alignCenter
                        tabs={[
                            {
                                tabButton: "Radicación",
                                tabIcon: Description,
                                tabContent: (
                                    <Card styles={{ marginTop: '0px' }}>
                                        <CardHeader>
                                            <h4 className={classes.cardTitle}>
                                                Description about product
                      </h4>
                                            <p className={classes.cardCategory}>
                                                More information here
                      </p>
                                        </CardHeader>
                                        <CardBody>
                                            Collaboratively administrate empowered markets via
                                            plug-and-play networks. Dynamically procrastinate B2C
                                            users after installed base benefits.
                      <br />
                                            <br />
                                            <br />
                                            <br />
                                            <br />

                                            <br /><br />
                                            <br />
                                            <br />
                                            <br />
                      vv
                      s
                      Dramatically visualize customer directed convergence
                      without revolutionary ROI.
                    </CardBody>
                                    </Card>
                                ),
                            },
                            {
                                tabButton: "Liquidación",
                                tabIcon: Monetization,
                                tabContent: (
                                    <LiquidarTables></LiquidarTables>
                                ),
                            },
                            {
                                tabButton: "Facturación",
                                tabIcon: Receipt,
                                tabContent: (
                                    <Card>
                                        <CardHeader>
                                            <h4 className={classes.cardTitle}>
                                                Legal info of the product
                      </h4>
                                            <p className={classes.cardCategory}>
                                                More information here
                      </p>
                                        </CardHeader>
                                        <CardBody>
                                            Completely synergize resource taxing relationships via
                                            premier niche markets. Professionally cultivate one-to-one
                                            customer service with robust ideas.
                      <br />
                                            <br />
                      Dynamically innovate resource-leveling customer service
                      for state of the art customer service.
                    </CardBody>
                                    </Card>
                                ),
                            },
                        ]}
                    /> */}
                </GridItem>
            </GridContainer>
        </div>
    );
}
