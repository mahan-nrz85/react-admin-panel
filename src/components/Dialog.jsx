import React from 'react'
import Button from '@mui/material/Button';
// import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
const Styles = styled.div`
    font-family: 'vazir !important';
`

function DialogBox({open , close , children , titleModal}) {
  return (
    <Styles>
        <Dialog
            onClose={close}
            aria-labelledby="customized-dialog-title"
            open={open}
            PaperProps={{
                sx : {
                    width : '400px',
                    backgroundColor : 'var(--bg-sec)'
                }
            }}
        >
            <div className='flex justify-between'>
            <p className='!p-3 text-white'>
                {titleModal}
            </p>
            
            </div>
            <DialogContent dividers>
                {children}
            </DialogContent>
            
        </Dialog>
    </Styles>
  )
}

export default DialogBox
