import { View, TouchableOpacity, Text } from 'react-native';
import { THEME } from '../../theme';
import { DuoInfo } from '../DuoInfo';
import { GameController } from 'phosphor-react-native'

import { styles } from './styles';

export interface DuoCardProps {
  id: string,
  name: string,
  yearsPlaying: number,
  hoursStart: string,
  hoursEnd: string,
  weeksDays: string[],
  useVoiceChannel: boolean
}

interface Props {
  data: DuoCardProps,
  onConnect: () => void
}

export function DuoCard({ data, onConnect }:Props) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label='Nome'
        value={data.name}
      />
      <DuoInfo
        label='Tempo de jogo'
        value={`${data.yearsPlaying} anos`}
      />
      <DuoInfo
        label='Disponibilidade'
        value={`${data.weeksDays.length} dias \u2022 ${data.hoursStart} - ${data.hoursEnd}`}
      />
      <DuoInfo
        label='Chamada de áudio?'
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        />
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}