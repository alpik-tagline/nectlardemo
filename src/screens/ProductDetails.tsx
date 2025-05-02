import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import bg from '../images/productbg.png';
import minus from '../images/normalMinus.png';
import plus from '../images/normalPlus.png';
import line from '../images/proline.png';
import downarrow from '../images/downnew.png';
import rightArrow from '../images/rightArrow.png';
import stars from '../images/stars.png';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {addItem, favourite, removeFavourite} from '../app/cartSlice';

const ProductDetails = ({route}) => {
  const dispatch = useDispatch();
  const {product} = route.params;

  const image1 = require('../images/heart.png');
  const image2 = require('../images/newhh.png');
  const [localQuantity, setLocalQuantity] = useState(1);

  const favourites = useSelector(state => state.cart.favourites);
  const cartItems = useSelector(state => state.cart.items);

  const isFavourited = favourites.some(fav => fav.id === product.id);
  const [showDescription, setShowDescription] = useState(false);

  const toggleFavourite = () => {
    if (isFavourited) {
      dispatch(removeFavourite(product.id));
    } else {
      dispatch(favourite(product));
    }
  };

  const handleAddToCart = product => {
    const existingProduct = cartItems.find(item => item.id === product.id);

    const productWithQuantity = {
      ...product,
      quantity: localQuantity,
    };

    dispatch(addItem(productWithQuantity));
    Toast.show({
      type: 'success',
      text1: 'Item added to cart',
    });
  };

  const handleIncrease = () => {
    setLocalQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (localQuantity > 1) {
      setLocalQuantity(prev => prev - 1);
    }
  };

  useEffect(() => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      setLocalQuantity(existingProduct.quantity);
    }
  }, [cartItems, product.id]);

  const quantity = localQuantity;

  return (
    <View style={styles.container}>
      <View style={styles.images}>
        <Image source={bg} />
        <Image source={product.image} style={styles.proimage} />
      </View>
      <View style={styles.titleImage}>
        <Text style={styles.productTitle}>{product.name}</Text>
        <TouchableOpacity onPress={toggleFavourite}>
          <Image
            source={isFavourited ? image2 : image1}
            style={styles.heartImg}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.productsPcs}>{product.pcs}</Text>

      <View style={styles.plusMinus}>
        <TouchableOpacity onPress={handleDecrease}>
          <Image source={minus} style={styles.minusPro} />
        </TouchableOpacity>
        <View style={styles.counts}>
          <Text style={styles.quantity}>{quantity}</Text>
        </View>
        <TouchableOpacity onPress={handleIncrease}>
          <Image source={plus} style={styles.plusPro} />
        </TouchableOpacity>
        <Text style={styles.price}>
          ${(product.price * quantity).toFixed(2)}
        </Text>
      </View>

      <View style={styles.lineBg}>
        <Image source={line} style={styles.line} />
      </View>
      <TouchableOpacity
        style={styles.proDetails}
        onPress={() => setShowDescription(prev => !prev)}>
        <Text style={styles.proDetailsOne}>Product Detail</Text>
        <Image
          source={showDescription ? downarrow : rightArrow}
          style={styles.downArr}
        />
      </TouchableOpacity>
      {showDescription && (
        <View style={styles.newDesc}>
          <Text style={styles.newstyle}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum atque
            numquam sequi possimus id natus voluptates recusandae aliquam ma.
          </Text>
        </View>
      )}

      <View style={styles.lineBg}>
        <Image source={line} style={styles.line} />
      </View>
      <View style={styles.proDetailsNew}>
        <Text style={styles.proDetailsN}>Nutritions</Text>
        <Text style={styles.grams}>100gr</Text>
        <Image source={rightArrow} style={styles.rightArr} />
      </View>
      <View style={styles.lineBg}>
        <Image source={line} style={styles.line} />
      </View>
      <View style={styles.proDetailsNewOne}>
        <Text style={styles.proDetailsN}>Review</Text>
        <Image source={stars} style={styles.startsReview} />
        <Image source={rightArrow} style={styles.rightArr} />
      </View>
      <TouchableOpacity
        style={styles.btnBg}
        onPress={() => handleAddToCart(product)}>
        <Text style={styles.btn}>Add To Basket</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  newstyle: {
    fontFamily: 'Gilroy-Medium',
    color: '#7C7C7C',
  },
  counts: {
    borderRadius: 15,
    borderColor: '#E2E2E2',
    borderWidth: 1,
    height: 44,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  images: {
    alignItems: 'center',
  },
  proimage: {
    position: 'absolute',
    height: 200,
    width: 90,
    marginTop: 90,
  },
  newh: {
    marginTop: 5,
  },
  productTitle: {
    fontFamily: 'Gilroy-Bold',
    fontWeight: '900',
    fontSize: 22,
    flex: 1,
    marginRight: 10,
  },
  productsPcs: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    color: '#7C7C7C',
    marginLeft: 20,
    marginTop: 2,
    fontSize: 14,
  },
  titleImage: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  plusMinus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  quantity: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },
  price: {
    fontFamily: 'Gilroy',
    fontWeight: '900',
    fontSize: 23,
    marginLeft: 180,
  },
  roundImage: {
    marginRight: 40,
  },
  heartImg: {
    width: 24,
    height: 24,
  },
  minusPro: {
    marginLeft: 25,
  },
  plusPro: {
    height: 18,
  },
  line: {
    marginTop: 30,
  },
  lineBg: {
    alignItems: 'center',
  },
  proDetails: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
    gap: 240,
  },
  proDetailsOne: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    fontSize: 15,
    marginTop:5,
  },
  newDesc: {
    marginTop: 10,
    marginLeft: 30,
  },
  proDetailsNew: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 28,
    fontSize: 15,
  },
  proDetailsN: {
    fontFamily: 'Gilroy',
    fontWeight: '700',
    position: 'absolute',
    paddingLeft: 30,
    fontSize: 15,
  },
  grams: {
    position: 'absolute',
    marginLeft: 310,
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    height: 20,
    width: 40,
    fontSize: 12,
    textAlign: 'center',
  },
  rightArr: {
    position: 'absolute',
    marginLeft: 360,
    marginTop: 2,
  },
  startsReview: {
    marginLeft: 250,
    marginTop: 2,
  },
  proDetailsNewOne: {
    marginTop: 10,
  },
  btnBg: {
    backgroundColor: '#53B175',
    marginTop: 50,
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
