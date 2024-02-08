import { Layout } from '../components/Layout';
import ShowJobs from '../components/ShowJobs';
import AddJob from '@/components/AddJob';

function Index() {

  return (
    <Layout>
      <AddJob />
      <div>
        <ShowJobs />
      </div>
    </Layout>
  )
}

export default Index