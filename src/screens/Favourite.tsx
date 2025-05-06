import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import line from '../images/Line.png';
import arrow from '../images/newRarrow.png';
import {useDispatch, useSelector} from 'react-redux';
import {removeFavourite, addMultipleItems} from '../app/cartSlice';
import Toast from 'react-native-toast-message';
import Button from '../component/Button';

const ItemsList = () => {
  const favourites = useSelector(state => state.cart.favourites);
  const dispatch = useDispatch();

  const handleAddAllToCart = () => {
    dispatch(addMultipleItems(favourites));
    favourites.forEach(item => dispatch(removeFavourite(item.id)));
    Toast.show({
      type: 'success',
      text1: 'All items added to cart',
      text1Style: {fontSize: 15, fontWeight: 'bold'},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourite</Text>
      <Image source={line} style={styles.lineImg} />

      {favourites.length === 0 ? (
        <Text style={styles.noItemsText}>No items added</Text>
      ) : (
        <FlatList
          data={favourites}
          keyExtractor={item => item?.id.toString()}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => dispatch(removeFavourite(item.id))}>
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
      )}

      <View style={styles.btnnew}>
        <Button
          title="Add All to Cart"
          onPress={handleAddAllToCart}
          disabled={favourites.length === 0}
        />
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
  btnnew: {
    position: 'absolute',
    marginVertical: 730,
    marginHorizontal: 30,
  },
  newCssBtn: {
    position: 'absolute',
    marginVertical: 760,
    marginHorizontal: 30,
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
    width: 80,
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
  },
  btn: {
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
  },
  noItemsText: {
    textAlign: 'center',
    color: '#7C7C7C',
    fontSize: 16,
    marginVertical: 300,
  },
});
