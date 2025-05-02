import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';

import carrotRed from '../images/carrotRed.png';
import Banner from '../images/banner.png';
import search from '../images/search.png';
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
import roundgood from '../images/ingridents.png';
import rice from '../images/rice.png';

import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {addItem} from '../app/cartSlice';

const {width} = Dimensions.get('window');

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

const Home = () => {
  const user = auth().currentUser;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = product => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    const updatedProduct = {
      ...product,
      quantity: existingProduct ? existingProduct.quantity + 1 : 1,
    };

    dispatch(addItem(updatedProduct));
    Toast.show({
      type: 'success',
      text1: `Item added to cart`,
    });
  };

  const cartItems = useSelector(state => state.cart.items);
  const ProductDetails = product => {
    navigation.navigate('ProductDetails', {product});
  };

  const handleSearch = text => {
    setSearchQuery(text);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderProductItem = ({item}) => (
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
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={carrotRed} style={styles.carrotImg} />
        <Text style={styles.uName}> Welcome : {user?.email}</Text>

        <View style={styles.search}>
          <Image source={search} style={styles.icon} />
          <TextInput
            placeholder="Search Store"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}>
          <View style={styles.emblaSlide}>
            <Image source={Banner} style={styles.bannerImg} />
          </View>
          <View style={styles.emblaSlide}>
            <Image source={Banner} style={styles.bannerImg} />
          </View>
        </ScrollView>

        <View style={styles.offers}>
          <Text style={styles.offerTxt}>Exclusive Offer</Text>
          <Text style={styles.seeTxt}>See all</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productList}
        />

        <View style={styles.offers}>
          <Text style={styles.offerTxtOne}>Best Selling</Text>
          <Text style={styles.seeTxt}>See all</Text>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productList}
        />

        <View style={styles.offers}>
          <Text style={styles.offerTxtTwo}>Groceries</Text>
          <Text style={styles.seeTxt}>See all</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.horizonView}>
            <View style={styles.roundGro}>
              <Image source={roundgood} style={styles.roundGood} />
              <Text style={styles.newTxt}>Pulses</Text>
            </View>
            <View style={styles.roundGreen}>
              <Image source={rice} style={styles.roundGood} />
              <Text style={styles.newTxt}>Rice</Text>
            </View>
          </View>
        </ScrollView>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productList}
        />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  carrotImg: {
    marginTop: 50,
    height: 40,
    width: 35,
    alignSelf: 'center',
  },
  uName: {
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  search: {
    marginTop: 15,
    backgroundColor: '#F2F3F2',
    width: 340,
    marginLeft: 33,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
  },
  icon: {
    marginLeft: 13,
    marginRight: 10,
  },
  embla: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emblaSlide: {
    width: 410,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  bannerImg: {
    width: 340,
    borderRadius: 28,
  },
  offers: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerTxt: {
    fontFamily: 'Gilroy',
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 180,
  },
  offerTxtOne: {
    fontFamily: 'Gilroy',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 30,
    paddingRight: 180,
  },
  offerTxtTwo: {
    fontFamily: 'Gilroy',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 50,
    paddingRight: 180,
  },
  seeTxt: {
    color: '#53B175',
    fontWeight: '500',
  },
  horizonView: {
    flexDirection: 'row',
    marginTop: 18,
    marginLeft: 25,
  },
  roundGood: {
    alignSelf: 'center',
    marginLeft: 10,
    height: 60,
    width: 60,
  },
  newTxt: {
    alignSelf: 'center',
    marginLeft: 15,
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 18,
  },
  roundGro: {
    height: 100,
    width: 250,
    backgroundColor: '#F8A44C1A',
    flexDirection: 'row',
    borderRadius: 20,
  },
  roundGreen: {
    height: 100,
    width: 250,
    backgroundColor: '#53B1751A',
    flexDirection: 'row',
    borderRadius: 20,
    marginLeft: 15,
  },
  productList: {
    paddingHorizontal: 20,
  },
  products: {
    marginTop: 20,
    marginRight: 12,
    borderColor: '#E2E2E2B2',
    borderWidth: 1.5,
    borderRadius: 18,
    width: 150,
    height: 219,
  },
  productImg: {
    height: 90,
    marginTop: 14,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  fruitTitle: {
    fontWeight: '700',
    marginTop: 15,
    marginLeft: 10,
  },
  pcs: {
    color: '#7C7C7C',
    fontSize: 12,
    marginTop: 1,
    marginLeft: 10,
  },
  priceAll: {
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  plusIcon: {
    height: 38,
    width: 38,
    marginLeft: 5,
  },
  priceTxt: {
    fontWeight: 800,
    fontSize: 16,
  },
});
