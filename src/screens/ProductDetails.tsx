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
import Button from '../component/Button';

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
          style={[styles.rightArr, showDescription && styles.downArrowStyle]}
        />
      </TouchableOpacity>

      {showDescription && (
        <View style={styles.newDesc}>
          <Text style={styles.newstyle}>
            Apples are nutritious. Apples may be good for weight loss. Apples
            may be good for your heart. As part of a healthful and varied diet.
          </Text>
        </View>
      )}

      <View style={styles.lineBg}>
        <Image source={line} style={styles.line} />
      </View>

      <View style={styles.proDetailsNew}>
        <Text style={styles.proDetailsOne}>Nutritions</Text>
        <View style={styles.rightContent}>
          <Text style={styles.grams}>100gr</Text>
          <Image source={rightArrow} style={styles.rightArr} />
        </View>
      </View>

      <View style={styles.lineBg}>
        <Image source={line} style={styles.line} />
      </View>

      <View style={styles.proDetailsNewOne}>
        <Text style={styles.proDetailsOne}>Review</Text>
        <View style={styles.rightContent}>
          <Image source={stars} style={styles.starsImg} />
          <Image source={rightArrow} style={styles.rightArr} />
        </View>
      </View>
      <View style={styles.addtobasket}>
        <Button
          title="Add to Basket"
          onPress={() => handleAddToCart(product)}
        />
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addtobasket: {
    position: 'absolute',
    marginVertical: 785,
    marginHorizontal: 25,
  },
  starsImg: {
    marginRight: 15,
  },
  newstyle: {
    fontFamily: 'Gilroy-Medium',
    color: '#7C7C7C',
    fontSize: 14,
    lineHeight: 22,
  },
  downArrowStyle: {
    width: 19,
    height: 10,
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
    marginTop: 90,
    resizeMode: 'contain',
    height: 200,
    width: 500,
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
    marginLeft: 'auto',
    marginRight: 20,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  proDetailsOne: {
    fontFamily: 'Gilroy-Bold',
    fontWeight: '700',
    fontSize: 15,
    color: '#181725',
  },
  newDesc: {
    marginTop: 10,
    paddingHorizontal: 30,
  },
  proDetailsNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  proDetailsNewOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  grams: {
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    paddingHorizontal: 6,
    fontSize: 12,
    textAlign: 'center',
    color: '#7C7C7C',
    marginRight: 10,
  },
  rightArr: {
    width: 12,
    height: 15,
    tintColor: '#181725',
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnBg: {
    backgroundColor: '#53B175',
    marginTop: 50,
    height: 67,
    width: 353,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderRadius: 20,
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
});
