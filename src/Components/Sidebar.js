import React, { useContext, useState } from 'react'
import { Box, Button, FormControl, Input, InputLabel, MenuItem, Modal, Select, makeStyles } from '@material-ui/core';
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
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4),
    },
}));
let propertiesOptions = ["confidentiality", "integrity", "authenticity", "authorization", "non-repudiation", "availability"]



function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

function Sidebar() {
    const { nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange } = useContext(flowContext)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [nodeName, setNodeName] = useState("")
    const [nodeProperties, setNodeProperties] = useState([])
    const [modalStyle, setModalStyle] = useState(getModalStyle)


    const classes = useStyles()

    const handleProperties = (event) => {
        setNodeProperties(event.target.value)
    }
    const CreateNewNode = () => {
        let newNode = {
            "id": String(nodes.length + 1),
            "position": {
                "x": Number(nodes[nodes.length - 1]?.position?.x) || 20,
                "y": Number(nodes[nodes.length - 1]?.position?.y) + 50 || 10,
            },
            "data": {
                "label": nodeName
            },
            "properties": nodeProperties
        }
        let temp = [...nodes]
        temp.push(newNode)
        console.log(temp)
        setNodes(temp)
        setNodeName("")
        setNodeProperties([])
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Enter New Node Name</h2>
            <FormControl className={classes.formControl}>
                <InputLabel id="node-name">New Node Name</InputLabel>
                <Input labelId="node-name" onChange={(e) => { setNodeName(e.target.value) }} style={{ width: "20vw" }} />
            </FormControl>
            <Box>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select Properties</InputLabel>
                    <Select
                        style={{ width: "20vw" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={nodeProperties}
                        onChange={(e) => handleProperties(e)}
                        multiple
                    >
                        {propertiesOptions.map(item => {
                            return (
                                <MenuItem value={item}>{item}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
            <Box className={classes.marginTop}>
                <Button variant="contained" color="primary"
                    disabled={nodeName === "" || nodeProperties.length == 0}
                    onClick={() => {
                        setModalIsOpen(false)
                        CreateNewNode()
                    }} >
                    Create
                </Button>
            </Box>
        </div>
    );

    return (
        <div>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"flex-center"}>
                {nodes.map((item, key) => {
                    return (
                        <Box className={classes.control} >{item?.data?.label}</Box>
                    )
                })}
            </Box>
            <Button variant="outlined" size="medium" color="primary" className={classes.marginX} onClick={() => setModalIsOpen(true)}>
                CREATE COMPONENT
            </Button>
            <Modal
                open={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}

export default Sidebar
