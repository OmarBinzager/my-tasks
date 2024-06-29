'use client';

import React from 'react'
import Sidebar from './components/Sidebar/Sidebar';
import { UseGlobalState } from './context/globalProvider';
import GlobalStyleProvider from './Providers/GlobalStyleProviders';

interface Props {
    children: React.ReactNode;
}

const DynamicLayout = ({ children }: Props) => {
    
const { isAuthPage } = UseGlobalState();
  return (
      <div className='w-full h-full'>
          {isAuthPage != 'true' ? (
              <GlobalStyleProvider>
                  <Sidebar />
                  <div className='w-full h-full'>{children}</div>
              </GlobalStyleProvider>
          ) : (
              <GlobalStyleProvider>
                  {children}
              </GlobalStyleProvider>
          )}
      </div>
  );
}

export default DynamicLayout