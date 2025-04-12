import { NextPage } from 'next'
import React from 'react'
import { PERMISSIONS } from 'src/configs/permission'

//views
import ListEventPage from 'src/view/pages/manage-promotion/event/ListEvent'

type TProps = {}

    const Event: NextPage<TProps> = () => {
    return <ListEventPage />
}

export default Event

Event.permission = [PERMISSIONS.MANAGE_PROMOTION.EVENT.VIEW]
