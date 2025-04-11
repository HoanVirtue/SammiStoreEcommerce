import BlankLayout from 'src/view/layout/BlankLayout'
import Unauthorized from 'src/view/pages/401'

const Error401 = () => {
  return <Unauthorized />
}

export default Error401
Error401.getLayout = (page: React.ReactNode) =><BlankLayout>{page}</BlankLayout>