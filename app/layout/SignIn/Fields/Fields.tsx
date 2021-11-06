import { useState, useEffect, useCallback, ReactElement } from 'react';
import { Button, Form, Icon, TextDisplay } from '@gatsby-tv/components';
import { Gatsby } from '@gatsby-tv/icons';
import { Class, Validators, useUniqueId } from '@gatsby-tv/utilities';
import {
  GetAuthSignInKeyResponse,
  PostAuthSignInResponse,
} from '@gatsby-tv/types';

import { useSession } from '@app/services/session';
import { fetcher } from '@app/utilities/fetcher';

import styles from './Fields.scss';

export interface FieldsProps {}

export function Fields(_props: FieldsProps): ReactElement {
  const id = useUniqueId('signin');
  const { setSession } = useSession();
  const [email, setEmail] = useState('');
  const [, setValid] = useState(false);
  const [key, setKey] = useState<string | undefined>(undefined);

  const onSubmit = useCallback((form: Record<string, unknown>) => {
    fetcher<PostAuthSignInResponse>('/auth/signin', {
      method: 'POST',
      body: form,
    })
      .catch((resp) => resp)
      .then((resp) => {
        setValid(resp.ok);
        return resp;
      })
      .then((resp) => resp.json())
      .then(({ key }) => setKey(key));
  }, []);

  useEffect(() => {
    if (!key) return;

    fetcher<GetAuthSignInKeyResponse>(`/auth/signin/${key}`)
      .then((resp) => resp.json())
      .then((resp) => setSession(resp.token));
  }, [key]);

  return (
    <div className={styles.Container}>
      <Form
        id={id}
        className={Class(styles.Card, styles.Form)}
        onSubmit={onSubmit}
      >
        <div className={styles.Heading}>
          <Icon src={Gatsby} size="largest" />
          <TextDisplay size="large">Sign In</TextDisplay>
        </div>
        <Form.Label className={styles.Label} for="email" label="Email">
          <Form.Field
            id="email"
            type="text"
            className={styles.Field}
            autoFocus
            value={email}
            onChange={setEmail}
            validators={[Validators.isEmail('Invalid email')]}
          />
        </Form.Label>
        <Button className={styles.Submit} type="submit" disabled={!email}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}
