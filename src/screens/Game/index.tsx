import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { RouteGameParams } from '../../@types/navegation';
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoModal } from '../../components/DuoModal'

import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {

  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [duoDiscord, setDuoDiscord] = useState('')

  const navigation = useNavigation()
  const routes = useRoute()
  const game = routes.params as RouteGameParams

  function handleGoBack () {
    navigation.goBack()
  }

  async function getDiscordUser (adsId: string) {
    await fetch(`http://192.168.100.19:3333/ads/${adsId}/discord`)
      .then(resp => resp.json())
      .then(data => setDuoDiscord(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.100.19:3333/games/${game.id}/ads`)
      .then(resp => resp.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right}/>
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode='cover'
        />

        <Heading
          title={game.title}
          subtitle='Conecte-se e comece a jogar!'
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => { getDiscordUser(item.id) }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              N??o h?? an??ncios ainda.
            </Text>
          )}
        />

        <DuoModal
          visible={duoDiscord.length > 0}
          discord={duoDiscord}
          onClose={() => { setDuoDiscord('') }}
        />
      </SafeAreaView>
    </Background>
  );
}