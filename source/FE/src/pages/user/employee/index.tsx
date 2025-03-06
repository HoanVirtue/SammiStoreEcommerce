import { NextPage } from 'next'
import React from 'react'

//configs
import { PERMISSIONS } from 'src/configs/permission'
import ListEmployeePage from 'src/view/pages/user/employee/ListEmployee'

//Pages

type TProps = {}

const Employee: NextPage<TProps> = () => {
    return <ListEmployeePage />
}

Employee.permission = [PERMISSIONS.USER.EMPLOYEE.VIEW]
export default Employee

