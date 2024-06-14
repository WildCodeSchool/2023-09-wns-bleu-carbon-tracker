import Layout from '@/components/layout';
import Posts from '@/components/posts/allPosts';
import CreatePost from '@/components/posts/createPost';

function App() {
  return (
    <div>
      <Layout title='Bons plans'>
        <h1 className='flex justify-center text-3xl font-bold py-6'>
          Bons plans
        </h1>
        <CreatePost />
        <Posts />
      </Layout>
    </div>
  );
}

export default App;
