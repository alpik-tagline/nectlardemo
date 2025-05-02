module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     [
//       'module-resolver',
//       {
//         root: ['./src'],
//         alias: {
//           '@screens': './src/screens',
//         },
//         extensions: ['.js', '.jsx', '.ts', '.tsx', '.png', '.jpg', '.jpeg'],
//       },
//     ],
//   ],
// };
// const data = [
//   { id: 1, image: <Image source={Banner} style={styles.bannerImg} /> },
//   { id: 2, image: <Image source={Banner} style={styles.bannerImg} /> },
//   { id: 3, image: <Image source={Banner} style={styles.bannerImg} /> },
// ];

