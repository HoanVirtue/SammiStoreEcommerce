// ** React Imports

import BlankLayout from 'src/view/layout/BlankLayout'
import NotFound from 'src/view/pages/404'

const Error404 = () => {
  return <NotFound />
}

export default Error404
Error404.getLayout = (page: React.ReactNode) =><BlankLayout>{page}</BlankLayout>
