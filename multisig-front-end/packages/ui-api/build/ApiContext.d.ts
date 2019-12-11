import { ApiProps } from './types';
import React from 'react';
declare const ApiContext: React.Context<ApiProps>;
declare const ApiConsumer: React.Consumer<ApiProps>;
declare const ApiProvider: React.Provider<ApiProps>;
export default ApiContext;
export { ApiConsumer, ApiProvider };
