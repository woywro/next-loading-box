/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return { props: {} };
};

export const SlowLoadingPage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center my-12">
      <div className="text-4xl">I'm a slow page 🐢</div>
      <button className="mt-4" onClick={() => router.back()}>
        Go back
      </button>
    </div>
  );
};

export default SlowLoadingPage;
