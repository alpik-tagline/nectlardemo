// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// export const handlePlaceOrder = async () => {
//   try {
//     const user = auth().currentUser;

//     if (!user) {
//       console.error('No user is logged in');
//       return;
//     }

//     const order = {
//       items: cartItems,
//       total: total,
//       email: user.email,
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     };
//     await firestore().collection('orders').add(order);
//     // navigation.navigate('OrderCon');
//   } catch (error) {
//     console.error('Error placing order: ', error);
//   }
// };
