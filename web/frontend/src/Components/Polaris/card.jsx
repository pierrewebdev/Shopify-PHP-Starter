import {Card, Text} from '@shopify/polaris';
import React from 'react';

function CardDefault() {
  return (
    <Card>
      <Text as="h2" variant="bodyMd">
        This is a sample card from Polaris. You finally got vite working.
      </Text>
    </Card>
  );
}

export default CardDefault