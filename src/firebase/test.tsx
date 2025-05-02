import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
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
import {storeProduct} from '../firebase/storeProduct';

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
    for (const item of cartItems) {
      await storeProduct(item);
    }

    navigation.navigate('OrderCon');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <Image source={line} style={styles.lineImg} />

      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View>
            <View style={styles.alltitle}>
              <Image style={styles.pImage} source={item.image} />
              <View style={styles.allThings}>
                <TouchableOpacity onPress={() => dispatch(removeItem(item.id))}>
                  <Image source={cancel} style={styles.cancel} />
                </TouchableOpacity>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPcs}>{item.pcs}</Text>
                <View style={styles.increment}>
                  <TouchableOpacity
                    onPress={() => dispatch(decreaseQuantity(item.id))}>
                    <Image source={minus} style={styles.minus} />
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => dispatch(increaseQuantity(item.id))}>
                    <Image source={plus} style={styles.plus} />
                  </TouchableOpacity>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </View>
            </View>
            <Image source={line} style={styles.line} />
          </View>
        )}
      />
      <TouchableOpacity style={styles.btnBg} onPress={handlePlaceOrder}>
        <Text style={styles.btn}>
          Place Order{' '}
          <Text style={styles.btnCheckout}>${total.toFixed(2)}</Text>
        </Text>
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
            <Image source={cancelB} style={styles.cancelImg} />
            <Text style={styles.checkout}>Checkout</Text>
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
            By placing an order you agree to our{' '}
          </Text>
          <Text style={styles.descne}>Terms And Conditions</Text>
          <View style={styles.newbtn}>
            <TouchableOpacity
              style={styles.btnBg}
              onPress={() => navigation.navigate('OrderCon')}>
              <Text style={styles.btn}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};

export default ItemsList;
