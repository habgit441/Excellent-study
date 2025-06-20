
import Signup from './signup';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <Signup />
    </main>
  );
}


import Signup from '../component/signup';

export default function Home() {
  return (
    <>
      <Signup />
    </>
  );
}
