import React, {ChangeEvent, useEffect, useState} from 'react';
import cn from 'classnames';
import {useHistory} from 'react-router-dom';
import {Button, Card, Heading, Form, Notification, Subheading, TextField} from '@contentful/forma-36-react-components';
import UserHTTPClient from "../../http/user";

const style = require('./Login.scss');

interface LoginProps {
  className?: string;
  userClient?: UserHTTPClient
}

const Login = ({className, userClient = new UserHTTPClient()}: LoginProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const history = useHistory();

  function performLogin() {
    return userClient.login(username, password)
      .then(() => history.push("/app"))
      .catch(() => Notification.warning('An error occurred'))
  }

  useEffect(() => {
    Notification.setPosition('top');
  });

  return (
    <div className={cn(style['Login'], className)}>
      <header className={cn(style['Login__header'], className)}>
        <Heading className={cn(style['Login__header-headline'], className)}>
          Howdy!
        </Heading>
        <Subheading className={cn(style['Login__header-sub-headline'], className)}>
          Login to your account
        </Subheading>
      </header>
      <Card padding={"large"}>
        <Form onSubmit={performLogin} spacing="default">
          <TextField
            required
            name="usernameInput"
            id="usernameInput"
            labelText="Username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value || '')}
          />
          <TextField
            required
            textInputProps={{type: 'password'}}
            name="passwordInput"
            id="passwordInput"
            labelText="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value || '')}
          />
          <Button isFullWidth type="submit">Submit</Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
