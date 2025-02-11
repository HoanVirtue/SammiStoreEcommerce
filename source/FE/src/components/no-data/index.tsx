// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { Modal, ModalProps, Typography } from '@mui/material'

import NoDataImg from '../../../public/images/no-data.png'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

type TProps = {
    imageWidth?: string,
    imageHeight?: string,
    textNodata?: string
}

const NoData = (props: TProps) => {

    
    // ** Hook
    const theme = useTheme()
    const {t} = useTranslation()
    
    //Props
    const {imageWidth = "100px", imageHeight = "100px", textNodata = t('no_data')} = props

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Image src={NoDataImg}
                alt={"no-data"}
                style={{ width: imageWidth, height: imageHeight, objectFit: 'cover' }}
                width={0}
                height={0} />
                <Typography sx={{whiteSpace: "nowrap", mt: 2}}>{textNodata}</Typography>
        </Box>
    )
}

export default NoData
