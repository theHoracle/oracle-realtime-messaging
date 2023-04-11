import Button from '@/components/ui/Button';
import { FC } from 'react';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div>Page
      <Button size='lg' variant='ghost'>Welcome to mySpace</Button>
    </div>
  )
}

export default page