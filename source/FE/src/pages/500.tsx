import BlankLayout from 'src/view/layout/BlankLayout'
import InternalServerError from 'src/view/pages/500'

const Error500 = () => {
  return <InternalServerError />
}

export default Error500
Error500.getLayout = (page: React.ReactNode) =><BlankLayout>{page}</BlankLayout>