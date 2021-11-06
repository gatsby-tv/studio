import { useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSession } from '@app/services/session';
import { SignIn } from '@app/layout/SignIn';

export default function SignInRoute(): ReactElement {
  const { session } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.valid) navigate('/studio');
  }, [session.valid]);

  return (
    <SignIn.Layout>
      <SignIn.Fields />
    </SignIn.Layout>
  );
}
