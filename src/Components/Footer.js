
import { Box, Grid, makeStyles } from '@material-ui/core'
import React, { useContext } from 'react'
import { flowContext } from './Context.js/FlowContext';

const useStyles = makeStyles((theme) => ({
    flexStartGrey: {
        display: "flex",
        justifyContent: "start",
        padding: "8px",
        backgroundColor: "lightgrey"
    },
    flexEndGrey: {
        display: "flex",
        justifyContent: "end",
        padding: "8px",
        backgroundColor: "lightgrey"
    },
    flexStartWhite: {
        display: "flex",
        justifyContent: "start",
        padding: "8px",
        backgroundColor: "white"
    },
    flexEndWhite: {
        display: "flex",
        justifyContent: "end",
        padding: "8px",
        backgroundColor: "white"
    },
    flexStartDark: {
        display: "flex",
        justifyContent: "start",
        padding: "8px",
        backgroundColor: "black",
        color: 'white'
    },
    flexEndDark: {
        display: "flex",
        justifyContent: "end",
        padding: "8px",
        backgroundColor: "black",
        color: 'white'
    },
}));

function Footer() {
    const FlowContext = useContext(flowContext)
    const classes = useStyles()
    const list = FlowContext.nodes

    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs="6" className={classes.flexStartDark}>
                    Name
                </Grid>
                <Grid item xs="6" className={classes.flexEndDark}>
                    Properties
                </Grid>
            </Grid>
            {list.map((item, key) => {
                return (
                    <Grid container spacing={0}>
                        <Grid item xs="6" className={key % 2 === 0 ? classes.flexStartGrey : classes.flexStartWhite}>
                            {item.data.label}
                        </Grid>
                        <Grid item xs="6" className={key % 2 === 0 ? classes.flexEndGrey : classes.flexEndWhite}>
                            {item.properties.map((data, index) => item.properties.length - 1 == index ? `${data}` : `${data}, `)}
                        </Grid>
                    </Grid>
                )
            })}
        </div>
    )
}

export default Footer
