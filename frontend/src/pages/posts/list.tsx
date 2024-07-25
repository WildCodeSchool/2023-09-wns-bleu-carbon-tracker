import Typography from '@/components/commons/typography/Typography';
import Layout from '@/components/layout';
import Posts from '@/components/posts/allPosts';
import CreatePost from '@/components/posts/createPost';

function App() {
  return (
    <div>
      <Layout title='Bons plans'>
        <div className='w-full flex flex-col p-10 pb-0 max-[1710px]:p-2'>
          <div className='dashboardWidget h-[15vh] max-h-[128px] flex justify-between items-center mb-2'>
            <Typography customClass='text-4xl font-bold text-dark_green max-lg:text-3xl'>
              Mes bons blans
            </Typography>
          </div>
          <CreatePost />
          <Posts />
        </div>
      </Layout>
    </div>
  );
}

export default App;
