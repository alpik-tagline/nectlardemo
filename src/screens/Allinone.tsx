import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import left from '../images/left.png';
import filter from '../images/filter.png';
import banana from '../images/banana.png';
import plus from '../images/plus.png';
import apple from '../images/apple.png';
import coco from '../images/coco.png';
import coke from '../images/coke.png';
import treeto from '../images/treeto.png';
import pepsi from '../images/pepsi.png';
import ojiuce from '../images/ojuice.png';
import fruits from '../images/fruits.png';
import sprite from '../images/sprite.png';
import all from '../images/all.png';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {addItem} from '../app/cartSlice';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

const Allinone = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const ProductDetails = product => {
    navigation.navigate('ProductDetails', {product});
  };
  const products = [
    {
      id: '3',
      name: 'Coca Cola',
      image: coco,
      price: '2.99',
      pcs: '7pcs, Priceg',
    },
    {
      id: '4',
      name: 'Diet Coke',
      image: coke,
      price: '4.99',
      pcs: '7pcs, Priceg',
    },
    {
      id: '5',
      name: 'Orange Juice',
      image: treeto,
      price: '5.99',
      pcs: '7pcs, Priceg',
    },
    {id: '6', name: 'Pepsi', image: pepsi, price: '6.99', pcs: '7pcs, Priceg'},
    {
      id: '7',
      name: 'All Veg',
      image: fruits,
      price: '8.99',
      pcs: '7pcs, Priceg',
    },
    {
      id: '8',
      name: 'Orange Juice',
      image: ojiuce,
      price: '5.99',
      pcs: '7pcs, Priceg',
    },
    {
      id: '1',
      name: 'Organic Bananas',
      image: banana,
      price: '4.99',
      pcs: '7pcs, Priceg',
    },
    {
      id: '2',
      name: 'Organic Apple',
      image: apple,
      price: '7.99',
      pcs: '7pcs, Priceg',
    },
    {
      id: '9',
      name: 'All Fruits',
      image: all,
      price: '2.99',
      pcs: '7pcs, Priceg',
    },
    {
      id: '10',
      name: 'Sprite',
      image: sprite,
      price: '1.99',
      pcs: '7pcs, Priceg',
    },
  ];
  const handleAddToCart = product => {
    dispatch(addItem(product));
    Toast.show({
      type: 'success',
      text1: 'Item added to cart',
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={left} style={styles.arrow} />
        </TouchableOpacity>

        <Text style={styles.title}>Beverages</Text>
        <Image source={filter} style={styles.fillterImg} />
      </View>
      <FlatList
        numColumns={2}
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.allPros}>
            <View style={styles.products}>
              <TouchableOpacity onPress={() => ProductDetails(item)}>
                <Image source={item.image} style={styles.productImg} />
                <Text style={styles.fruitTitle}>{item.name}</Text>
                <Text style={styles.pcs}>{item.pcs}</Text>
              </TouchableOpacity>
              <View style={styles.priceAll}>
                <Text style={styles.priceTxt}>$ {item.price}</Text>
                <TouchableOpacity onPress={() => handleAddToCart(item)}>
                  <Image source={plus} style={styles.plusIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Allinone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  plusIcon: {
    height: 38,
    width: 38,
    marginLeft: 5,
  },
  allPros: {
    marginTop: 15,
  },
  productWrapper: {
    flex: 1,
    marginTop: 15,
    marginLeft: 20,
  },
  heading: {
    marginTop: 40,
    marginBottom: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fillterImg: {
    marginRight: 23,
  },
  arrow: {
    marginLeft: 23,
  },

  pcs: {
    color: '#7C7C7C',
    fontSize: 12,
    marginTop: 1,
    marginLeft: 10,
  },
  fruitTitle: {
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 10,
  },
  priceTxt: {
    fontWeight: 800,
    fontSize: 16,
  },
  productImg: {
    height: 90,
    width: 45,
    marginTop: 14,
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Gilroy-Bold',
    fontWeight: '900',
    fontSize: 18,
  },
  cotitle: {
    marginRight: 60,
  },
  products: {
    borderColor: '#E2E2E2B2',
    borderWidth: 2,
    borderRadius: 18,
    padding: 10,
    height: 230,
    width: 180,
    marginLeft: 20,
  },
  priceAll: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
});
