import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import React from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />
));

interface AlertMessageProps {
  open: boolean;
  setOpen: Function;
  severity: 'error' | 'success' | 'info' | 'warning';
  message: string;
}

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
export const AlertMessage = ({open, setOpen, severity, message}: AlertMessageProps) => {
  const handleCloseAlertMessage = (e?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        autoHideDuration={6000}
        open={open}
        onClose={handleCloseAlertMessage}
      >
        <Alert severity={severity} onClose={handleCloseAlertMessage}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
