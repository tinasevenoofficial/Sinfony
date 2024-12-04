import React from 'react'

import MuiDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import PropTypes from 'prop-types'

import CardHeader from 'components/Card/CardHeader'

import useStyles from './Dialog.styles'

const Dialog = ({
  title,
  classes: classesProp,
  children,
  contentText,
  actions,
  open,
  onClose,
  dialogTitleProps,
  dialogContentProps,
  dialogContentTextProps,
  dialogActionsProps,
  ...others
}) => {
  const classes = useStyles()
  return (
    <MuiDialog open={open} onClose={onClose} classes={{ paper: classes.paper, ...classesProp }} {...others}>
      {title && <CardHeader {...dialogTitleProps}>{title}</CardHeader>}
      <DialogContent classes={{ root: classes.dialogContentRoot }} {...dialogContentProps}>
        {contentText && <DialogContentText {...dialogContentTextProps}>{contentText}</DialogContentText>}
        {children}
      </DialogContent>
      {actions && <DialogActions {...dialogActionsProps}>{actions}</DialogActions>}
    </MuiDialog>
  )
}

Dialog.propTypes = {
  ...MuiDialog.propTypes,
  dialogTitleProps: PropTypes.shape(CardHeader.propTypes),
  dialogContentProps: PropTypes.shape(DialogContent.propTypes),
  dialogContentTextProps: PropTypes.shape(DialogContentText.propTypes),
  dialogActionsProps: PropTypes.shape(DialogActions.propTypes),
  title: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  contentText: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default Dialog
