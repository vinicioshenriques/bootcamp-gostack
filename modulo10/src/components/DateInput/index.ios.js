import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

export default function DateInput() {
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(() => {}, []);

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#fff" size={20} />
        <DateText />
      </DateButton>
    </Container>
  );
}
