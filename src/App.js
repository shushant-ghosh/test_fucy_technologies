import { useEdgesState, useNodesState } from 'reactflow';
import Navbar from './Components/Navbar';
import { Grid, makeStyles } from '@material-ui/core';
import Sidebar from './Components/Sidebar';
import Footer from './Components/Footer';
import FlowContainer from './Components/FlowContainer';
import { flowContext } from './Components/Context.js/FlowContext';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

let properties = ["confidentiality", "integrity", "authenticity", "authorization", "non-repudiation", "availability"]

const initialNodes = [
  {
    "id": "1",
    "position": {
      "x": 20,
      "y": 10
    },
    "data": {
      "label": "Memory"
    },
    "properties": [
      "confidentiality",
      "integrity"
    ],
    "width": 150,
    "height": 37
  },
  {
    "id": "2",
    "position": {
      "x": 40,
      "y": 110
    },
    "data": {
      "label": "Microcontroller"
    },
    "properties": [
      "authenticity",
      "authorization"
    ]
  }
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const classes = useStyles();
  return (
    <flowContext.Provider value={{ nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange }}>
      <div>
        <Grid className={classes.root} spacing={2} >
          <Grid item xs={12} >
            <Navbar />
          </Grid>
          <Grid container spacing={0} style={{ minHeight: "79vh" }}>
            <Grid item xs={2} >
              <Sidebar />
            </Grid>
            <Grid item xs={10}>
              <FlowContainer />
            </Grid>
          </Grid>
          <Grid item xs={12}><Footer /></Grid>
        </Grid>
      </div>
    </flowContext.Provider >
  );
}

export default App;
