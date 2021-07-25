import {client} from './client';

export const getTest = () => client.get('/test');
