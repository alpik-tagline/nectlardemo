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
import {useSharedValue} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

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

const bannerImages = [Banner, Banner, Banner];

const renderBannerItem = ({item, index}) => (
  <View key={index} style={{flex: 1}}>
    <Image source={item} style={styles.bannerImgs} />
  </View>
);

const Home = () => {
  const user = auth().currentUser;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const cartItems = useSelector(state => state.cart.items);
  const [activeIndex, setActiveIndex] = useState(0);

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
      text1Style: {fontSize: 15, fontWeight: 'bold'},
    });
  };

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
        <Text style={styles.priceTxt}>${item.price}</Text>
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

        <Carousel
          loop
          width={width}
          height={100}
          autoPlay
          autoPlayInterval={3000}
          data={bannerImages}
          // scrollAnimationDuration={1000}
          onSnapToItem={index => setActiveIndex(index)}
          renderItem={renderBannerItem}
        />
        <View style={styles.dotsContainer}>
          {bannerImages.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, {opacity: index === activeIndex ? 1 : 0.3}]}
            />
          ))}
        </View>

        {filteredProducts.length === 0 ? (
          <Text style={styles.noItemsText}>No item found</Text>
        ) : (
          <>
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
              <Text style={styles.offerTxt}>Best Selling</Text>
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
              <Text style={styles.offerTxt}>Groceries</Text>
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

            <View style={styles.lastP}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={filteredProducts}
                renderItem={renderProductItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.productList}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerImgs: {
    height: 100,
    width: 380,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 5,
  },
  lastP: {
    marginBottom: 5,
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
    width: 375,
    height: 50,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 15,
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
  offers: {
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  offerTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 180,
  },
  seeTxt: {
    color: '#53B175',
    fontWeight: '500',
  },
  horizonView: {
    flexDirection: 'row',
    marginTop: 18,
    marginHorizontal: 20,
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
    paddingHorizontal: 19,
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
    fontWeight: '800',
    fontSize: 16,
  },
  noItemsText: {
    textAlign: 'center',
    paddingVertical: 200,
    fontSize: 18,
    fontWeight: '500',
    color: '#999',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 287,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#53B175',
    marginHorizontal: 4,
  },
});
