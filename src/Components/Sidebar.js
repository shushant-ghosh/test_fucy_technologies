import React, { useContext, useState } from 'react'
import { Box, Button, makeStyles } from '@material-ui/core';
import { flowContext } from './Context.js/FlowContext';

const useStyles = makeStyles((theme) => ({
    control: {
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    marginX: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    }
}));

function Sidebar() {
    const FlowContext = useContext(flowContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const classes = useStyles()
    let list = FlowContext.nodes


    return (
        <div>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-center"}>
                {list.map((item, key) => {
                    return (
                        <Box className={classes.control} >{item?.data?.label}</Box>
                    )
                })}
            </Box>
            <Button variant="outlined" size="medium" color="primary" className={classes.marginX} onClick={() => setModalIsOpen(true)}>
                CREATE COMPONENT
            </Button>
        </div>
    )
}

export default Sidebar
