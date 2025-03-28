import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'
import ListBanner from 'src/view/pages/setting/banner/ListBanner'

//views

type TProps = {}

const Banner: NextPage<TProps> = () => {
    return <ListBanner />
}

export default Banner

Banner.permission = [PERMISSIONS.SETTING.BANNER.VIEW]

