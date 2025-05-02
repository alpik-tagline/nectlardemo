import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import line from '../images/Line.png';
import {useDispatch, useSelector} from 'react-redux';
import minus from '../images/minus.png';
import plus from '../images/greenplus.png';
import {increaseQuantity, decreaseQuantity, removeItem} from '../app/cartSlice';
import cancel from '../images/cancel.png';
import RBSheet from 'react-native-raw-bottom-sheet';
import cancelB from '../images/blackCancel.png';
import smallL from '../images/smallLine.png';
import arrow from '../images/arrow.png';
import card from '../images/card.png';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ItemsList = () => {
  const cartItems = useSelector(state => state.cart.items);
  const refRBSheet = useRef();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const total = calculateTotal();

  const handlePlaceOrder = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        console.error('No user is logged in');
        return;
      }

      const order = {
        items: cartItems,
        total: total,
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await firestore()
        .collection('orders')
        .doc(user.email)
        .collection('userOrders')
        .add(order);

      navigation.navigate('OrderCon');
    } catch (error) {
      console.error('Error placing order: ', error);
    }
  };

  const ProductDetails = product => {
    navigation.navigate('ProductDetails', {product});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <Image source={line} style={styles.lineImg} />

      <FlatList
        data={cartItems}
        keyExtractor={item => item?.id.toString()}
        renderItem={({item}) => (
          <View>
            <View style={styles.alltitle}>
              <TouchableOpacity onPress={() => ProductDetails(item)}>
                <Image style={styles.pImage} source={item.image} />
              </TouchableOpacity>
              <View style={styles.allThings}>
                <View style={styles.newCss}>
                  <View style={styles.allNew}>
                    <TouchableOpacity onPress={() => ProductDetails(item)}>
                      <Text style={styles.itemName}>{item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dispatch(removeItem(item.id))}>
                      <Image source={cancel} style={styles.cancel} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.itemPcs}>{item.pcs}</Text>
                </View>

                <View style={styles.plusMinus}>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Decrease pressed');
                      dispatch(decreaseQuantity(item.id));
                    }}>
                    <Image source={minus} style={styles.minusPro} />
                  </TouchableOpacity>
                  <View style={styles.counts}>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      dispatch(increaseQuantity(item.id));
                    }}>
                    <Image source={plus} style={styles.plusPro} />
                  </TouchableOpacity>

                  <Text style={styles.price}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
            <Image source={line} style={styles.line} />
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.btnBg}
        onPress={() => refRBSheet.current.open()}>
        <View style={styles.btnRow}>
          <Text style={styles.btnText}>Go to Checkout</Text>
          <View style={styles.priceBox}>
            <Text style={styles.priceText}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          draggableIcon: {
            backgroundColor: '#ccc',
          },
          container: {
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            padding: 20,
            height: 500,
          },
        }}>
        <View>
          <View style={styles.uptext}>
            <Text style={styles.checkout}>Checkout</Text>
            <TouchableOpacity onPress={() => refRBSheet.current.close()}>
              <Image source={cancelB} style={styles.cancelImg} />
            </TouchableOpacity>
          </View>
          <Image source={smallL} style={styles.Sline} />
          <View style={styles.adjust}>
            <Text style={styles.descTxt}>Delivery</Text>
            <Text style={styles.selectM}>Select Method </Text>
            <Image source={arrow} style={styles.arrowL} />
          </View>
          <Image source={smallL} style={styles.Sline} />
          <View style={styles.adjust}>
            <Text style={styles.descTxt}>Payment</Text>
            <Image source={card} style={styles.card} />
            <Image source={arrow} style={styles.arrowL} />
          </View>
          <Image source={smallL} style={styles.Sline} />
          <View style={styles.adjust}>
            <Text style={styles.descTxt}>Promo Code</Text>
            <Text style={styles.discount}>Pick discount </Text>
            <Image source={arrow} style={styles.arrowL} />
          </View>
          <Image source={smallL} style={styles.Sline} />
          <View style={styles.adjust}>
            <Text style={styles.descTxt}>Total Cost</Text>
            <Text style={styles.priceTotal}>${total.toFixed(2)} </Text>
            <Image source={arrow} style={styles.arrowL} />
          </View>
          <Image source={smallL} style={styles.Sline} />
          <Text style={styles.descnew}>
            By placing an order you agree to our
          </Text>
          <Text style={styles.descne}>
            <Text style={styles.ts}>Terms</Text> And
            <Text style={styles.ts}> Conditions</Text>
          </Text>
          <View style={styles.newbtn}>
            <TouchableOpacity style={styles.btnBg} onPress={handlePlaceOrder}>
              <Text style={styles.btn}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ts: {
    color: 'black',
  },
  plusPro: {
    height: 47,
  },
  minusPro: {
    height: 47,
  },
  counts: {
    width: 40,
  },
  plusMinus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  newbtn: {
    marginTop: 18,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  btnBg: {
    backgroundColor: '#53B175',
    height: 60,
    width: 353,
    justifyContent: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

  btnRow: {
    flexDirection: 'row',
  },

  btnText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    marginLeft: 110,
  },

  priceBox: {
    backgroundColor: '#489E67',
    borderRadius: 5,
    marginLeft: 32,
    height: 25,
    width: 60,
  },

  priceText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: 2,
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
    flexDirection: 'row',
  },
  descTxt: {
    color: '#7C7C7C',
    fontWeight: '700',
    fontSize: 17,
    fontFamily: 'Gilroy',
  },
  descnew: {
    color: '#7C7C7C',
    marginTop: 10,
    fontFamily: 'Gilroy',
    fontWeight: '600',
  },
  descne: {
    color: '#7C7C7C',
    marginTop: 3,
  },
  allNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  newMain: {
    flexDirection: 'column',
  },
  newCss: {
    marginTop: 10,
    marginLeft: 10,
  },
  Sline: {
    marginTop: 30,
    width: '100%',
  },
  border: {
    borderColor: 'black',
  },
  cancelImg: {
    marginTop: 5,
    marginHorizontal: 263,
  },
  increment: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  alltitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  cancel: {
    height: 15,
    width: 15,
    position: 'absolute',
  },
  price: {
    fontFamily: 'Gilroy',
    fontWeight: '100',
    fontSize: 23,
    marginLeft: 90,
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
    marginBottom: 3,
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
    marginBottom: 10,
  },
  pImage: {
    height: 120,
    width: 50,
    marginRight: 15,
    resizeMode: 'contain',
  },
  allThings: {
    flex: 1,
    paddingHorizontal: 10,
  },
  desc: {
    marginTop: 20,
  },
  itemPcs: {
    fontFamily: 'Gilroy-Medium',
    color: '#7C7C7C',
    fontSize: 12,
    fontWeight: '700',
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
    fontSize: 19,
    textAlign: 'center',
    width: 35,
  },
  alldesc: {
    flexDirection: 'row',
    marginLeft: 70,
  },
  line: {
    marginTop: 25,
  },
});
