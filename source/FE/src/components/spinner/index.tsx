// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { Modal, ModalProps } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const CustomModal = styled(Modal)<ModalProps>(({ theme }) => ({
  "&.MuiModal-root": {
    width: '100%',
    height: '100%',
    zIndex: 2000,
    ".MuiBackdrop-root": {
      backgroundColor: `rgba(${theme.palette.customColors.main}, 0.4)`
    }
  }
}))

const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  const theme = useTheme()

  return (
    <CustomModal open={true}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          ...sx
        }}
      >
        <CircularProgress disableShrink sx={{ mt: 6 }} />
      </Box>
    </CustomModal>
  )
}

export default Spinner
