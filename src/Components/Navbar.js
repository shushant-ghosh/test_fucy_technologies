import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core';

function Navbar() {
    return (
        <div>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={""}>
                        TesT
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar