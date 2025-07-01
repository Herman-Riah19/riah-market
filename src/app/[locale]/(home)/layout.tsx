import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar/navbar';
import * as React from 'react';

export interface ILayoutHomeProps {
    children?: React.ReactNode;
}

export default function LayoutHome (props: ILayoutHomeProps) {
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
}
