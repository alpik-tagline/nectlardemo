import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import line from '../images/Line.png';
import auth from '@react-native-firebase/auth';

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const user = auth().currentUser;

        if (!user) {
          console.error('No user is logged in');
          return;
        }

        const userOrdersSnapshot = await firestore()
          .collection('orders')
          .doc(user.email)
          .collection('userOrders')
          .get();

        const userOrders = userOrdersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(userOrders);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    fetchUserOrders();
  }, []);

  const renderOrderItem = ({item}) => (
    <View>
      {item.items?.map((orderItem, index) => (
        <View key={index}>
          <Text style={styles.itemName}>{orderItem.name}</Text>
          <Text style={styles.itemPcs}>Quantity: {orderItem.quantity}</Text>
        </View>
      ))}
      <Text>Total: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Order</Text>
      <Image source={line} style={styles.lineImg} />
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

export default MyOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  newbtn: {
    marginTop: 18,
  },
  card: {
    marginLeft: 250,
    marginRight: 4,
  },
  checkout: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  uptext: {
    marginTop: 10,
  },
  descTxt: {
    color: '#7C7C7C',
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'Gilroy',
  },
  descnew: {
    color: '#7C7C7C',
  },
  descne: {
    color: '#7C7C7C',
    marginTop: 3,
  },
  priceTotal: {
    paddingLeft: 202,
    fontSize: 17,
    fontFamily: 'Gilroy',
    fontWeight: '700',
  },
  arrowL: {
    height: 15,
    marginLeft: 10,
  },
  adjust: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  discount: {
    fontSize: 17,
    fontFamily: 'Gilroy',
    fontWeight: '700',
    paddingLeft: 120,
    marginLeft: 20,
  },
  totalCost: {
    fontSize: 17,
    fontFamily: 'Gilroy',
    fontWeight: '700',
  },
  selectM: {
    fontSize: 17,
    fontFamily: 'Gilroy',
    fontWeight: '700',
    paddingLeft: 150,
    marginLeft: 20,
  },
  Sline: {
    marginTop: 30,
    width: '100%',
  },
  border: {
    borderColor: 'black',
  },
  cancelImg: {
    marginLeft: 350,
    position: 'absolute',
    marginTop: 5,
  },
  increment: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alltitle: {
    flexDirection: 'row',
  },
  cancel: {
    marginLeft: 250,
    position: 'absolute',
    marginTop: 5,
  },
  price: {
    paddingLeft: 100,
    fontWeight: '500',
    fontSize: 20,
  },
  minus: {
    height: 40,
    width: 40,
  },
  plus: {
    height: 40,
    width: 40,
  },
  itemName: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: '#181725',
    fontWeight: 'bold',
    marginTop: 35,
    fontFamily: 'Gilroy-Bold',
  },
  lineImg: {
    marginTop: 30,
  },
  pImage: {
    height: 100,
    width: 50,
    marginTop: 20,
    marginLeft: 40,
  },
  allThings: {
    paddingTop: 20,
    paddingLeft: 30,
  },
  desc: {
    marginTop: 20,
  },
  itemPcs: {
    fontFamily: 'Gilroy-Medium',
    color: '#7C7C7C',
    fontSize: 12,
  },

  lineStyle: {
    borderWidth: 0.5,
    width: 350,
    borderColor: 'black',
    marginTop: 40,
    marginRight: 90,
  },
  imgOnly: {
    marginLeft: 25,
  },
  allImg: {
    flexDirection: 'row',
  },

  quantity: {
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  alldesc: {
    flexDirection: 'row',
    marginLeft: 70,
  },
  line: {
    marginTop: 30,
  },
  btnBg: {
    backgroundColor: '#53B175',
    height: 60,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  btnCheckout: {
    backgroundColor: '#489E67',
    position: 'absolute',
    marginLeft: 70,
  },
});
