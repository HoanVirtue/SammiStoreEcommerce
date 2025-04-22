import BlankLayout from 'src/view/layout/BlankLayout'
import dynamic from 'next/dynamic'

const Unauthorized = dynamic(() => import('src/view/pages/401'), {
  loading: () => null,
  ssr: false
})

const Error401 = () => {
  return <Unauthorized />
}

export default Error401
Error401.getLayout = (page: React.ReactNode) =><BlankLayout>{page}</BlankLayout>