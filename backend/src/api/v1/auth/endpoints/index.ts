import { LoginEndpoint } from './login.endpoint';
import { MeEndpoint } from './me.endpoint';
import { RegisterEndpoint  } from './register.endpoint';

export const authV1Endpoints = [
    LoginEndpoint,
    MeEndpoint,
    RegisterEndpoint 
];
