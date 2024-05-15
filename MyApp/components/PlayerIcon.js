import React from 'react';
import { View, Image, StyleSheet, PanResponder, Animated } from 'react-native';

const PlayerIcon = ({ player, onPlayerDrop }) => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        pan.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        // Calculate the drop position relative to the field
        const dropX = player.position.x + gesture.dx;
        const dropY = player.position.y + gesture.dy;

        // Pass the player ID and drop position to the parent component
        onPlayerDrop(player.id, { x: dropX, y: dropY });

        // Reset the position of the player icon
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.playerIconContainer,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Image source={player.avatar} style={styles.playerIcon} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  playerIconContainer: {
    position: 'absolute',
  },
  playerIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default PlayerIcon;
