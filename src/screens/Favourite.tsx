import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import line from '../images/Line.png';
import {useDispatch, useSelector} from 'react-redux';
import {addMultipleItems} from '../app/cartSlice';
import arrow from '../images/newRarrow.png';
import {useNavigation} from '@react-navigation/native';

const ItemsList = () => {
  const favourites = useSelector(state => state.cart.favourites);  // Get favourites from the Redux store
  const cartItems = useSelector(state => state.cart.items);        // Get items in the cart from Redux store
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Navigate to Product Details page
  const ProductDetails = product => {
    navigation.navigate('ProductDetails', {product});
  };

  // Function to handle the "Add All to Cart" action
  const handleAddAllToCart = () => {
    dispatch(addMultipleItems(favourites));  // Dispatch action to add all favourites to the cart
  };

  // Calculate total items in the cart (sum of quantities)
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite</Text>
      <Image source={line} style={styles.lineImg} />

      {/* FlatList to render favourites */}
      <FlatList
        data={favourites}
        keyExtractor={item => item?.id.toString()}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity onPress={() => ProductDetails(item)}>
              <View style={styles.alltitle}>
                <Image style={styles.pImage} source={item.image} />
                <View style={styles.allThings}>
                  <View style={styles.newMain}>
                    <View style={styles.newCss}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemPcs}>{item.pcs}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.allend}>
                  <Text style={styles.price}>${item.price}</Text>
                  <Image source={arrow} style={styles.cancel} />
                </View>
              </View>
            </TouchableOpacity>
            <Image source={line} style={styles.line} />
          </View>
        )}
      />

      {/* Button to add all favourites to cart */}
      <TouchableOpacity
        style={styles.btnBg}
        onPress={handleAddAllToCart}>
        <Text style={styles.btn}>Add All to Cart</Text>
      </TouchableOpacity>

      {/* Display total item count in cart */}
      <View style={styles.cartCounterContainer}>
        <Text style={styles.cartCounterText}>Items in cart: {totalItemsInCart}</Text>
      </View>
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    alignSelf: 'center',
  },
  alltitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  pImage: {
    height: 60,
    width: 50,
    marginRight: 15,
    marginLeft: 15,
    resizeMode: 'contain',
  },
  allThings: {
    flex: 1,
    paddingHorizontal: 10,
  },
  newMain: {
    flexDirection: 'column',
  },
  newCss: {
    marginBottom: 10,
    marginLeft: 15,
  },
  itemName: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemPcs: {
    fontFamily: 'Gilroy-Medium',
    color: '#7C7C7C',
    fontSize: 12,
    marginTop: 3,
  },
  price: {
    width: 60,
    textAlign: 'right',
    fontWeight: '700',
    fontSize: 17,
    color: '#181725',
    marginBottom: 18,
    marginRight: 10,
  },
  allend: {
    flexDirection: 'row',
    marginTop: 10,
  },
  cancel: {
    marginLeft: 10,
    marginTop: 5,
    height: 15,
    width: 8,
    marginRight: 5,
  },
  line: {
    marginTop: 10,
    alignSelf: 'center',
    width: 370,
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

  cartCounterContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cartCounterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },
});
