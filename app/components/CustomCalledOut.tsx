import {CalloutCard} from '@shopify/polaris';
import { title } from 'process';
import React from 'react';
interface CustomCalledOutCardProps {
    title: string; 
    illustration: string;
    primaryActionContent: string;
    primaryActionUrl: string;
    children: React.ReactNode;
}

export function CustomCalledOut(props:CustomCalledOutCardProps) {
    const {
        title,
        illustration,
        primaryActionContent,
        primaryActionUrl,
        children,
      } = props;
  return (
    <CalloutCard
      title={title}
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: 'Customize checkout',
        url: '#',
      }}
    >
      <p>Upload your store’s logo, change colors and fonts, and more.</p>
    </CalloutCard>
  );
}